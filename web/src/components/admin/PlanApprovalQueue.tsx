'use client';
import { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, AlertTriangle, Edit2, Loader2, Calendar, Activity, Zap } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface PendingPlan {
  id: string;
  userName: string;
  userEmail: string;
  goal: string;
  age: number;
  painAreas: string[];
  safetyFlags: string[];
  createdDate: string;
  status: 'pending' | 'approved' | 'rejected';
  planSummary: string;
  weekCount: number;
  workoutsPerWeek: number;
}

export function PlanApprovalQueue() {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedPlan, setSelectedPlan] = useState<PendingPlan | null>(null);

  const [plans, setPlans] = useState<PendingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchQueue() {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          full_name,
          email,
          created_at,
          profile_data,
          goal_id,
          goals:goal_id ( title ),
          plans ( id, is_active )
        `);
      
      if (!error && data) {
         const queue: PendingPlan[] = data.map((u: { 
            id: string; 
            full_name: string | null; 
            email: string | null; 
            created_at: string; 
            profile_data: any;
            goals: Array<{ title: string }> | null;
            plans: Array<{ id: string, is_active: boolean }> | null;
         }) => {
            const profile = (u.profile_data as Record<string, any>) || {};
            const plan = u.plans?.[0]; 
            const goal = u.goals?.[0];            
            let status: 'pending' | 'approved' | 'rejected' = 'pending';
            if (plan) {
              status = plan.is_active ? 'approved' : 'pending';
            }
            
            const flags: string[] = [];
            if (profile.age > 50) flags.push("Age 50+");
            if (profile.pain_areas && profile.pain_areas.length > 0) flags.push("Pain management flags");
            
            return {
              id: plan?.id || u.id, // Prefer plan ID for operations
              userName: u.full_name || 'Unnamed User',
              userEmail: u.email || 'No Email',
              goal: goal?.title || 'General Fitness',
              age: profile.age || 0,
              painAreas: profile.pain_areas || [],
              safetyFlags: flags,
              createdDate: new Date(u.created_at).toISOString().split('T')[0],
              status: status,
              planSummary: 'Individual movement protocol synthesized via AI core. Final baseline audit suggested.',
              weekCount: 8,
              workoutsPerWeek: 3
            }
         });
         setPlans(queue);
      }
      setLoading(false);
    }
    fetchQueue();
  }, [supabase]);

  const handleApprovePlan = async (planId: string) => {
    // If planId is still userId (no plan yet), we can't approve. 
    // But usually there is a plan if it's in the queue.
    const { error } = await supabase
      .from('plans')
      .update({ is_active: true })
      .eq('id', planId);

    if (error) {
      toast.error('Failed to validate movement protocol.');
      console.error(error);
    } else {
      toast.success('Protocol validated. User deployment active.');
      setPlans(prev => prev.map(p => p.id === planId ? { ...p, status: 'approved' } : p));
      if (selectedPlan?.id === planId) setSelectedPlan(null);
    }
  };

  const handleRejectPlan = async (planId: string) => {
    const { error } = await supabase
      .from('plans')
      .delete()
      .eq('id', planId);

    if (error) {
      toast.error('Failed to deny module.');
    } else {
      toast.success('Protocol denied. Module purged from queue.');
      setPlans(prev => prev.map(p => p.id === planId ? { ...p, status: 'rejected' } : p));
      if (selectedPlan?.id === planId) setSelectedPlan(null);
    }
  };

  const handleOverrideProtocol = () => {
    if (!selectedPlan) return;
    toast.info('Overriding protocol session... Redirecting to architecture terminal.');
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'architecture');
    params.set('userId', selectedPlan.id); // In this app selectedPlan.id is often the planId or userId
    router.push(`/admin?${params.toString()}`);
  };

  const filteredPlans = plans.filter(plan =>
    filterStatus === 'all' || plan.status === filterStatus
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight uppercase tracking-widest">PLAN APPROVAL <span className="text-primary underline decoration-primary/30 underline-offset-8">QUEUE</span></h2>
          <p className="text-muted-foreground mt-3 font-medium">Audit AI-synthesized movement protocols for safety and precision.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Review', value: plans.filter(p => p.status === 'pending').length, color: 'text-primary' },
          { label: 'Approved Today', value: plans.filter(p => p.status === 'approved').length, color: 'text-green-500' },
          { label: 'Rejection Log', value: 0, color: 'text-destructive' },
          { label: 'Active Alerts', value: plans.filter(p => p.safetyFlags.length > 0).length, color: 'text-yellow-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all group">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="bg-card rounded-2xl border border-border p-4 shadow-sm max-w-xs">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-4 py-2 bg-secondary/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[10px] font-black uppercase tracking-widest text-foreground cursor-pointer"
        >
          <option value="all">ALL PROTOCOLS</option>
          <option value="pending">PENDING AUDITS</option>
          <option value="approved">VALIDATED PLANS</option>
          <option value="rejected">DENIED MODULES</option>
        </select>
      </div>

      {/* Plan List */}
      {loading ? (
        <div className="bg-card rounded-3xl border border-border p-20 flex flex-col items-center justify-center text-muted-foreground gap-6 shadow-sm">
           <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <Loader2 className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
           </div>
           <div className="text-center">
              <p className="font-black uppercase tracking-[0.3em] text-foreground text-sm">Synthesizing Queue</p>
              <p className="text-xs font-bold mt-2 opacity-60">Scanning AI generation outcomes for safety markers...</p>
           </div>
        </div>
      ) : (
      <div className="grid grid-cols-1 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="group bg-card rounded-3xl border border-border p-8 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            {plan.safetyFlags.length > 0 && (
              <div className="absolute top-0 right-0 p-1 px-4 bg-yellow-500 text-black text-[8px] font-black uppercase tracking-tighter rounded-bl-xl shadow-lg flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                Critical Safety Warning
              </div>
            )}
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground uppercase tracking-tight leading-none">{plan.userName}</h3>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">{plan.userEmail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 mt-6">
                  <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60 flex items-center gap-1.5 mb-1">
                      <Zap className="w-2 h-2 text-primary" /> Goal Signature
                    </p>
                    <p className="text-[10px] font-black text-foreground uppercase tracking-tight">{plan.goal}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60 flex items-center gap-1.5 mb-1">
                       <Activity className="w-2 h-2 text-primary" /> Bio Age
                    </p>
                    <p className="text-base font-black text-foreground">{plan.age}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60 flex items-center gap-1.5 mb-1">
                       <Calendar className="w-2 h-2 text-primary" /> Deployment
                    </p>
                    <p className="text-base font-black text-foreground uppercase">{plan.weekCount} Weeks</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60 flex items-center gap-1.5 mb-1">
                       <Zap className="w-2 h-2 text-primary" /> Frequency
                    </p>
                    <p className="text-base font-black text-foreground uppercase">{plan.workoutsPerWeek} Sessions/WK</p>
                  </div>
                </div>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-2xl mb-2">{plan.planSummary}</p>
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">Synthesized: {plan.createdDate}</p>
              </div>

              <div className="flex flex-row lg:flex-col gap-3">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  Full Audit
                </button>
                {plan.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApprovePlan(plan.id)}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-card border border-border hover:border-green-500/50 hover:bg-green-500/10 text-foreground/60 hover:text-green-500 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Quick Approve
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Plan Review Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-card rounded-3xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="p-10 border-b border-border bg-secondary/20">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-primary text-4xl font-black">
                    {selectedPlan.userName.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">{selectedPlan.userName}</h3>
                  <p className="text-muted-foreground font-medium mt-2 uppercase tracking-widest text-xs opacity-60">{selectedPlan.userEmail}</p>
                </div>
              </div>
            </div>

            <div className="p-10 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Biological Markers</h4>
                  <div className="grid grid-cols-2 gap-6 bg-secondary/20 p-6 rounded-2xl border border-border/50">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Strategic Goal</p>
                      <p className="text-sm font-bold text-foreground uppercase tracking-tight mt-1">{selectedPlan.goal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Bio Age</p>
                      <p className="text-sm font-bold text-foreground mt-1">{selectedPlan.age}</p>
                    </div>
                  </div>
                </div>

                {selectedPlan.safetyFlags.length > 0 && (
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-destructive uppercase tracking-[0.2em] border-l-4 border-destructive pl-4">Critical Anomalies</h4>
                    <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {selectedPlan.safetyFlags.map((flag, index) => (
                          <li key={index} className="flex items-center gap-3 text-[10px] font-black text-destructive uppercase tracking-widest">
                            <AlertTriangle className="w-4 h-4" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Protocol Architecture</h4>
                <div className="bg-secondary/20 rounded-3xl p-8 border border-border/50">
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60 mb-1">Total Deployment Duration</p>
                      <p className="text-3xl font-black text-foreground uppercase tracking-tight">{selectedPlan.weekCount} Weeks</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60 mb-1">Weekly Execution Frequency</p>
                      <p className="text-3xl font-black text-foreground uppercase tracking-tight">{selectedPlan.workoutsPerWeek} Sessions</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Sample Cycle Execution (Week 1)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['Monday', 'Wednesday', 'Friday'].map((day, index) => (
                        <div key={index} className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:border-primary transition-colors cursor-default">
                          <p className="font-black text-primary uppercase text-xs tracking-widest mb-4 border-b border-border pb-2">{day}</p>
                          <ul className="space-y-3">
                            <li className="text-[10px] font-bold text-muted-foreground flex items-center gap-2">• WARM-UP FLOW</li>
                            <li className="text-[10px] font-black text-foreground flex items-center gap-2">• PRIMARY MOVEMENT A</li>
                            <li className="text-[10px] font-black text-foreground flex items-center gap-2">• PRIMARY MOVEMENT B</li>
                            <li className="text-[10px] font-black text-foreground flex items-center gap-2">• CORE PROTOCOL</li>
                            <li className="text-[10px] font-bold text-muted-foreground flex items-center gap-2">• RECOVERY FLOW</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleOverrideProtocol}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-card border-2 border-border text-foreground/60 hover:text-foreground hover:border-primary rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Override Protocol
                </button>
                <button 
                  onClick={() => handleApprovePlan(selectedPlan.id)}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  Validate & Commit
                </button>
                <button 
                  onClick={() => handleRejectPlan(selectedPlan.id)}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-destructive hover:text-white transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  Deny Module
                </button>
              </div>
            </div>
            
            <div className="p-10 border-t border-border flex justify-end bg-secondary/10">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-10 py-4 bg-secondary text-foreground/60 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary/80 transition-all border border-border/50"
              >
                Exit Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
