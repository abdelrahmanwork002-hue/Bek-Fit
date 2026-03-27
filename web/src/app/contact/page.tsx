'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, MessageCircle, Globe, Send, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-16 px-4 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 animate-in fade-in slide-in-from-top-8 duration-1000">
            
            {/* Left Column: Info */}
            <div className="md:w-1/2 space-y-12">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
                     Support Protocol v1.0
                  </div>
                  <h1 className="text-6xl font-black mb-8 tracking-tight italic">Reach Out</h1>
                  <p className="text-2xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-10 max-w-lg">
                    Have an inquiry about your <span className="text-foreground font-bold">transformation logic</span>? Our diagnostic team is on standby.
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="p-8 bg-card border border-border rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000" />
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                           <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                           <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Direct Uplink</p>
                           <p className="text-xl font-black italic">Support@BekFit.com</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-card border border-border rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000" />
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                           <MessageCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                           <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Live Comms</p>
                           <p className="text-xl font-black italic">@BekFitOfficial</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-10 bg-primary rounded-[2.5rem] text-primary-foreground text-center shadow-xl shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
                  <Sparkles className="w-10 h-10 mx-auto mb-6 text-white" />
                  <h3 className="text-2xl font-black mb-4 italic">Collaborative Inquiry?</h3>
                  <p className="text-sm font-medium opacity-80 leading-relaxed mb-8">We are always open to performance-based partnerships and movement integration initiatives.</p>
                  <button className="w-full py-4 bg-background text-foreground font-black uppercase tracking-widest text-xs rounded-2xl hover:opacity-95 transition-all shadow-xl shadow-black/10">
                     Corporate Deck
                  </button>
               </div>
            </div>

            {/* Right Column: Form */}
            <div className="md:w-1/2">
               <div className="bg-card border border-border rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                  
                  {isSent ? (
                     <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20">
                           <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h2 className="text-4xl font-black mb-4 italic">Message Transmitted</h2>
                        <p className="text-muted-foreground font-medium text-lg italic opacity-80 mb-12">Our team will respond within the next 24-hour diagnostic cycle.</p>
                        <button 
                           onClick={() => setIsSent(false)}
                           className="px-10 py-4 border-2 border-primary text-primary font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                           Send New Transmission
                        </button>
                     </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                       <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 border-b border-border/50 pb-6 ml-1">Transmission Terminal</h2>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Identity</label>
                             <input
                                required
                                type="text"
                                className="w-full bg-muted/30 border border-border rounded-2xl py-5 px-6 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg"
                                placeholder="Full Name"
                             />
                          </div>
                          <div className="space-y-3">
                             <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Contact Node</label>
                             <input
                                required
                                type="email"
                                className="w-full bg-muted/30 border border-border rounded-2xl py-5 px-6 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg"
                                placeholder="Email Address"
                             />
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Protocol</label>
                          <select className="w-full bg-muted/30 border border-border rounded-2xl py-5 px-6 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-black text-lg appearance-none">
                             <option>General Support</option>
                             <option>Billing & Payment Query</option>
                             <option>Custom Movement Request</option>
                             <option>Technical Diagnostic</option>
                          </select>
                       </div>

                       <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Transmission Payload</label>
                          <textarea
                             required
                             rows={6}
                             className="w-full bg-muted/30 border border-border rounded-3xl py-6 px-8 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg resize-none italic"
                             placeholder="How can we assist in your evolution?"
                          />
                       </div>

                       <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-6 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-4 disabled:opacity-50 group mt-10"
                       >
                          {isSubmitting ? (
                             <><Loader2 className="w-6 h-6 animate-spin" /> Transmitting...</>
                          ) : (
                             <>Send Transmission <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                          )}
                       </button>
                    </form>
                  )}
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
