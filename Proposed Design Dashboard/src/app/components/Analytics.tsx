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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics & Insights</h2>
        <p className="text-gray-600 mt-1">Track platform performance and user engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">1,284</p>
          <p className="text-sm text-green-600 mt-1">+12% this month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Active Plans</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">892</p>
          <p className="text-sm text-green-600 mt-1">+8% this month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">68%</p>
          <p className="text-sm text-green-600 mt-1">+5% this month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">Retention Rate</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">81%</p>
          <p className="text-sm text-green-600 mt-1">+2% this month</p>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">User Growth</h3>
        <div className="h-64">
          <div className="flex items-end justify-between h-full gap-2">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                    style={{ height: `${(data.users / max) * 100}%` }}
                  >
                    <div className="absolute -top-6 w-full text-center text-sm font-medium text-gray-900">
                      {data.users}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{data.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Goal Distribution</h3>
          <div className="space-y-4">
            {goalDistribution.map((goal, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{goal.goal}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {goal.count} ({goal.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Exercises */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Most Used Exercises</h3>
          <div className="space-y-3">
            {topExercises.map((exercise, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{exercise.name}</p>
                  <p className="text-sm text-gray-600">{exercise.usage} uses</p>
                </div>
                <span className="text-sm text-green-600 font-medium">{exercise.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {engagementMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{metric.metric}</p>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className="text-sm text-green-600 mt-1">{metric.change}</p>
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
