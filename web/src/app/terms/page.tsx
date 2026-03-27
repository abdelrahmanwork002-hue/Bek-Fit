import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-5xl font-black italic tracking-tight">Terms & Privacy</h1>
          
          <section className="space-y-6">
            <h2 className="text-2xl font-black italic">1. Protocol Engagement</h2>
            <p className="text-muted-foreground leading-relaxed">
              By engaging with the Bek Fit movement protocol, you acknowledge that all physical activities carry inherent risk. Our AI-driven plans are designed for educational and fitness purposes and should not be considered medical advice.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black italic">2. Data Sovereignty</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your movement data, nutrition logs, and personal identifiers are encrypted and isolate via Row Level Security (RLS). We do not transmit your physical diagnostics to third parties without explicit authorization.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black italic">3. Subscription Intelligence</h2>
            <p className="text-muted-foreground leading-relaxed">
               Subscriptions are billed on a recurring 30-day cycle. Access to advanced AI plan generation is contingent upon active deposit verification. Refunds are processed within 7 operational days for non-verified protocols.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
