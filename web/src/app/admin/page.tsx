'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ExerciseLibrary } from '@/components/admin/ExerciseLibrary';
import { UserManagement } from '@/components/admin/UserManagement';
import { PlanApprovalQueue } from '@/components/admin/PlanApprovalQueue';
import { Analytics } from '@/components/admin/Analytics';
import { AIAgentManagement } from '@/components/admin/AIAgentManagement';
import { ArchitectureTerminal } from '@/components/admin/ArchitectureTerminal';
import {
  LayoutDashboard,
  Dumbbell,
  Users,
  FileCheck,
  BarChart3,
  Bot,
  Menu,
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';

type View = 'dashboard' | 'exercises' | 'users' | 'approvals' | 'analytics' | 'ai_agents' | 'architecture';

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const supabase = createClient();
  
  const currentTabRaw = searchParams.get('tab');
  const currentTab = (currentTabRaw as View) || 'dashboard';

  // Guard against invalid tabs to prevent ghost pages
  useEffect(() => {
    const validTabs: View[] = ['dashboard', 'exercises', 'users', 'approvals', 'analytics', 'ai_agents', 'architecture'];
    if (currentTabRaw && !validTabs.includes(currentTabRaw as View)) {
      setTab('dashboard');
    }
  }, [currentTabRaw, searchParams]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setTab = (tab: View) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const navigationItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exercises' as View, label: 'Exercise Library', icon: Dumbbell },
    { id: 'users' as View, label: 'User Management', icon: Users },
    { id: 'approvals' as View, label: 'Plan Approvals', icon: FileCheck },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
    { id: 'ai_agents' as View, label: 'AI Agents', icon: Bot },
  ];

  if (!mounted) return null;

  return (
    <div className="size-full flex bg-background text-foreground transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } bg-card border-r border-border transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-foreground">BEK <span className="text-primary">FIT</span></h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Admin Terminal</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                  {item.label}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-card/50 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-secondary rounded-xl transition-all border border-border/50 shadow-sm"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-lg font-black uppercase tracking-widest text-foreground hidden md:block">
              {navigationItems.find(i => i.id === currentTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-foreground">Admin Terminal</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">System Operations</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary/60 p-[1px]">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center text-primary font-black shadow-inner">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {currentTab === 'dashboard' && <DashboardOverview />}
            {currentTab === 'exercises' && <ExerciseLibrary />}
            {currentTab === 'users' && <UserManagement />}
            {currentTab === 'approvals' && <PlanApprovalQueue />}
            {currentTab === 'analytics' && <Analytics />}
            {currentTab === 'ai_agents' && <AIAgentManagement />}
            {currentTab === 'architecture' && <ArchitectureTerminal />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Initializing Terminal...</p>
        </div>
      </div>
    }>
      <AdminContent />
    </Suspense>
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
    { action: 'System audit performed', user: 'Admin', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h2 className="text-3xl font-black text-foreground tracking-tight">DASHBOARD <span className="text-primary underline decoration-primary/30 underline-offset-8">OVERVIEW</span></h2>
        <p className="text-muted-foreground mt-3 font-medium text-lg">Welcome to the control center. Monitor every metric in real-time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</p>
            <div className="flex items-end justify-between mt-4">
              <p className="text-4xl font-black text-foreground">{stat.value}</p>
              <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                stat.trend === 'up' 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="w-full bg-secondary h-1.5 rounded-full mt-6 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: '65%' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-8 border-b border-border flex items-center justify-between bg-secondary/30">
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Live Operations Feed
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All Sessions</button>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-secondary/50 transition-all group cursor-default">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{activity.action}</p>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-muted-foreground tracking-tighter uppercase">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-foreground px-2">Commander Actions</h3>
          
          <button className="w-full group relative bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl shadow-primary/20 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] text-left">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
              <Dumbbell className="w-24 h-24" />
            </div>
            <Dumbbell className="w-8 h-8 mb-4 relative z-10" />
            <p className="text-lg font-black relative z-10 leading-tight">APPEND NEW<br/>EXERCISE</p>
            <p className="text-xs font-bold text-primary-foreground/70 mt-2 relative z-10">Expand the core training library</p>
          </button>

          <button className="w-full group relative bg-card text-foreground rounded-2xl p-6 border border-border shadow-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] text-left">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-700">
              <FileCheck className="w-24 h-24 text-primary" />
            </div>
            <FileCheck className="w-8 h-8 mb-4 text-primary relative z-10" />
            <p className="text-lg font-black relative z-10 leading-tight text-foreground">AUDIT PENDING<br/>PROTOCOLS</p>
            <p className="text-xs font-bold text-muted-foreground mt-2 relative z-10">Verify AI-generated workout flows</p>
          </button>
        </div>
      </div>
    </div>
  );
}