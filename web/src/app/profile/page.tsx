'use client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Mail, Calendar, Target, Bell, CreditCard } from 'lucide-react';
import Link from 'next/link';
import * as Switch from '@radix-ui/react-switch';

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-8">Profile & Settings</h1>

          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="flex-1 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="flex-1 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Age</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      defaultValue="30"
                      className="flex-1 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Current Goal</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] rounded-lg">
                    <Target className="w-5 h-5 text-gray-400" />
                    <select className="flex-1 bg-transparent focus:outline-none">
                      <option value="fitness">Improve Fitness</option>
                      <option value="pain-relief">Pain Relief</option>
                      <option value="weight-loss">Weight Management</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors">
                Save Changes
              </button>
            </div>

            {/* Notification Settings */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-[#6dccc4]" />
                Notification Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <p className="font-medium mb-1">Workout Reminders</p>
                    <p className="text-sm text-gray-400">Get notified when it's time for your workout</p>
                  </div>
                  <Switch.Root
                    defaultChecked
                    className="w-12 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-[#6dccc4] transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <p className="font-medium mb-1">Movement Breaks</p>
                    <p className="text-sm text-gray-400">Reminders for posture breaks and stretches</p>
                  </div>
                  <Switch.Root
                    defaultChecked
                    className="w-12 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-[#6dccc4] transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <p className="font-medium mb-1">Weekly Summaries</p>
                    <p className="text-sm text-gray-400">Receive your weekly progress report</p>
                  </div>
                  <Switch.Root
                    defaultChecked
                    className="w-12 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-[#6dccc4] transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <p className="font-medium mb-1">Motivational Messages</p>
                    <p className="text-sm text-gray-400">Get encouraging messages from our AI coach</p>
                  </div>
                  <Switch.Root
                    className="w-12 h-6 bg-white/10 rounded-full relative data-[state=checked]:bg-[#6dccc4] transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
                  </Switch.Root>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#6dccc4]" />
                Payment & Subscription
              </h2>
              
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Status</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Next Payment</span>
                  <span>April 27, 2026</span>
                </div>
              </div>

              <Link
                href="/payment"
                className="block text-center px-6 py-3 border border-[#6dccc4] text-[#6dccc4] rounded-lg hover:bg-[#6dccc4]/10 transition-colors"
              >
                Manage Payment
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
