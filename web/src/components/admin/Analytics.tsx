
'use client';
import { TrendingUp, Users, Activity, Target } from 'lucide-react';

export function Analytics() {
  const userGrowthData = [
    { month: 'Oct', users: 850 },
    { month: 'Nov', users: 950 },
    { month: 'Dec', users: 1100 },
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1250 },
    { month: 'Mar', users: 1284 },
  ];

  const goalDistribution = [
    { goal: 'Weight Loss', count: 420, percentage: 33 },
    { goal: 'Muscle Gain', count: 320, percentage: 25 },
    { goal: 'Strength Training', count: 256, percentage: 20 },
    { goal: 'Pain Management', count: 192, percentage: 15 },
    { goal: 'General Fitness', count: 96, percentage: 7 },
  ];

  const topExercises = [
    { name: 'Push-ups', usage: 856, trend: '+12%' },
    { name: 'Bodyweight Squat', usage: 742, trend: '+8%' },
    { name: 'Plank Hold', usage: 698, trend: '+15%' },
    { name: 'Lunges', usage: 654, trend: '+5%' },
    { name: 'Dumbbell Press', usage: 612, trend: '+18%' },
  ];

  const engagementMetrics = [
    { metric: 'Avg. Workouts/Week', value: '3.2', change: '+0.4' },
    { metric: 'Plan Completion Rate', value: '68%', change: '+5%' },
    { metric: 'Avg. Session Duration', value: '42 min', change: '+3 min' },
    { metric: 'User Retention (30d)', value: '81%', change: '+2%' },
  ];

  const max = Math.max(...userGrowthData.map(d => d.users));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight uppercase tracking-widest">PERFORMANCE <span className="text-primary underline decoration-primary/30 underline-offset-8">ANALYTICS</span></h2>
          <p className="text-muted-foreground mt-3 font-medium">Quantify platform efficiency and human performance trajectories.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Active Personnel', value: '1,284', color: 'text-primary', bg: 'bg-primary/10', trend: '+12%' },
          { icon: Activity, label: 'Operational Plans', value: '892', color: 'text-green-500', bg: 'bg-green-500/10', trend: '+8%' },
          { icon: Target, label: 'Precision Rate', value: '68%', color: 'text-purple-500', bg: 'bg-purple-500/10', trend: '+5%' },
          { icon: TrendingUp, label: 'Retention Coefficient', value: '81%', color: 'text-orange-500', bg: 'bg-orange-500/10', trend: '+2%' },
        ].map((metric, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 ${metric.bg} rounded-xl transition-transform group-hover:scale-110 shadow-inner`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</p>
            </div>
            <p className="text-3xl font-black text-foreground tracking-tight">{metric.value}</p>
            <p className="text-[10px] font-black text-green-500 mt-2 uppercase tracking-widest">{metric.trend} Efficiency Growth</p>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-card rounded-3xl border border-border p-10 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Personnel Growth Trajectory</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[8px] font-black uppercase rounded-lg border border-primary/20">Active Sessions</div>
          </div>
        </div>
        <div className="h-72">
          <div className="flex items-end justify-between h-full gap-6 px-4">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-6 h-full group">
                <div className="w-full relative h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-gradient-to-t from-primary/80 to-primary group-hover:from-primary group-hover:to-primary/60 transition-all rounded-t-xl group-hover:-translate-y-1 relative"
                    style={{ height: `${(data.users / max) * 100}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                      {data.users}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{data.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goal Distribution */}
        <div className="bg-card rounded-3xl border border-border p-10 shadow-sm">
          <h3 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4 mb-8">Anatomical Goal Distribution</h3>
          <div className="space-y-6">
            {goalDistribution.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 px-1">
                  <span className="text-foreground">{goal.goal}</span>
                  <span className="text-muted-foreground opacity-60">{goal.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border/30">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    style={{ width: `${goal.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Exercises */}
        <div className="bg-card rounded-3xl border border-border p-10 shadow-sm">
          <h3 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4 mb-8">Movement Protocol Engagement</h3>
          <div className="space-y-4">
            {topExercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl border border-border/50 group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary text-[10px] font-black group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-foreground uppercase tracking-tight">{exercise.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground opacity-60 mt-0.5 tracking-widest">{exercise.usage} EXECUTIONS</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2.5 py-1.5 rounded-lg border border-green-500/20">{exercise.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-card rounded-3xl border border-border p-10 shadow-sm">
        <h3 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4 mb-8">Operational Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="space-y-3 p-6 bg-secondary/30 rounded-2xl border border-border/50">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{metric.metric}</p>
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-black text-foreground">{metric.value}</p>
                <p className="text-[10px] font-black text-green-500">{metric.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Today's Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">New Sign-ups</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">12</p>
            <p className="text-sm text-gray-500 mt-1">vs. 8 yesterday</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Workouts Completed</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">342</p>
            <p className="text-sm text-gray-500 mt-1">vs. 318 yesterday</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Plans Created</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">8</p>
            <p className="text-sm text-gray-500 mt-1">vs. 6 yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
}
