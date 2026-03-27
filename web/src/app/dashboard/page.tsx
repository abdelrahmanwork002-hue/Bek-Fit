import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Play, TrendingUp, Utensils, Lightbulb, Calendar, Award, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  // Mock data - will be replaced with Supabase calls
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
  }

  const weekProgress = {
    completed: 3,
    total: 5,
    percentage: 60,
  }

  const nutritionToday = {
    calories: 1850,
    protein: 120,
    carbs: 180,
    fat: 65,
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome back! 👋</h1>
            <p className="text-lg text-muted-foreground">Let's keep building your strength and wellness today.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              
              {/* Today's Routine Card */}
              <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary" fill="currentColor" />
                       </div>
                       <h2 className="text-2xl font-bold tracking-tight">Today's Routine</h2>
                    </div>
                    <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold">
                      {todaysRoutine.totalDuration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {todaysRoutine.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 bg-muted/50 border border-border/50 rounded-2xl group hover:bg-muted transition-colors cursor-default"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          <div>
                            <p className="font-bold text-lg leading-none mb-1">{activity.name}</p>
                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">{activity.type}</p>
                          </div>
                        </div>
                        <span className="text-muted-foreground font-medium">{activity.duration}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/routine/${todaysRoutine.id}`}
                    className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                  >
                    Start Your Workout
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>

              {/* Progress Summary Section */}
              <section className="bg-card rounded-3xl border border-border p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                   </div>
                   <h2 className="text-2xl font-bold tracking-tight">Weekly Progress</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Completed Workouts</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                       <p className="text-5xl font-black text-foreground">
                         {weekProgress.completed}
                       </p>
                       <p className="text-xl text-muted-foreground font-medium">/{weekProgress.total}</p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Current Streak</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                       <p className="text-5xl font-black text-foreground">7</p>
                       <p className="text-xl text-muted-foreground font-medium">days</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-muted-foreground uppercase">Goal Progress</span>
                    <span className="text-primary font-black text-lg">{weekProgress.percentage}%</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden border border-border shadow-inner">
                    <div
                      className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all duration-1000 ease-in-out"
                      style={{ width: `${weekProgress.percentage}%` }}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar for Nutrition and Quick Actions */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
              
              {/* Nutrition Snapshot Card */}
              <section className="bg-card rounded-3xl border border-border p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Daily Nutrition</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-muted-foreground text-xs uppercase">Calories</span>
                      <span className="font-black">{nutritionToday.calories} kcal</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                       <div className="h-full bg-primary" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                     <div className="text-center p-3 bg-muted/20 rounded-xl border border-border/30">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Protein</p>
                        <p className="font-bold">{nutritionToday.protein}g</p>
                     </div>
                     <div className="text-center p-3 bg-muted/20 rounded-xl border border-border/30">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Carbs</p>
                        <p className="font-bold">{nutritionToday.carbs}g</p>
                     </div>
                     <div className="text-center p-3 bg-muted/20 rounded-xl border border-border/30">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Fat</p>
                        <p className="font-bold">{nutritionToday.fat}g</p>
                     </div>
                  </div>
                </div>

                <Link
                  href="/nutrition"
                  className="flex items-center justify-center mt-8 px-6 py-4 border-2 border-primary text-primary rounded-2xl font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Full Nutrition Plan
                </Link>
              </section>

              {/* Quick Actions List */}
              <section className="bg-card rounded-3xl border border-border p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6 tracking-tight">Quick Actions</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <Link
                    href="/tips"
                    className="flex items-center gap-4 p-4 bg-muted/30 border border-border/50 rounded-2xl hover:bg-accent transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lightbulb className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold">Movement Tips</span>
                  </Link>

                  <Link
                    href="/program"
                    className="flex items-center gap-4 p-4 bg-muted/30 border border-border/50 rounded-2xl hover:bg-accent transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold">Edit Program</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-4 p-4 bg-muted/30 border border-border/50 rounded-2xl hover:bg-accent transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold">Advanced Stats</span>
                  </Link>
                </div>
              </section>

              {/* Support Contact */}
              <div className="p-8 bg-primary rounded-[2.5rem] text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group">
                 <div className="relative z-10">
                    <h4 className="text-xl font-black mb-2">Need help?</h4>
                    <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">Our experts are available to adjust your plan manually.</p>
                    <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                       Talk to an Expert
                    </button>
                 </div>
                 <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
