import Link from "next/link"
import { CheckCircle2, Mail, ArrowLeft } from "lucide-react"

export default function TrainingApplicationSuccessPage() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-green-50 via-white to-emerald-50 px-4 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-green-100 bg-white p-8 text-center shadow-lg shadow-green-100/50">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-green-700">Application Successful</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Thank you for applying</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          Your training application has been received successfully. Our team will review your details and get back to you shortly with the next steps.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
          <Mail className="h-4 w-4" />
          You will receive a confirmation email shortly.
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/trainings" className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to trainings
          </Link>
        </div>
      </div>
    </div>
  )
}
