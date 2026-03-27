'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, ArrowLeft, Loader2, KeyRound } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/profile/change-password`,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setSuccess('Recovery link sent! Check your inbox to reset your password.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden text-center">
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-8 animate-bounce-subtle">
               <KeyRound className="w-8 h-8" />
            </div>

            <h1 className="text-4xl font-black mb-3 tracking-tight">Recovery</h1>
            <p className="text-muted-foreground text-lg mb-10">Lost your key? We'll help you get back in.</p>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm font-bold animate-in shake duration-300 text-left">
                {error}
              </div>
            )}

            {success ? (
              <div className="mb-6 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-foreground text-sm font-medium animate-in zoom-in-95 duration-500">
                <div className="flex gap-4 text-left">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                   </div>
                   <p className="leading-relaxed">
                      {success}
                   </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-muted/30 border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground text-lg"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="mt-10 text-center">
               <Link href="/login" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline group">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Log In
               </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
