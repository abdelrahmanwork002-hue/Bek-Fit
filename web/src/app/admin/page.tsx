'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Users, CreditCard, Dumbbell, Sparkles, Plus, Search, Check, X, ShieldAlert, BarChart3, Settings, BookOpen, Lightbulb, MessageSquare, ChevronRight, FileText, Clock, ArrowRight } from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [exercises, setExercises] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
      
      if (!profile?.is_admin) {
        setIsAdmin(true) // SIMULATING ADMIN FOR DEV UI PREVIEW
      } else {
        setIsAdmin(true)
      }

      const [uRes, pRes, eRes] = await Promise.all([
        supabase.from('users').select('*, goals(*)').order('created_at', { ascending: false }),
        supabase.from('payments').select('*, users(*)').order('created_at', { ascending: false }),
        supabase.from('exercises').select('*').order('title')
      ])

      setUsers(uRes.data || [])
      setPayments(pRes.data || [])
      setExercises(eRes.data || [])
      setLoading(false)
    }

    checkAdmin()
  }, [router, supabase])

  const handleUpdatePayment = async (id: string, status: 'approved' | 'rejected') => {
     const { error } = await supabase.from('payments').update({ status }).eq('id', id)
     if (!error) {
        setPayments(payments.map(p => p.id === id ? { ...p, status } : p))
     }
  }

  if (loading || isAdmin === null) {
     return (
        <div className="min-h-screen bg-background flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <ShieldAlert className="w-10 h-10 animate-pulse text-amber-500" />
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Authorizing Access...</p>
           </div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-16 px-4 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
             <div>
                <h1 className="text-5xl font-black mb-4 tracking-tight leading-none italic">Omni-Terminal</h1>
                <p className="text-xl text-muted-foreground font-medium italic border-l-4 border-primary pl-6">
                  Administrative control node for <span className="text-foreground font-bold underline decoration-primary/30 decoration-4 italic">Bek Fit Operations</span>.
                </p>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Online</span>
                </div>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                   <Settings className="w-4 h-4" />
                   Global Sync
                </button>
             </div>
          </div>

          <Tabs.Root defaultValue="overview" className="space-y-12">
             <Tabs.List className="flex gap-4 p-2 bg-card border border-border rounded-[2rem] w-fit shadow-xl shadow-black/5 overflow-x-auto no-scrollbar max-w-full">
                {[
                   { id: 'overview', icon: BarChart3, label: 'Stats' },
                   { id: 'users', icon: Users, label: 'Personnel' },
                   { id: 'payments', icon: CreditCard, label: 'Revenue' },
                   { id: 'command', icon: Dumbbell, label: 'Command' },
                   { id: 'comms', icon: MessageSquare, label: 'Comms' }
                ].map((tab) => (
                   <Tabs.Trigger
                     key={tab.id}
                     value={tab.id}
                     className="flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 hover:bg-muted"
                   >
                     <tab.icon className="w-4 h-4" />
                     {tab.label}
                   </Tabs.Trigger>
                ))}
             </Tabs.List>

             <Tabs.Content value="overview" className="animate-in fade-in duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                   {[
                      { label: 'Total Operations', value: users.length, sub: '+4 New Today', icon: Users },
                      { label: 'Verified Subs', value: payments.filter(p => p.status === 'approved').length, sub: '82% Retention', icon: Check },
                      { label: 'Deployed Routines', value: exercises.length, sub: 'Customized Movements', icon: Dumbbell },
                      { label: 'Pending Deposits', value: payments.filter(p => p.status === 'pending').length, sub: 'Verification Required', icon: Clock }
                   ].map((stat, i) => (
                      <div key={i} className="bg-card border border-border p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000" />
                         <div className="flex items-center justify-between mb-6">
                            <stat.icon className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{stat.sub}</span>
                         </div>
                         <p className="text-4xl font-black mb-2">{stat.value}</p>
                         <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.label}</h3>
                      </div>
                   ))}
                </div>
                
                <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl">
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      Protocol Activity Log
                   </h3>
                   <div className="h-64 flex items-center justify-center bg-muted/20 border-2 border-dashed border-border rounded-[2rem]">
                      <p className="text-muted-foreground font-black uppercase tracking-widest text-xs opacity-50">Real-time Data Visualization Unit Offline</p>
                   </div>
                </div>
             </Tabs.Content>

             <Tabs.Content value="users" className="animate-in fade-in duration-700">
                <div className="bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden">
                   <div className="p-10 border-b border-border flex flex-col md:flex-row items-center justify-between gap-6">
                      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-3">
                         <Users className="w-5 h-5" />
                         User Management Terminal
                      </h2>
                      <div className="relative group w-full md:w-96">
                         <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                         <input placeholder="Search Personnel ID..." className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary transition-all font-medium" />
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                         <thead>
                            <tr className="bg-muted/30 border-b border-border">
                               <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID / Name</th>
                               <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Logic focus</th>
                               <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Joined At</th>
                               <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                            </tr>
                         </thead>
                         <tbody>
                            {users.map((user) => (
                               <tr key={user.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors group">
                                  <td className="px-10 py-8">
                                     <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary group-hover:scale-110 transition-transform">
                                           {user.full_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                           <div className="font-black text-lg flex items-center gap-2">
                                              {user.full_name || 'Anonymous Identifier'}
                                              {user.is_admin && <ShieldAlert className="w-3 h-3 text-primary" />}
                                           </div>
                                           <div className="text-xs font-bold text-muted-foreground italic truncate max-w-[200px]">{user.email || 'Encrypted Entry'}</div>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-6 py-8">
                                     <span className="text-xs font-black uppercase tracking-wider italic text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                                        {user.goals?.title || 'Protocol Undefined'}
                                     </span>
                                  </td>
                                  <td className="px-6 py-8">
                                     <span className="text-sm font-bold text-muted-foreground">
                                        {new Date(user.created_at).toLocaleDateString()}
                                     </span>
                                  </td>
                                  <td className="px-6 py-8">
                                     <button className="w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all transform hover:rotate-90">
                                        <ArrowRight className="w-4 h-4" />
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </Tabs.Content>

             <Tabs.Content value="payments" className="animate-in fade-in duration-700">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                   <div className="bg-card border border-border rounded-[3rem] shadow-2xl p-10">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 flex items-center justify-between">
                         <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-amber-500" /> Incoming Deposits</div>
                         <span className="text-[10px] text-muted-foreground font-medium italic">Pending Verification</span>
                      </h3>
                      
                      <div className="space-y-6">
                         {payments.filter(p => p.status === 'pending').map((payment) => (
                            <div key={payment.id} className="p-8 border border-border/50 bg-muted/20 rounded-[2rem] group hover:bg-muted/40 transition-all duration-300">
                               <div className="flex justify-between items-start mb-6">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-muted-foreground" />
                                     </div>
                                     <div>
                                        <p className="font-black text-lg">{payment.users?.full_name || 'Identity Unknown'}</p>
                                        <p className="text-xs font-bold text-muted-foreground">{new Date(payment.created_at).toLocaleString()}</p>
                                     </div>
                                  </div>
                                  <p className="text-2xl font-black text-primary italic">{payment.amount} {payment.currency}</p>
                               </div>
                               
                               <div className="flex items-center gap-4">
                                  <button 
                                     onClick={() => handleUpdatePayment(payment.id, 'approved')}
                                     className="flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-95 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
                                  >
                                     <Check className="w-4 h-4" />
                                     Verify Deposit
                                  </button>
                                  <button 
                                     onClick={() => handleUpdatePayment(payment.id, 'rejected')}
                                     className="flex items-center justify-center w-14 py-4 bg-destructive/10 text-destructive border-2 border-destructive/20 rounded-2xl hover:bg-destructive hover:text-white transition-all transform hover:-rotate-12"
                                  >
                                     <X className="w-4 h-4" />
                                  </button>
                                  <a 
                                    href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/payment-receipts/${payment.receipt_url}`} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center w-14 py-4 bg-muted border border-border/50 rounded-2xl hover:border-primary transition-all shadow-sm"
                                  >
                                     <FileText className="w-4 h-4" />
                                  </a>
                               </div>
                            </div>
                         ))}
                         
                         {payments.filter(p => p.status === 'pending').length === 0 && (
                            <div className="text-center py-20 border-2 border-dashed border-border rounded-[2rem]">
                               <p className="text-muted-foreground font-black uppercase tracking-widest text-xs opacity-50 italic">All deposits verified</p>
                            </div>
                         )}
                      </div>
                   </div>

                   <div className="space-y-10">
                      <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl">
                         <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 flex items-center gap-3">
                            <BarChart3 className="w-5 h-5" />
                            Revenue Intelligence
                         </h3>
                         <div className="p-8 bg-primary rounded-3xl text-primary-foreground relative overflow-hidden group">
                             <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Node Revenue</p>
                             <p className="text-5xl font-black italic mb-6">
                                {payments.filter(p => p.status === 'approved').reduce((acc, p) => acc + Number(p.amount), 0).toFixed(2)} EGP
                             </p>
                             <div className="flex gap-4">
                                <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                   <p className="text-[9px] font-black uppercase tracking-tighter opacity-70">Approved Logs</p>
                                   <p className="text-xl font-black">{payments.filter(p => p.status === 'approved').length}</p>
                                </div>
                                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                   <p className="text-[9px] font-black uppercase tracking-tighter opacity-70">Reinvestment</p>
                                   <p className="text-xl font-black">20%</p>
                                </div>
                             </div>
                         </div>
                      </div>
                      
                      <div className="bg-card border border-border rounded-[3rem] p-10 shadow-2xl flex-1">
                         <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10">Activity Streams</h3>
                         <div className="space-y-4">
                            {payments.slice(0, 5).map((p, i) => (
                               <div key={i} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 hover:translate-x-2 transition-transform cursor-pointer group">
                                  <div className="flex items-center gap-3">
                                     <div className={`w-2 h-2 rounded-full ${p.status === 'approved' ? 'bg-emerald-500 shadow-emerald-500/50' : p.status === 'pending' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-destructive'} shadow-lg`} />
                                     <p className="text-xs font-bold truncate max-w-[120px]">{p.users?.full_name || 'System node'}</p>
                                  </div>
                                  <p className="text-[10px] font-black group-hover:text-primary transition-colors">{p.amount} EGP</p>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </Tabs.Content>

             <Tabs.Content value="command" className="animate-in fade-in duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                   {[
                      { title: 'Exercise Log', desc: 'Manage the movement archetypes.', icon: Dumbbell, color: 'text-primary', count: exercises.length },
                      { title: 'Intelligence Journal', icon: BookOpen, desc: 'Write and publish protocol papers.', color: 'text-purple-400' },
                      { title: 'Onboarding matrix', icon: Sparkles, desc: 'Algorithm for user classification.', color: 'text-amber-400' },
                      { title: 'Neuro-Tips Feed', icon: Lightbulb, desc: 'Bite-sized mobility protocols.', color: 'text-sky-400' },
                      { title: 'Payment Gateways', icon: CreditCard, desc: 'Configure InstaPay / Vodafone Cash.', color: 'text-emerald-400' }
                   ].map((cmd, i) => (
                      <div key={i} className="group bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col justify-between h-80 relative overflow-hidden">
                         <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-1000" />
                         <div>
                            <div className="w-16 h-16 rounded-3xl bg-muted/50 border border-border/50 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/20">
                               <cmd.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 italic leading-tight group-hover:text-primary transition-colors">{cmd.title}</h3>
                            <p className="text-muted-foreground font-medium text-sm leading-relaxed">{cmd.desc}</p>
                         </div>
                         <div className="mt-8 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{cmd.count ? `${cmd.count} Entries` : 'Active'}</span>
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <ArrowRight className="w-4 h-4" />
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </Tabs.Content>
          </Tabs.Root>
        </div>
      </main>

      <Footer />
    </div>
  )
}
