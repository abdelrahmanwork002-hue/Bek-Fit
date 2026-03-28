import { useState } from 'react';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { UserManagement } from './components/UserManagement';
import { PlanApprovalQueue } from './components/PlanApprovalQueue';
import { PlanTemplates } from './components/PlanTemplates';
import { Analytics } from './components/Analytics';
import {
  LayoutDashboard,
  Dumbbell,
  Users,
  FileCheck,
  FileText,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

type View = 'dashboard' | 'exercises' | 'users' | 'approvals' | 'templates' | 'analytics';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exercises' as View, label: 'Exercise Library', icon: Dumbbell },
    { id: 'users' as View, label: 'User Management', icon: Users },
    { id: 'approvals' as View, label: 'Plan Approvals', icon: FileCheck },
    { id: 'templates' as View, label: 'Plan Templates', icon: FileText },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="size-full flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex-shrink-0`}
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Fitness Platform</p>
        </div>

        <nav className="px-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@fitness.com</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'exercises' && <ExerciseLibrary />}
          {currentView === 'users' && <UserManagement />}
          {currentView === 'approvals' && <PlanApprovalQueue />}
          {currentView === 'templates' && <PlanTemplates />}
          {currentView === 'analytics' && <Analytics />}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { label: 'Total Users', value: '1,284', change: '+12%', trend: 'up' },
    { label: 'Active Plans', value: '892', change: '+8%', trend: 'up' },
    { label: 'Pending Approvals', value: '23', change: '-5%', trend: 'down' },
    { label: 'Total Exercises', value: '456', change: '+15', trend: 'up' },
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'Sarah Johnson', time: '5 min ago' },
    { action: 'Plan approved', user: 'Mike Chen', time: '12 min ago' },
    { action: 'Exercise updated', user: 'Admin', time: '1 hour ago' },
    { action: 'Payment verified', user: 'Emma Wilson', time: '2 hours ago' },
    { action: 'Template created', user: 'Admin', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors text-left">
          <Dumbbell className="w-8 h-8 mb-2" />
          <p className="font-semibold">Add New Exercise</p>
          <p className="text-sm text-blue-100 mt-1">Create a new exercise in the library</p>
        </button>

        <button className="bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition-colors text-left">
          <FileCheck className="w-8 h-8 mb-2" />
          <p className="font-semibold">Review Plans</p>
          <p className="text-sm text-green-100 mt-1">23 plans awaiting approval</p>
        </button>

        <button className="bg-purple-600 text-white rounded-lg p-6 hover:bg-purple-700 transition-colors text-left">
          <FileText className="w-8 h-8 mb-2" />
          <p className="font-semibold">Create Template</p>
          <p className="text-sm text-purple-100 mt-1">Build a new plan template</p>
        </button>
      </div>
    </div>
  );
}