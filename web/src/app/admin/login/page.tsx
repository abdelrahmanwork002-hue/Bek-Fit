'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldAlert, ArrowRight, Loader2, Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Initialize supabase with SSR cookies
  const supabase = createClient()

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password,
    })

    if (error) {
      setError(`Auth Error: ${error.message}`)
      setIsLoading(false)
    } else {
      window.location.href = '/admin'
    }
  }

  // Debug tool to create the admin if they don't exist yet with the prefix
  const handleAdminSignup = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password,
      options: {
         data: { is_admin: true, full_name: 'Superadmin Provider' }
      }
    })
    
    if (error) {
       setError(error.message)
    } else {
       setError("Admin profile successfully seeded! Please Login.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
         <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 border border-primary/50 shadow-[0_0_30px_rgba(109,204,196,0.3)]">
               <ShieldAlert className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">Admin Terminal</h1>
            <p className="text-zinc-500 text-sm mt-2 font-medium">Restricted Access Module</p>
         </div>

         {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-wider text-center">
               {error}
            </div>
         )}

         <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Admin Email</label>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-zinc-500 group-focus-within:text-primary transition-colors">
                     <Mail className="w-4 h-4" />
                  </div>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                     placeholder="ops@company.com"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Security Key</label>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-zinc-500 group-focus-within:text-primary transition-colors">
                     <Lock className="w-4 h-4" />
                  </div>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                     placeholder="••••••••"
                  />
               </div>
            </div>

            <button
               type="submit"
               disabled={isLoading}
               className="w-full py-4 bg-primary text-zinc-950 rounded-xl font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
               {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize"}
            </button>
            
            <button
               type="button"
               onClick={handleAdminSignup}
               className="w-full py-2 text-zinc-500 font-medium text-xs hover:text-white transition-colors underline"
            >
               Force Seed Admin Account
            </button>
         </form>
         
         <div className="mt-8 text-center">
            <Link href="/login" className="text-xs font-bold text-zinc-600 hover:text-primary transition-colors inline-flex items-center gap-1 uppercase tracking-widest">
               <ArrowRight className="w-3 h-3" /> Return to Consumer Login
            </Link>
         </div>
      </div>
    </div>
  )
}
