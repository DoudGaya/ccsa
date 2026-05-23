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

type VoiceStatus = 'idle' | 'listening' | 'processing' | 'speaking'
type LangCode = 'en' | 'pcm' | 'yo' | 'ig' | 'ha'

const LANG_OPTIONS: { code: LangCode; label: string; srLang: string; comingSoon?: boolean }[] = [
  { code: 'en',  label: 'English', srLang: 'en-NG' },
  { code: 'pcm', label: 'Pidgin',  srLang: 'en-NG', comingSoon: true },
  { code: 'yo',  label: 'Yoruba',  srLang: 'yo',    comingSoon: true },
  { code: 'ig',  label: 'Igbo',    srLang: 'ig',    comingSoon: true },
  { code: 'ha',  label: 'Hausa',   srLang: 'ha',    comingSoon: true },
]

const VOICE_STATUS_LABELS: Record<VoiceStatus, string> = {
  idle:       'Tap the mic to speak',
  listening:  'Listening…',
  processing: 'Thinking…',
  speaking:   'Speaking…',
}

const HANDS_FREE_STATUS_LABELS: Record<VoiceStatus, string> = {
  idle:       'Starting…',
  listening:  'Listening… tap mic to pause',
  processing: 'Thinking…',
  speaking:   'Speaking… will listen again after',
}

declare global {
  interface Window {
    SpeechRecognition: new () => {
      continuous: boolean; interimResults: boolean; lang: string
      start: () => void; stop: () => void
      onresult: ((event: SpeechRecognitionEvent) => void) | null
      onend: (() => void) | null
      onerror: (() => void) | null
    }
    webkitSpeechRecognition: new () => {
      continuous: boolean; interimResults: boolean; lang: string
      start: () => void; stop: () => void
      onresult: ((event: SpeechRecognitionEvent) => void) | null
      onend: (() => void) | null
      onerror: (() => void) | null
    }
  }
}

export default function AgriChatbot() {
  // ── Text chat state ──────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hello! I'm your agricultural advisor. I can help with climate-smart agriculture, sustainable farming, crop management, and more. How can I assist you today?",
    timestamp: new Date(),
  }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)  // female voice on by default
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)

  // ── Voice mode state ─────────────────────────────────────────────────────
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [voiceResponse, setVoiceResponse] = useState('')
  const [voiceLang, setVoiceLang] = useState<LangCode>('en')
  const [handsFree, setHandsFree] = useState(false)

  // ── Refs ─────────────────────────────────────────────────────────────────
  const messagesEndRef    = useRef<HTMLDivElement>(null)
  const inputRef          = useRef<HTMLTextAreaElement>(null)
  const recognitionRef    = useRef<{ stop: () => void } | null>(null)
  const synthRef          = useRef<SpeechSynthesis | null>(null)
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const transcriptRef     = useRef('')
  const voiceLangRef      = useRef<LangCode>('en')
  const messagesRef       = useRef<Message[]>([])
  // Always-current function refs to avoid stale closures in recognition callbacks
  const doSubmitRef      = useRef<(text: string, alwaysSpeak: boolean) => Promise<void>>(async () => {})
  const doVoiceSubmitRef = useRef<(text: string) => Promise<void>>(async () => {})
  const handsFreeRef     = useRef(false)

  // Keep refs in sync with state
  useEffect(() => { voiceLangRef.current = voiceLang }, [voiceLang])
  useEffect(() => { messagesRef.current  = messages   }, [messages])
  useEffect(() => { handsFreeRef.current = handsFree  }, [handsFree])

  useEffect(() => {
    const hasSR = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    const hasSS = typeof window !== 'undefined' && 'speechSynthesis' in window
    setSpeechSupported(hasSR && hasSS)
    if (!hasSS) return
    synthRef.current = window.speechSynthesis

    // Priority-ordered list of natural female voices
    const FEMALE_VOICE_PRIORITY = [
      'Google UK English Female',
      'Microsoft Zira - English (United States)',
      'Microsoft Hazel - English (Great Britain)',
      'Samantha',           // macOS / iOS
      'Karen',              // macOS Australian
      'Moira',              // macOS Irish
      'Tessa',              // macOS South African
      'Victoria',           // macOS
      'Google US English Female',
      'Microsoft Linda - English (United States)',
      'Microsoft Susan - English (United States)',
    ]

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return
      // Try exact name match first
      for (const name of FEMALE_VOICE_PRIORITY) {
        const v = voices.find(v => v.name === name)
        if (v) { preferredVoiceRef.current = v; return }
      }
      // Fallback: any voice whose name contains 'female' or 'woman' (case-insensitive)
      const fallback = voices.find(v => /female|woman/i.test(v.name))
      if (fallback) { preferredVoiceRef.current = fallback; return }
      // Last resort: first English voice
      const enVoice = voices.find(v => v.lang.startsWith('en'))
      if (enVoice) preferredVoiceRef.current = enVoice
    }

    // Voices may load async
    pickVoice()
    window.speechSynthesis.onvoiceschanged = pickVoice
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { if (isOpen && !isVoiceMode && inputRef.current) inputRef.current.focus() }, [isOpen, isVoiceMode])

  // ── TTS ──────────────────────────────────────────────────────────────────
  const speak = useCallback((text: string, onDone?: () => void) => {
    if (!synthRef.current) { onDone?.(); return }
    synthRef.current.cancel()
    const plain = text.replace(/[#*`_~[\]()>]/g, '').replace(/\n+/g, '. ')
    const utterance = new SpeechSynthesisUtterance(plain)
    if (preferredVoiceRef.current) utterance.voice = preferredVoiceRef.current
    utterance.rate = 1.0; utterance.pitch = 1.05; utterance.volume = 1.0
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend   = () => { setIsSpeaking(false); onDone?.() }
    utterance.onerror = () => { setIsSpeaking(false); onDone?.() }
    synthRef.current.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
  }, [])

  // ── Text-chat submit ─────────────────────────────────────────────────────
  const doSubmit = useCallback(async (text: string, alwaysSpeak = false) => {
    if (!text.trim() || isLoading) return
    const userMessage: Message = { role: 'user', content: text.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    try {
      const conversationHistory = messagesRef.current.map(m => ({ role: m.role, content: m.content }))
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), conversationHistory }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to get response')
      const assistantMessage: Message = { role: 'assistant', content: data.message, timestamp: new Date() }
      setMessages(prev => [...prev, assistantMessage])
      if (alwaysSpeak || voiceEnabled) speak(data.message)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, voiceEnabled, speak])

  useEffect(() => { doSubmitRef.current = doSubmit }, [doSubmit])

  // ── Voice-mode submit ────────────────────────────────────────────────────
  const doVoiceSubmit = useCallback(async (text: string) => {
    setVoiceStatus('processing')
    const userMessage: Message = { role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    try {
      const conversationHistory = messagesRef.current.map(m => ({ role: m.role, content: m.content }))
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationHistory, language: voiceLangRef.current }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to get response')
      const aiText = data.message
      const assistantMessage: Message = { role: 'assistant', content: aiText, timestamp: new Date() }
      setMessages(prev => [...prev, assistantMessage])
      setVoiceResponse(aiText)
      setVoiceStatus('speaking')
      speak(aiText, () => setVoiceStatus('idle'))
    } catch {
      setVoiceResponse('Sorry, I encountered an error. Please try again.')
      setVoiceStatus('idle')
    }
  }, [speak])

  useEffect(() => { doVoiceSubmitRef.current = doVoiceSubmit }, [doVoiceSubmit])

  // ── Speech recognition (shared for both modes) ───────────────────────────────
  const startRecognition = useCallback((forVoiceMode: boolean) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    transcriptRef.current = ''
    const recognition = new SR()
    recognition.continuous     = false
    recognition.interimResults = true
    recognition.lang = forVoiceMode
      ? (LANG_OPTIONS.find(l => l.code === voiceLangRef.current)?.srLang ?? 'en-NG')
      : 'en-NG'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const t = Array.from(event.results).map(r => r[0].transcript).join('')
      transcriptRef.current = t
      if (forVoiceMode) setVoiceTranscript(t)
      else              setInput(t)
    }

    recognition.onend = () => {
      const finalText = transcriptRef.current.trim()
      transcriptRef.current = ''
      if (forVoiceMode) {
        if (finalText) doVoiceSubmitRef.current(finalText)
        else           setVoiceStatus('idle')
      } else {
        if (finalText) doSubmitRef.current(finalText, true)
      }
    }

    recognition.onerror = () => {
      if (forVoiceMode) setVoiceStatus('idle')
      transcriptRef.current = ''
    }

    recognitionRef.current = recognition
    recognition.start()
    if (forVoiceMode) setVoiceStatus('listening')
  }, [])

  const stopRecognition = useCallback(() => { recognitionRef.current?.stop() }, [])

  // ── Hands-free: auto-restart listening after AI finishes speaking ─────────
  useEffect(() => {
    if (!isVoiceMode || !handsFree || voiceStatus !== 'idle') return
    const t = setTimeout(() => {
      if (handsFreeRef.current) startRecognition(true)
    }, 900)
    return () => clearTimeout(t)
  }, [voiceStatus, isVoiceMode, handsFree, startRecognition])

  useEffect(() => () => { stopRecognition(); stopSpeaking() }, [stopRecognition, stopSpeaking])

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); await doSubmit(input) }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e) }
  }

  const handleClose = () => {
    setIsOpen(false); setIsFullScreen(false); setIsVoiceMode(false)
    stopSpeaking(); stopRecognition()
  }

  const enterVoiceMode = () => {
    stopSpeaking()
    setVoiceTranscript(''); setVoiceResponse(''); setVoiceStatus('idle')
    setHandsFree(false)
    setIsVoiceMode(true)
  }

  const exitVoiceMode = () => {
    stopRecognition(); stopSpeaking()
    setHandsFree(false); setVoiceStatus('idle'); setIsVoiceMode(false)
  }

  const toggleHandsFree = () => {
    const next = !handsFree
    setHandsFree(next)
    if (!next) {
      stopRecognition(); stopSpeaking(); setVoiceStatus('idle')
    }
    if (next && voiceStatus === 'idle') {
      setTimeout(() => startRecognition(true), 300)
    }
  }

  // Manual mic: pause/resume in hands-free or normal tap-to-talk
  const handleVoiceMicToggle = () => {
    if (voiceStatus === 'listening') {
      stopRecognition()
      setVoiceStatus('idle')
      if (handsFree) { setHandsFree(false); handsFreeRef.current = false }
    } else if (voiceStatus === 'idle') {
      startRecognition(true)
    } else if (voiceStatus === 'speaking') {
      stopSpeaking()
      setVoiceStatus('idle')
    }
  }

  // ── Text-chat window class ────────────────────────────────────────────────
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

  // ── Waveform heights (stable per bar index) ───────────────────────────────
  const waveHeights = [14, 22, 10, 30, 18, 26, 8, 32, 16, 24, 12, 28, 20, 14, 30, 8, 22, 18, 26, 10, 28, 16, 20, 12]

  return (
    <>
      {/* ── Floating open button ─────────────────────────────────────────── */}
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

      {/* ── Voice Mode full-screen overlay ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && isVoiceMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-gradient-to-br from-green-950 via-emerald-900 to-gray-900 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-6 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-green-500/20 border border-green-400/20 rounded-full p-2">
                  <Sprout className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Voice Mode</p>
                  <p className="text-green-300/60 text-[11px]">Agricultural Advisor · CCSA</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={exitVoiceMode}
                  className="text-white/50 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 text-xs transition-colors border border-white/10 hover:border-white/20"
                >
                  Text mode
                </button>
                <button
                  onClick={handleClose}
                  className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors ml-1"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Conversation display */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              {!voiceTranscript && !voiceResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center justify-center h-full gap-3 text-center"
                >
                  <div className="bg-green-500/10 border border-green-400/10 rounded-2xl px-5 py-4 max-w-xs">
                    <p className="text-white/50 text-sm leading-relaxed">
                      Select your language below, then tap the mic and ask your question
                    </p>
                  </div>
                  <p className="text-white/25 text-xs">Supports English, Pidgin, Yoruba, Igbo & Hausa</p>
                </motion.div>
              )}

              <AnimatePresence>
                {voiceTranscript && (
                  <motion.div
                    key="user-bubble"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-end"
                  >
                    <div className="bg-white/15 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-white/40 text-[10px] mb-1 uppercase tracking-wide">You</p>
                      <p className="text-white text-sm leading-relaxed">{voiceTranscript}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {voiceResponse && (
                  <motion.div
                    key="ai-bubble"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-green-300/60 text-[10px] mb-1 uppercase tracking-wide flex items-center gap-1">
                        <Sprout className="h-2.5 w-2.5" /> Advisor
                      </p>
                      <p className="text-green-50 text-sm leading-relaxed">{voiceResponse}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom controls */}
            <div className="shrink-0 flex flex-col items-center gap-5 pt-2 pb-10 px-5">

              {/* Animated waveform */}
              <div className="flex items-end gap-[3px] h-12">
                {waveHeights.map((h, i) => (
                  <motion.span
                    key={i}
                    className={`w-[3px] rounded-full ${
                      voiceStatus === 'listening' ? 'bg-red-400' :
                      voiceStatus === 'speaking'  ? 'bg-green-400' :
                      'bg-white/20'
                    }`}
                    animate={
                      voiceStatus === 'listening' || voiceStatus === 'speaking'
                        ? { height: ['4px', `${h}px`, '4px'] }
                        : { height: '4px' }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.3 + (i % 6) * 0.07,
                      delay: i * 0.04,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Status label */}
              <motion.p
                key={`${voiceStatus}-${handsFree}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm font-medium text-center px-4 ${
                  voiceStatus === 'listening'  ? 'text-red-400' :
                  voiceStatus === 'processing' ? 'text-yellow-400' :
                  voiceStatus === 'speaking'   ? 'text-green-400' :
                  'text-white/50'
                }`}
              >
                {handsFree ? HANDS_FREE_STATUS_LABELS[voiceStatus] : VOICE_STATUS_LABELS[voiceStatus]}
              </motion.p>

              {/* Big mic button with ripple rings */}
              <div className="relative flex items-center justify-center mb-1">
                {voiceStatus === 'listening' && (
                  <>
                    <motion.span
                      className="absolute w-28 h-28 rounded-full bg-red-500/20"
                      animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                      transition={{ repeat: Infinity, duration: 1.3, ease: 'easeOut' }}
                    />
                    <motion.span
                      className="absolute w-28 h-28 rounded-full bg-red-500/10"
                      animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.3, ease: 'easeOut', delay: 0.45 }}
                    />
                  </>
                )}
                {voiceStatus === 'speaking' && (
                  <>
                    <motion.span
                      className="absolute w-28 h-28 rounded-full bg-green-400/20"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.0, ease: 'easeOut' }}
                    />
                  </>
                )}
                <motion.button
                  onClick={handleVoiceMicToggle}
                  disabled={voiceStatus === 'processing'}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: voiceStatus === 'idle' ? 1.05 : 1 }}
                  className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-2xl transition-colors ${
                    voiceStatus === 'listening'
                      ? 'bg-red-500 hover:bg-red-400 shadow-red-500/40'
                      : voiceStatus === 'processing'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : voiceStatus === 'speaking'
                      ? 'bg-green-600 hover:bg-green-500 shadow-green-500/40'
                      : 'bg-green-500 hover:bg-green-400 shadow-green-500/40'
                  }`}
                  aria-label={voiceStatus === 'listening' ? 'Stop listening' : 'Start speaking'}
                >
                  {voiceStatus === 'processing' ? (
                    <Loader2 className="h-7 w-7 text-white animate-spin" />
                  ) : voiceStatus === 'speaking' ? (
                    <Volume2 className="h-7 w-7 text-white" />
                  ) : voiceStatus === 'listening' ? (
                    <MicOff className="h-7 w-7 text-white" />
                  ) : (
                    <Mic className="h-7 w-7 text-white" />
                  )}
                </motion.button>
              </div>

              {/* Hands-free toggle */}
              <button
                onClick={toggleHandsFree}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  handsFree
                    ? 'bg-green-500/20 border-green-400/40 text-green-300 shadow-lg shadow-green-500/10'
                    : 'bg-white/5 border-white/15 text-white/50 hover:bg-white/10 hover:text-white/70'
                }`}
                aria-label={handsFree ? 'Turn off hands-free mode' : 'Turn on hands-free mode'}
              >
                {/* Circular arrows icon */}
                <svg className={`w-3.5 h-3.5 ${handsFree ? 'animate-spin [animation-duration:3s]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {handsFree ? 'Hands-free ON — tap mic to pause' : 'Hands-free'}
              </button>

              {/* Language selector pills */}
              <div className="flex gap-2 flex-wrap justify-center">
                {LANG_OPTIONS.map(l => (
                  <div key={l.code} className="relative">
                    <button
                      onClick={() => setVoiceLang(l.code)}
                      disabled={!!l.comingSoon}
                      className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                        l.comingSoon
                          ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                          : voiceLang === l.code
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white border border-white/10'
                      }`}
                    >
                      {l.label}
                    </button>
                    {l.comingSoon && (
                      <span className="absolute -top-2 -right-1 bg-yellow-500 text-[8px] font-bold text-black px-1 py-px rounded-full leading-tight whitespace-nowrap">
                        APP
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-white/25 text-[10px] text-center">
                Pidgin · Yoruba · Igbo · Hausa voice available on the mobile app
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Text Chat Window ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && !isVoiceMode && (
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
                {speechSupported && (
                  <>
                    {/* Voice mode button */}
                    <button
                      onClick={enterVoiceMode}
                      className="hover:bg-white/20 rounded-full p-2 transition-colors"
                      title="Switch to voice mode"
                      aria-label="Voice mode"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                    {/* Auto-speak toggle */}
                    <button
                      onClick={() => { setVoiceEnabled(v => !v); if (voiceEnabled) stopSpeaking() }}
                      className={`rounded-full p-2 transition-colors ${voiceEnabled ? 'bg-white/30' : 'hover:bg-white/20'}`}
                      title={voiceEnabled ? 'Voice responses: ON' : 'Voice responses: OFF'}
                      aria-label={voiceEnabled ? 'Disable voice responses' : 'Enable voice responses'}
                    >
                      {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsFullScreen(f => !f)}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label={isFullScreen ? 'Exit full screen' : 'Full screen'}
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button onClick={handleClose} className="hover:bg-white/20 rounded-full p-2 transition-colors" aria-label="Close chat">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

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
                      <span className="text-sm text-gray-600 dark:text-gray-400">Thinking…</span>
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
                  placeholder="Ask about agriculture…"
                  className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white placeholder:text-gray-500 min-h-[40px]"
                  rows={1}
                  disabled={isLoading}
                />
                {speechSupported && (
                  <button
                    type="button"
                    onClick={() => startRecognition(false)}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl px-3 py-2 transition-all flex items-center justify-center shrink-0"
                    aria-label="Voice input"
                    title="Quick voice input"
                  >
                    <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-3 sm:px-4 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              {speechSupported && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                  Enter to send · mic icon for full voice mode
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
