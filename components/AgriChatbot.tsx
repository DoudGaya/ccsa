"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Loader2, Sprout, Maximize2, Minimize2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

declare global {
  interface Window {
    SpeechRecognition: new () => { continuous: boolean; interimResults: boolean; lang: string; start: () => void; stop: () => void; onresult: ((event: SpeechRecognitionEvent) => void) | null; onend: (() => void) | null; onerror: (() => void) | null }
    webkitSpeechRecognition: new () => { continuous: boolean; interimResults: boolean; lang: string; start: () => void; stop: () => void; onresult: ((event: SpeechRecognitionEvent) => void) | null; onend: (() => void) | null; onerror: (() => void) | null }
  }
}

export default function AgriChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your agricultural advisor. I can help you with questions about climate-smart agriculture, sustainable farming, crop management, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<{ stop: () => void } | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const transcriptRef = useRef('')
  // Always points to the latest doSubmit — avoids stale closure in recognition.onend
  const doSubmitRef = useRef<(text: string, alwaysSpeak: boolean) => Promise<void>>(async () => {})

  useEffect(() => {
    const hasSR = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    const hasSS = typeof window !== 'undefined' && 'speechSynthesis' in window
    setSpeechSupported(hasSR && hasSS)
    if (hasSS) synthRef.current = window.speechSynthesis
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    const plain = text.replace(/[#*`_~[\]()>]/g, '').replace(/\n+/g, '. ')
    const utterance = new SpeechSynthesisUtterance(plain)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    synthRef.current.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
  }, [])

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    transcriptRef.current = ''
    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Collect both interim and final parts as transcript
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('')
      transcriptRef.current = transcript
      setInput(transcript)
    }
    recognition.onend = () => {
      setIsListening(false)
      const finalText = transcriptRef.current.trim()
      if (finalText) {
        // Auto-submit and always speak the AI response for voice input
        doSubmitRef.current(finalText, true)
        transcriptRef.current = ''
        setInput('')
      }
    }
    recognition.onerror = () => {
      setIsListening(false)
      transcriptRef.current = ''
    }
    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  useEffect(() => {
    return () => { stopListening(); stopSpeaking() }
  }, [stopListening, stopSpeaking])

  // Core submit — alwaysSpeak=true when triggered by voice input
  const doSubmit = useCallback(async (text: string, alwaysSpeak = false) => {
    if (!text.trim() || isLoading) return
    const userMessage: Message = { role: 'user', content: text.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    try {
      const conversationHistory = messages.map(msg => ({ role: msg.role, content: msg.content }))
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), conversationHistory }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to get response')
      const assistantMessage: Message = { role: 'assistant', content: data.message, timestamp: new Date() }
      setMessages(prev => [...prev, assistantMessage])
      // Speak if voice input was used (alwaysSpeak) OR voice output toggle is on
      if (alwaysSpeak || voiceEnabled) speak(data.message)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages, voiceEnabled, speak])

  // Keep ref current so recognition.onend always calls the latest version
  useEffect(() => { doSubmitRef.current = doSubmit }, [doSubmit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await doSubmit(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e) }
  }

  const handleClose = () => { setIsOpen(false); setIsFullScreen(false); stopSpeaking() }

  const windowClass = isFullScreen
    ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col'
    : 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ' +
      'w-[calc(100vw-2rem)] sm:w-[420px] ' +
      'h-[calc(100svh-5rem)] sm:h-[600px] max-h-[700px] ' +
      'bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden ' +
      'border border-gray-200 dark:border-gray-700'

  const motionProps = isFullScreen
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 80, scale: 0.92 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 80, scale: 0.92 } }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-green-500/50 hover:scale-110 group"
            aria-label="Open agricultural chat"
          >
            <div className="relative">
              <Sprout className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div {...motionProps} className={windowClass}>

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 sm:p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <Sprout className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Agricultural Advisor</h3>
                  <p className="text-[10px] sm:text-xs text-green-100 hidden sm:block">Climate-Smart Agriculture Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {/* Voice response toggle */}
                {speechSupported && (
                  <button
                    onClick={() => { setVoiceEnabled(v => !v); if (voiceEnabled) stopSpeaking() }}
                    className={`rounded-full p-2 transition-colors ${voiceEnabled ? 'bg-white/30' : 'hover:bg-white/20'}`}
                    aria-label={voiceEnabled ? 'Disable voice responses' : 'Enable voice responses'}
                    title={voiceEnabled ? 'Voice responses: ON' : 'Voice responses: OFF'}
                  >
                    {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                )}
                {/* Full-screen toggle */}
                <button
                  onClick={() => setIsFullScreen(f => !f)}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label={isFullScreen ? 'Exit full screen' : 'Full screen mode'}
                  title={isFullScreen ? 'Exit full screen' : 'Full screen'}
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                {/* Close */}
                <button onClick={handleClose} className="hover:bg-white/20 rounded-full p-2 transition-colors" aria-label="Close chat">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Listening indicator banner */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800 px-4 py-2.5 flex items-center justify-between shrink-0 overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    {/* Animated sound wave bars */}
                    <div className="flex items-end gap-[3px] h-4">
                      {[0, 1, 2, 3].map(i => (
                        <span
                          key={i}
                          className="w-[3px] bg-red-500 rounded-full animate-bounce"
                          style={{ height: `${[12, 8, 14, 6][i]}px`, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-red-600 dark:text-red-400 font-medium">Listening — will send automatically when you stop speaking</span>
                  </div>
                  <button
                    onClick={stopListening}
                    className="text-[10px] text-red-500 hover:text-red-700 font-semibold shrink-0 ml-2"
                  >Cancel</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 dark:bg-gray-950">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                  }`}>
                    {message.role === 'assistant' ? (
                      <div className="flex flex-col gap-1">
                        <div className="prose prose-sm dark:prose-invert max-w-none text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              a: ({ node, ...props }: any) => (
                                <a className="text-green-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        {/* Per-message speak button */}
                        {speechSupported && (
                          <button
                            onClick={() => isSpeaking ? stopSpeaking() : speak(message.content)}
                            className="self-start flex items-center gap-1 text-[10px] text-gray-400 hover:text-green-600 dark:hover:text-green-400 mt-1 transition-colors"
                            aria-label="Speak this message"
                          >
                            <Volume2 className="h-3 w-3" />
                            {isSpeaking ? 'Stop' : 'Speak'}
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                    <p className={`text-[10px] mt-1 ${
                      message.role === 'user' ? 'text-green-100' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shrink-0">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? 'Listening...' : 'Ask about agriculture...'}
                  className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white placeholder:text-gray-500 min-h-[40px]"
                  rows={1}
                  disabled={isLoading}
                />
                {/* Mic button */}
                {speechSupported && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`rounded-xl px-3 py-2 transition-all flex items-center justify-center shrink-0 ${
                      isListening
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Voice input'}
                  >
                    {isListening ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                )}
                {/* Send */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-3 sm:px-4 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                {isListening
                  ? 'Recording… release mic to send automatically'
                  : speechSupported
                    ? 'Enter to send · Shift+Enter new line · mic button sends automatically'
                    : 'Enter to send · Shift+Enter for new line'}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
