'use client';
import { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Loader2, Users, FileCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface User {
  id: string;
  name: string;
  email: string;
  goal: string;
  onboardingComplete: boolean;
  planStatus: 'active' | 'inactive';
  paymentStatus: 'active' | 'pending' | 'expired';
  lastActivity: string;
  joinDate: string;
  age?: number;
  painAreas?: string[];
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [filterPlanStatus, setFilterPlanStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          full_name,
          email,
          created_at,
          profile_data,
          is_active,
          goals ( title ),
          payments ( status, processed_at ),
          plans ( is_active )
        `);

      if (error) {
        console.error("Supabase Error fetching users:", error);
      } else if (data) {
        const liveUsers: User[] = data.map((u: any) => {
          let paymentStatus: 'active' | 'pending' | 'expired' = 'pending';
          if (u.payments && u.payments.length > 0) {
            paymentStatus = (u.payments[0].status as any) || 'pending';
          }
          
          let planStatus: 'active' | 'inactive' = 'inactive';
          if (u.plans && u.plans.length > 0) {
            planStatus = u.plans[0].is_active ? 'active' : 'inactive';
          }

          const profileData = u.profile_data || {};

          return {
            id: u.id,
            name: u.full_name || 'Unnamed',
            email: u.email || 'No Email',
            goal: u.goals?.title || 'None',
            onboardingComplete: !!profileData.age, // Fallback if explicit flag is missing
            planStatus,
            paymentStatus,
            lastActivity: 'Recently active',
            joinDate: new Date(u.created_at).toISOString().split('T')[0],
            age: profileData.age || undefined,
            painAreas: profileData.pain_areas || [],
          };
        });
        setUsers(liveUsers);
      }
      setLoading(false);
    }

    fetchUsers();
  }, [supabase]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = filterPaymentStatus === 'all' || user.paymentStatus === filterPaymentStatus;
    const matchesPlan = filterPlanStatus === 'all' || user.planStatus === filterPlanStatus;
    return matchesSearch && matchesPayment && matchesPlan;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">USER <span className="text-primary underline decoration-primary/30 underline-offset-8">MANAGEMENT</span></h2>
          <p className="text-muted-foreground mt-3 font-medium">Verify human performance data and secure platform access.</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-2xl border border-border/50">
          <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">Active Database</div>
          <div className="px-4 py-2 text-foreground/60 text-xs font-black uppercase tracking-widest">Archive Logs</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by identity or digital signature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
            />
          </div>

          <select
            value={filterPaymentStatus}
            onChange={(e) => setFilterPaymentStatus(e.target.value)}
            className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer"
          >
            <option value="all">ALL PAYMENT PROTOCOLS</option>
            <option value="active">CREDIT VALIDATED</option>
            <option value="pending">PENDING VERIFICATION</option>
            <option value="expired">EXPIRED ACCESS</option>
          </select>

          <select
            value={filterPlanStatus}
            onChange={(e) => setFilterPlanStatus(e.target.value)}
            className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer"
          >
            <option value="all">ALL PLAN STATUS</option>
            <option value="active">EXECUTION ACTIVE</option>
            <option value="inactive">SYSTEM DORMANT</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Registered Identities', value: users.length, icon: Users, color: 'text-primary' },
          { label: 'Active Deployments', value: users.filter(u => u.planStatus === 'active').length, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Pending Credits', value: users.filter(u => u.paymentStatus === 'pending').length, icon: Clock, color: 'text-yellow-500' },
          { label: 'Verified Onboard', value: users.filter(u => u.onboardingComplete).length, icon: CheckCircle, color: 'text-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 bg-secondary rounded-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </div>
            <p className="text-3xl font-black text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* User List Loading State or Table */}
      {loading ? (
        <div className="bg-card rounded-3xl border border-border p-20 flex flex-col items-center justify-center text-muted-foreground gap-6 shadow-sm">
           <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <Loader2 className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
           </div>
           <div className="text-center">
              <p className="font-black uppercase tracking-[0.3em] text-foreground text-sm">Synchronizing Database</p>
              <p className="text-xs font-bold mt-2 opacity-60">Establishing high-bandwidth link to Supabase...</p>
           </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/30 border-b border-border">
                    {[
                      'Identity Signature', 'Strategic Goal', 'Onboarding', 'Deployment', 'Credit', 'Last Interaction', 'Operations'
                    ].map((head) => (
                      <th key={head} className="px-8 py-5 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-secondary/40 transition-all group cursor-default">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-black group-hover:scale-110 transition-transform shadow-inner">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-foreground uppercase tracking-tight">{user.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground opacity-60 mt-0.5 uppercase tracking-widest">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-foreground uppercase tracking-widest bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/30">
                          {user.goal}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {user.onboardingComplete ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-destructive">
                            <XCircle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Incomplete</span>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border flex items-center w-fit gap-2 ${
                            user.planStatus === 'active'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${user.planStatus === 'active' ? 'bg-green-500 pulse-green' : 'bg-destructive'}`} />
                          {user.planStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border ${
                            user.paymentStatus === 'active'
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : user.paymentStatus === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }`}
                        >
                          {user.paymentStatus}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{user.lastActivity}</p>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 border border-primary/20 rounded-xl transition-all active:scale-95"
                        >
                          <Eye className="w-3 h-3" />
                          View Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination UI */}
          <div className="flex items-center justify-between px-2 pt-2">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
              Showing 1-20 of {users.length} active records
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-[10px] font-black text-muted-foreground opacity-30 cursor-not-allowed uppercase tracking-widest">Prev</button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-[10px] font-black">1</button>
                <button className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 text-[10px] font-black transition-colors">2</button>
                <button className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 text-[10px] font-black transition-colors">3</button>
              </div>
              <button className="px-4 py-2 text-[10px] font-black text-primary hover:bg-primary/10 rounded-xl uppercase tracking-widest transition-all">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-card rounded-3xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="p-10 border-b border-border bg-secondary/20">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-primary text-4xl font-black">
                    {selectedUser.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">{selectedUser.name}</h3>
                  <p className="text-muted-foreground font-medium mt-2 uppercase tracking-widest text-xs opacity-60">{selectedUser.email}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/20">Identity Validated</span>
                    <span className="px-3 py-1 bg-secondary text-foreground/60 rounded-lg text-[10px] font-black uppercase tracking-widest border border-border/50">Level 4 Clearance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 space-y-10">
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Biological Data</h4>
                  <div className="grid grid-cols-2 gap-6 bg-secondary/20 p-6 rounded-2xl border border-border/50">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Primary Goal</p>
                      <p className="text-sm font-bold text-foreground uppercase tracking-tight mt-1">{selectedUser.goal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Age Matrix</p>
                      <p className="text-sm font-bold text-foreground mt-1">{selectedUser.age || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Enrolled On</p>
                      <p className="text-sm font-bold text-foreground mt-1">{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Last Pulse</p>
                      <p className="text-sm font-bold text-foreground mt-1">{selectedUser.lastActivity}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-destructive pl-4">Medical Vulnerabilities</h4>
                  <div className="bg-secondary/20 p-6 rounded-2xl border border-border/50 h-full min-h-[140px]">
                    {selectedUser.painAreas && selectedUser.painAreas.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.painAreas.map((area, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl text-[10px] font-black uppercase tracking-widest"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs font-bold text-muted-foreground/60 italic">No structural vulnerabilities reported.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Financial Protocols</h4>
                <div className="bg-secondary/30 rounded-3xl p-8 border border-border/50 shadow-inner">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shadow-sm">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Operational Status</p>
                        <p className="text-xl font-black text-foreground uppercase tracking-tight mt-1">
                          {selectedUser.paymentStatus}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-6 py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-[0.15em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        Validate Payment
                      </button>
                      <button className="flex-1 sm:flex-none px-6 py-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-destructive hover:text-white transition-all">
                        Suspend Access
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Status */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-foreground uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Performance Modules</h4>
                <div className="bg-card rounded-3xl border border-border p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Current Protocol</p>
                      <p className="text-2xl font-black text-foreground uppercase tracking-tight mt-1">
                        {selectedUser.planStatus}
                      </p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/5">
                    OVERRIDE PROGRAM
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-10 border-t border-border flex justify-end bg-secondary/10">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-8 py-4 bg-secondary text-foreground/60 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-secondary/80 transition-all border border-border/50"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
