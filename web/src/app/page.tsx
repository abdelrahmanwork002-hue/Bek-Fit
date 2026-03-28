'use client';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Brain, Utensils, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
                Fix Your Body.
                <br />
                <span className="text-[#6dccc4]">Build Real Strength.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                AI-powered fitness and wellness plans tailored to your goals. From pain relief to peak performance, we guide you every step of the way.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors text-lg"
              >
                Start Your Plan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1759572985980-c9af2f1ae4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwc3RyZW5ndGglMjB0cmFpbmluZyUyMHdvbWFufGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fitness Training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Three simple steps to transform your wellness journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-[#6dccc4]">1</span>
              </div>
              <h3 className="text-2xl mb-4">Complete Assessment</h3>
              <p className="text-gray-400">
                Answer personalized questions about your goals, pain points, and health history. Our AI analyzes your unique needs.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-[#6dccc4]">2</span>
              </div>
              <h3 className="text-2xl mb-4">Get Your Plan</h3>
              <p className="text-gray-400">
                Receive a customized workout and nutrition plan designed specifically for your body and goals.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20 flex items-center justify-center mb-6">
                <span className="text-2xl text-[#6dccc4]">3</span>
              </div>
              <h3 className="text-2xl mb-4">Track & Adapt</h3>
              <p className="text-gray-400">
                Log your progress, swap exercises, and watch your plan evolve as you get stronger and healthier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Built for Your Success</h2>
            <p className="text-xl text-gray-400">Everything you need to achieve your wellness goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* AI Plans */}
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-lg bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[#6dccc4]" />
              </div>
              <div>
                <h3 className="text-2xl mb-3">AI-Powered Plans</h3>
                <p className="text-gray-400">
                  Our intelligent system creates personalized workout routines based on your body's unique needs, goals, and limitations.
                </p>
              </div>
            </div>

            {/* Nutrition */}
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-lg bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                <Utensils className="w-6 h-6 text-[#6dccc4]" />
              </div>
              <div>
                <h3 className="text-2xl mb-3">Custom Nutrition</h3>
                <p className="text-gray-400">
                  Get meal plans tailored to your dietary preferences, restrictions, and wellness goals with detailed macro breakdowns.
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-lg bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#6dccc4]" />
              </div>
              <div>
                <h3 className="text-2xl mb-3">Progress Tracking</h3>
                <p className="text-gray-400">
                  Monitor your improvements with detailed analytics, set tracking, and visual progress charts that keep you motivated.
                </p>
              </div>
            </div>

            {/* Mobility Focus */}
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-lg bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-[#6dccc4]" />
              </div>
              <div>
                <h3 className="text-2xl mb-3">Mobility & Recovery</h3>
                <p className="text-gray-400">
                  Access guided stretches, mobility tests, and recovery protocols designed to keep you pain-free and moving well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Success Stories</h2>
            <p className="text-xl text-gray-400">Real results from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
              <p className="text-gray-300 mb-6">
                "After years of back pain, BekFit's personalized plan helped me move pain-free again. The AI really understands what my body needs."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20"></div>
                <div>
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-sm text-gray-400">Pain Relief</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
              <p className="text-gray-300 mb-6">
                "Lost 15kg in 4 months with the custom nutrition and workout plan. The flexibility to swap exercises kept me consistent."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20"></div>
                <div>
                  <p className="font-medium">Ahmed K.</p>
                  <p className="text-sm text-gray-400">Weight Loss</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
              <p className="text-gray-300 mb-6">
                "The mobility tests showed me exactly what I needed to work on. I feel stronger and more flexible than ever before."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20"></div>
                <div>
                  <p className="font-medium">Maya R.</p>
                  <p className="text-sm text-gray-400">Fitness Improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Ready to Transform Your Wellness?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands who have already started their journey to a healthier, stronger life.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors text-lg"
          >
            Start Your Plan
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}