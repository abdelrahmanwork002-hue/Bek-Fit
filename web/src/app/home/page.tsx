'use client';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Play, TrendingUp, Utensils, Lightbulb, Calendar, Award } from 'lucide-react';

export default function Home() {
  // Mock data - in real app, this would come from backend
  const todaysRoutine = {
    id: 'routine-1',
    activities: [
      { name: 'Warm-up', duration: '5 min', type: 'mobility' },
      { name: 'Squats', duration: '15 min', type: 'strength' },
      { name: 'Push-ups', duration: '10 min', type: 'strength' },
      { name: 'Cool-down Stretch', duration: '5 min', type: 'mobility' },
    ],
    totalDuration: '35 min',
    completed: false,
  };

  const weekProgress = {
    completed: 3,
    total: 5,
    percentage: 60,
  };

  const nutritionToday = {
    calories: 1850,
    protein: 120,
    carbs: 180,
    fat: 65,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl mb-2">Welcome back! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">Let's keep building your strength and wellness.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Routine Card */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Today's Routine</h2>
                  <span className="px-3 py-1 bg-[#6dccc4]/20 text-[#6dccc4] rounded-full text-sm">
                    {todaysRoutine.totalDuration}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {todaysRoutine.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-transparent"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#6dccc4]" />
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{activity.type}</p>
                        </div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">{activity.duration}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/routine/${todaysRoutine.id}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
                >
                  <Play className="w-5 h-5" fill="#1a1a1a" />
                  Start Routine
                </Link>
              </div>

              {/* Progress Summary */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <h2 className="text-2xl mb-6">This Week's Progress</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-[#6dccc4]" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Workouts</span>
                    </div>
                    <p className="text-3xl">
                      {weekProgress.completed}/{weekProgress.total}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-[#6dccc4]" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
                    </div>
                    <p className="text-3xl">7 days</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Weekly Goal</span>
                    <span className="text-[#6dccc4]">{weekProgress.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6dccc4]"
                      style={{ width: `${weekProgress.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Nutrition Snapshot */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="w-5 h-5 text-[#6dccc4]" />
                  <h3 className="text-xl">Today's Nutrition</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Calories</span>
                      <span>{nutritionToday.calories} kcal</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Protein</span>
                      <span>{nutritionToday.protein}g</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Carbs</span>
                      <span>{nutritionToday.carbs}g</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Fat</span>
                      <span>{nutritionToday.fat}g</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/nutrition"
                  className="block mt-4 text-center px-4 py-2 border border-[#6dccc4] text-[#6dccc4] rounded-lg hover:bg-[#6dccc4]/10 transition-colors"
                >
                  View Full Plan
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                <h3 className="text-xl mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Link
                    href="/tips"
                    className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a]/70 transition-colors border border-gray-200 dark:border-transparent"
                  >
                    <Lightbulb className="w-5 h-5 text-[#6dccc4]" />
                    <span>Movement Tips</span>
                  </Link>

                  <Link
                    href="/program"
                    className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a]/70 transition-colors border border-gray-200 dark:border-transparent"
                  >
                    <Calendar className="w-5 h-5 text-[#6dccc4]" />
                    <span>Edit Program</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a]/70 transition-colors border border-gray-200 dark:border-transparent"
                  >
                    <TrendingUp className="w-5 h-5 text-[#6dccc4]" />
                    <span>View Progress</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
