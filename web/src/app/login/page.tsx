'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, Lock, Chrome, Facebook, ArrowRight, Loader2, Phone } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
         redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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
            
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black mb-3 tracking-tight">Welcome Back</h1>
              <p className="text-muted-foreground text-lg">Continue your transformation journey.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm font-bold animate-in shake duration-300">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
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
                <div className="flex items-center justify-between ml-1">
                   <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password</label>
                   <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">
                      Forgot?
                   </Link>
                </div>
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
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In'}
                {!isLoading && <ArrowRight className="w-6 h-6" />}
              </button>
            </form>

            <div className="my-10 flex items-center gap-4 text-muted-foreground">
               <div className="h-px bg-border flex-1" />
               <span className="text-[10px] font-black uppercase tracking-widest">Or Continue With</span>
               <div className="h-px bg-border flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button
                 onClick={() => handleSocialLogin('google')}
                 className="flex items-center justify-center gap-3 py-4 border-2 border-border rounded-2xl font-bold hover:bg-muted transition-colors active:scale-95"
               >
                 <Chrome className="w-5 h-5" />
                 Gmail
               </button>
               <button
                 onClick={() => handleSocialLogin('facebook')}
                 className="flex items-center justify-center gap-3 py-4 border-2 border-border rounded-2xl font-bold hover:bg-muted transition-colors active:scale-95"
               >
                 <Facebook className="w-5 h-5" fill="currentColor" />
                 Facebook
               </button>
            </div>

            <div className="mt-8 text-center text-muted-foreground font-medium">
               New to Bek Fit?{' '}
               <Link href="/signup" className="text-primary font-black hover:underline">
                  Create Account
               </Link>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-6">
             <Link href="/login/mobile" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                Phone OTP Login
             </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
