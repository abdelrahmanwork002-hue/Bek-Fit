import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Brain, Utensils, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-foreground">
                Fix Your Body.
                <br />
                <span className="text-primary">Build Real Strength.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                AI-powered fitness and wellness plans tailored to your goals. From pain relief to peak performance, we guide you every step of the way with data-driven precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:opacity-95 transition-all shadow-lg shadow-primary/20 active:scale-95 duration-200"
                >
                  Start Your Plan
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                   href="#how-it-works"
                   className="inline-flex items-center justify-center gap-2 px-8 py-5 border border-border rounded-2xl font-semibold text-lg hover:bg-accent transition-all duration-200"
                >
                   How It Works
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Image
                src="https://images.unsplash.com/photo-1759572985980-c9af2f1ae4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwc3RyZW5ndGglMjB0cmFpbmluZyUyMHdvbWFufGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fitness Training"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-accent/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to transform your vision into reality with AI precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-card p-10 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-primary italic">01</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Complete Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Answer personalized questions about your goals, pain points, and health history. Our AI analyzes your unique needs to find the perfect starting point.
              </p>
            </div>

            <div className="group bg-card p-10 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl relative md:translate-y-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-primary italic">02</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Your AI Plan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive a customized workout and nutrition protocol designed specifically for your body and goals, evolving in real-time as you progress.
              </p>
            </div>

            <div className="group bg-card p-10 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-primary italic">03</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Track & Adapt</h3>
              <p className="text-muted-foreground leading-relaxed">
                Log your progress, swap exercises, and watch your plan adapt as you get stronger and healthier. We grow with you, ensuring peak performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">Features</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built for Your Success</h3>
            <p className="text-xl text-muted-foreground">Everything you need to achieve your wellness goals, all in one intelligent platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {/* AI Plans */}
            <div className="flex gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Training</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Our system creates personalized workout routines based on your body&apos;s unique needs, goals, and limitations. It&apos;s like having a world-class coach 24/7.
                </p>
              </div>
            </div>

            {/* Nutrition */}
            <div className="flex gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Macro-Balanced Nutrition</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Get meal plans tailored to your dietary preferences, restrictions, and wellness goals with detailed macro breakdowns and shopping lists.
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="flex gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Advanced Analytics</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Monitor your improvements with detailed analytics, volume tracking, and visual graphs that translate your hard work into clear data.
                </p>
              </div>
            </div>

            {/* Mobility Focus */}
            <div className="flex gap-8 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Mobility & Recovery</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                   Access guided stretches, mobility self-tests, and recovery protocols designed to keep you pain-free and moving at full capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Success Stories</h2>
            <p className="text-xl text-muted-foreground">Real results from real people who prioritized their health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
              <p className="text-foreground text-lg mb-8 leading-relaxed">
                &quot;After years of back pain, BekFit&apos;s personalized plan helped me move pain-free again. The AI actually adapts to how I feel each session.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10"></div>
                <div>
                  <p className="font-bold">Sarah M.</p>
                  <p className="text-sm text-muted-foreground">Pain Relief Program</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
              <p className="text-foreground text-lg mb-8 leading-relaxed">
                &quot;Lost 15kg in 4 months with the custom nutrition and workout plan. The variety in the routines kept me consistent for the first time.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10"></div>
                <div>
                  <p className="font-bold">Ahmed K.</p>
                  <p className="text-sm text-muted-foreground">Weight Management</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
              <p className="text-foreground text-lg mb-8 leading-relaxed">
                &quot;The mobility tests were an eye-opener. I&apos;ve improved my squat depth and shoulder mobility significantly in just 6 weeks.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10"></div>
                <div>
                  <p className="font-bold">Maya R.</p>
                  <p className="text-sm text-muted-foreground">Functional Strength</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ready to Transform?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands who have already started their journey to a healthier, stronger life with BekFit AI.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:opacity-95 transition-all shadow-xl shadow-primary/20 active:scale-95 duration-200"
          >
            Start Your Journey
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
