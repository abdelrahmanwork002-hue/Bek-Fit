'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, Lock, Chrome, Facebook, ArrowRight, Loader2, User, Sparkles } from 'lucide-react'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setSuccess('Transformation initiated! Please check your email for a confirmation link.')
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
         redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      }
    })
    if (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            {/* Design Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10 translate-y-1/2 -translate-x-1/2" />
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
                 <Sparkles className="w-4 h-4" />
                 Start Your Journey
              </div>
              <h1 className="text-4xl font-black mb-3 tracking-tight">Create Account</h1>
              <p className="text-muted-foreground text-lg">Join the elite fitness community.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm font-bold animate-in shake duration-300">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-foreground text-sm font-medium animate-in zoom-in-95 duration-500">
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                   </div>
                   <p className="leading-relaxed">
                      {success}
                   </p>
                </div>
              </div>
            )}

            {!success && (
              <>
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground group-focus-within:text-primary transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full bg-muted/30 border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground text-lg"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
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

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-muted/30 border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground text-lg"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Get Started'}
                    {!isLoading && <ArrowRight className="w-6 h-6" />}
                  </button>
                </form>

                <div className="my-10 flex items-center gap-4 text-muted-foreground">
                   <div className="h-px bg-border flex-1" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Or Register With</span>
                   <div className="h-px bg-border flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button
                     onClick={() => handleSocialLogin('google')}
                     className="flex items-center justify-center gap-3 py-4 border-2 border-border rounded-2xl font-bold hover:bg-muted transition-colors active:scale-95"
                   >
                     <Chrome className="w-5 h-5" />
                     Google
                   </button>
                   <button
                     onClick={() => handleSocialLogin('facebook')}
                     className="flex items-center justify-center gap-3 py-4 border-2 border-border rounded-2xl font-bold hover:bg-muted transition-colors active:scale-95"
                   >
                     <Facebook className="w-5 h-5" fill="currentColor" />
                     Facebook
                   </button>
                </div>
              </>
            )}

            <div className="mt-8 text-center text-muted-foreground font-medium">
               Already transforming?{' '}
               <Link href="/login" className="text-primary font-black hover:underline">
                  Sign In
               </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
