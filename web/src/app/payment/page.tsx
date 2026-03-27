'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Upload, CheckCircle, Clock, XCircle, CreditCard, Smartphone, ArrowRight, Loader2, FileText, Info } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { submitPaymentReceipt } from '@/app/actions/payments'
import { useRouter } from 'next/navigation'

export default function PaymentPage() {
  const [paymentStatus, setPaymentStatus] = useState<any>(null)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function fetchPayment() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Fetch the most recent payment
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('processed_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!error) {
         setPaymentStatus(data)
      }
      setLoading(false)
    }

    fetchPayment()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!receiptFile) return
    setIsUploading(true)
    setMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // 1. Upload to Storage
    const fileName = `${user.id}/${Date.now()}-${receiptFile.name}`
    const { data: storageData, error: storageError } = await supabase.storage
      .from('payment-receipts')
      .upload(fileName, receiptFile)

    if (storageError) {
      setMessage({ type: 'error', text: storageError.message })
      setIsUploading(false)
      return
    }

    // 2. Submit Action
    const formData = new FormData()
    formData.append('amount', '299.00') // Fixed MVP amount
    formData.append('receiptUrl', storageData.path)

    const result = await submitPaymentReceipt(formData)

    if (result.success) {
      setMessage({ type: 'success', text: result.success })
      // Re-fetch payment status
      const { data } = await supabase.from('payments').select('*').eq('user_id', user.id).order('processed_at', { ascending: false }).limit(1).maybeSingle()
      setPaymentStatus(data)
    } else {
      setMessage({ type: 'error', text: result.error || 'Submission failed' })
    }
    
    setIsUploading(false)
    setReceiptFile(null)
  }

  const statusConfig = {
    pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'Verification Pending' },
    approved: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'Session Active' },
    rejected: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20', text: 'Transaction Failed' },
  }

  const currentStatus = (paymentStatus?.status as keyof typeof statusConfig) || null

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
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
                Essential Deployment Phase
             </div>
             <h1 className="text-5xl font-black mb-4 tracking-tight leading-none italic">Checkout Terminal</h1>
             <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-6">
               Secure your transformation. Unlock elite performance <span className="text-foreground font-bold">immediately</span>.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Instructions & Status */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Status Banner */}
              {currentStatus && (
                <div className={`p-8 rounded-[2.5rem] border ${statusConfig[currentStatus].border} ${statusConfig[currentStatus].bg} animate-in zoom-in-95 duration-500 relative overflow-hidden group`}>
                   <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${statusConfig[currentStatus].bg} border ${statusConfig[currentStatus].border}`}>
                         {(() => {
                            const Icon = statusConfig[currentStatus].icon
                            return <Icon className={`w-7 h-7 ${statusConfig[currentStatus].color}`} />
                         })()}
                      </div>
                      <div>
                         <h2 className={`text-2xl font-black ${statusConfig[currentStatus].color}`}>{statusConfig[currentStatus].text}</h2>
                         <p className="text-muted-foreground font-medium opacity-80">
                            {currentStatus === 'pending' ? 'Our AI-Ops team is validating your transaction signature.' : 
                             currentStatus === 'approved' ? 'Protocol initiated. You have unrestricted access.' : 
                             'Your transaction could not be verified. Please re-submit or contact support.'}
                         </p>
                      </div>
                   </div>
                </div>
              )}

              {/* Payment Methods */}
              <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-10 flex items-center gap-3">
                   <CreditCard className="w-5 h-5" />
                   Payment Channels
                </h2>

                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 group hover:border-primary/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                       <h3 className="text-2xl font-black flex items-center gap-3 italic">
                          <Smartphone className="w-6 h-6 text-primary" />
                          InstaPay
                       </h3>
                       <span className="text-xs font-black text-primary bg-primary/10 px-4 py-1.5 rounded-full uppercase tracking-tighter">Fastest Access</span>
                    </div>
                    <div className="space-y-4 font-mono">
                      <div className="flex justify-between items-center text-sm py-2 border-b border-border/30">
                         <span className="text-muted-foreground uppercase font-sans font-bold tracking-widest text-[10px]">Username</span>
                         <span className="text-foreground font-black">BekFit@InstaPay</span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-2">
                         <span className="text-muted-foreground uppercase font-sans font-bold tracking-widest text-[10px]">Protocol Fee</span>
                         <span className="text-primary font-black text-lg">299.00 EGP</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 group hover:border-primary/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                       <h3 className="text-2xl font-black flex items-center gap-3 italic">
                          <Smartphone className="w-6 h-6 text-primary" />
                          Vodafone Cash
                       </h3>
                    </div>
                    <div className="space-y-4 font-mono">
                      <div className="flex justify-between items-center text-sm py-2 border-b border-border/30">
                         <span className="text-muted-foreground uppercase font-sans font-bold tracking-widest text-[10px]">Number</span>
                         <span className="text-foreground font-black">01012345678</span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-2">
                         <span className="text-muted-foreground uppercase font-sans font-bold tracking-widest text-[10px]">Protocol Fee</span>
                         <span className="text-primary font-black text-lg">299.00 EGP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4">
                   <Info className="w-5 h-5 text-primary flex-shrink-0" />
                   <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                      After transfer, capture the transaction receipt and upload it using the terminal on the right. Access is typically granted after 1-2 network cycles.
                   </p>
                </div>
              </div>
            </div>

            {/* Right Column: Upload Terminal */}
            <div className="space-y-8">
               <div className="bg-card rounded-[2.5rem] border border-border p-10 shadow-2xl relative overflow-hidden h-fit">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8 ml-1 flex items-center gap-3">
                     <FileText className="w-5 h-5" />
                     Data Uplink
                  </h3>

                  {currentStatus === 'pending' || currentStatus === 'approved' ? (
                     <div className="text-center py-10">
                        <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${currentStatus === 'pending' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                           {currentStatus === 'pending' ? <Clock className="w-8 h-8 text-amber-500" /> : <CheckCircle className="w-8 h-8 text-emerald-500" />}
                        </div>
                        <h4 className="text-xl font-black mb-2">{currentStatus === 'pending' ? 'Verifying Upload' : 'Node Verified'}</h4>
                        <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-widest opacity-60">
                           System lock engaged during validation sequence.
                        </p>
                     </div>
                  ) : (
                    <div className="space-y-8 text-center">
                       <p className="text-sm font-medium text-muted-foreground text-left leading-relaxed">
                          Provide proof of payment for immediate account activation.
                       </p>

                       <div className="border-4 border-dashed border-muted rounded-[2rem] p-8 group hover:border-primary/30 transition-all relative">
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors hover:animate-bounce-subtle" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="receipt-uplink"
                          />
                          <label
                            htmlFor="receipt-uplink"
                            className="inline-block px-8 py-3 bg-muted border border-border/50 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-card hover:border-primary transition-all cursor-pointer shadow-sm shadow-black/5"
                          >
                            Select Transaction
                          </label>
                          {receiptFile && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-primary animate-in fade-in">
                               <CheckCircle className="w-4 h-4" />
                               <span className="text-xs font-black truncate max-w-[150px]">{receiptFile.name}</span>
                            </div>
                          )}
                       </div>

                       {message && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 text-left ${
                          message.type === 'success' ? 'bg-primary/10 text-foreground border border-primary/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
                        }`}>
                           <p className="text-xs font-black uppercase tracking-tighter">{message.text}</p>
                        </div>
                       )}

                       <button
                         onClick={handleUpload}
                         disabled={!receiptFile || isUploading}
                         className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                       >
                         {isUploading ? (
                            <><Loader2 className="w-6 h-6 animate-spin" /> Verifying</>
                         ) : (
                            <>Confirm Deposit <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                         )}
                       </button>
                    </div>
                  )}
               </div>
               
               {/* Guarantee Box */}
               <div className="p-8 bg-muted/30 border border-border rounded-[2.5rem]">
                  <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Integrity Guarantee</h4>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                     Your transactions are manually validated by our security team for 100% accuracy. Refunds are available within the first 7 days if the protocol does not meet your movement requirements.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
