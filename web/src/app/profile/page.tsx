/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { User, Mail, Calendar, Target, Bell, CreditCard, Loader2, CheckCircle2, AlertCircle, LogOut, ChevronDown } from 'lucide-react'
import * as Switch from '@radix-ui/react-switch'
import { createClient } from '@/lib/supabase/client'
import { updateUserProfile } from '@/app/actions/user'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [goals, setGoals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Fetch user profile and goals
      const [profileRes, goalsRes] = await Promise.all([
        supabase.from('users').select('*, goals(*)').eq('id', user.id).single(),
        supabase.from('goals').select('*')
      ])

      setUserData({ ...profileRes.data, email: user.email })
      setGoals(goalsRes.data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateUserProfile(formData)

    if (result.success) {
      setMessage({ type: 'success', text: result.success })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' })
    }
    setIsSaving(false)
  }

  const handleLogout = async () => {
     await supabase.auth.signOut()
     router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
         <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-16 px-4 bg-muted/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div>
               <h1 className="text-5xl font-black mb-4 tracking-tight leading-none">Profile</h1>
               <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary pl-6">
                 Engineering your <span className="text-foreground font-bold underline decoration-primary/30 decoration-4">digital blueprint</span>.
               </p>
            </div>
            <button 
               onClick={handleLogout}
               className="flex items-center gap-2 px-6 py-3 bg-destructive/10 text-destructive border-2 border-destructive/20 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-destructive hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
               <LogOut className="w-4 h-4" />
               Log Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Personal Info Form */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
                
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 flex items-center gap-3">
                   <User className="w-5 h-5" />
                   Personal Protocol
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground group-focus-within/field:text-primary transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          name="fullName"
                          type="text"
                          defaultValue={userData.full_name || ''}
                          className="w-full bg-muted/30 border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 opacity-70">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email (Immutable)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          readOnly
                          value={userData.email || ''}
                          className="w-full bg-muted/30 border border-border/10 rounded-2xl py-4 pl-12 pr-4 cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Age</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground group-focus-within/field:text-primary transition-colors">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          name="age"
                          type="number"
                          defaultValue={userData.profile_data?.age || ''}
                          className="w-full bg-muted/30 border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Active Objective</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-4 flex items-center text-muted-foreground group-focus-within/field:text-primary transition-colors z-10 pointer-events-none">
                          <Target className="w-4 h-4" />
                        </div>
                        <select 
                           name="goalId"
                           className="w-full bg-muted/30 border border-border rounded-2xl py-4 pl-12 pr-10 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none relative"
                           defaultValue={userData.goal_id || 'none'}
                        >
                           <option value="none">No specific goal selected</option>
                           {goals.map(goal => (
                              <option key={goal.id} value={goal.id}>{goal.title}</option>
                           ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
                      message.type === 'success' ? 'bg-primary/10 border border-primary/20 text-foreground' : 'bg-destructive/10 border border-destructive/20 text-destructive'
                    }`}>
                       {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <AlertCircle className="w-5 h-5" />}
                       <p className="text-sm font-bold">{message.text}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSaving ? (
                       <><Loader2 className="w-6 h-6 animate-spin" /> Persisting...</>
                    ) : (
                       'Update Protocol'
                    )}
                  </button>
                </form>
              </div>

              {/* Notification Toggles */}
              <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-lg group">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 flex items-center gap-3">
                    <Bell className="w-5 h-5" />
                    Neural Alerts
                  </h2>
                  <div className="space-y-6">
                    {[
                      { id: 'reminders', title: 'Workout Reminders', desc: 'Sync your movement sessions with calendar alerts.' },
                      { id: 'posture', title: 'Posture Pulse', desc: 'Neural reminders to recalibrate your alignment.' },
                      { id: 'summary', title: 'Weekly Recap', desc: 'Data-driven insights into your physical evolution.' }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-muted/20 border border-border/30 rounded-3xl hover:bg-muted transition-colors">
                        <div>
                          <p className="font-bold text-lg mb-1">{item.title}</p>
                          <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                        </div>
                        <Switch.Root className="w-14 h-8 bg-muted border border-border/50 rounded-full relative data-[state=checked]:bg-primary transition-colors focus:ring-4 focus:ring-primary/10">
                          <Switch.Thumb className="block w-6 h-6 bg-background rounded-full shadow-lg transition-transform translate-x-1 will-change-transform data-[state=checked]:translate-x-[26px]" />
                        </Switch.Root>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-10">
               {/* Subscription Card */}
               <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-xl relative overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
                  
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8">
                     <CreditCard className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3">Elite Tier</h3>
                  <div className="px-5 py-1.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-black uppercase tracking-widest mb-10">
                     Active Protocol
                  </div>
                  
                  <div className="w-full space-y-4 mb-10">
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-muted-foreground">Renewal Date</span>
                        <span>May 28, 2026</span>
                     </div>
                     <div className="h-px bg-border/50" />
                     <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-muted-foreground">Plan Frequency</span>
                        <span>Monthly</span>
                     </div>
                  </div>
                  
                  <button className="w-full py-4 border-2 border-primary text-primary font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all">
                     Manage Billing
                  </button>
               </div>
               
               {/* Support Placeholder */}
               <div className="p-10 bg-primary rounded-[2.5rem] text-primary-foreground text-center shadow-xl shadow-primary/20">
                  <h4 className="text-xl font-black mb-4">Need Re-Calibration?</h4>
                  <p className="text-sm font-medium opacity-80 mb-8 leading-relaxed">Our AI diagnostic team is available 24/7 to assist with your physical protocols.</p>
                  <button className="w-full py-4 bg-background text-foreground font-black uppercase tracking-widest text-xs rounded-2xl hover:opacity-90 transition-all">
                     Contact Coach
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
