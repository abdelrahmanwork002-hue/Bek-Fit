'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, Edit2, 
  Trash2, Power, Bot, Shield, Cpu, 
  CheckCircle, XCircle, Clock, AlertCircle,
  Loader2, Settings, ListFilter, Trash, Database, Cog, 
  ExternalLink, Key, ToggleLeft, ToggleRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface AIAgent {
  id: string;
  name: string;
  description: string;
  purpose: string;
  provider_id: string;
  provider_name?: string;
  system_prompt: string;
  temperature: number;
  max_tokens: number;
  status: 'Draft' | 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
  roles?: string[];
}

interface AIProvider {
  id: string;
  name: string;
  is_active: boolean;
  created_at?: string;
}

interface AIRole {
  id: string;
  name: string;
  description: string;
  behavior_profile?: any;
}

export function AIAgentManagement() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [roles, setRoles] = useState<AIRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProvider, setFilterProvider] = useState('all');
  
  const [view, setView] = useState<'agents' | 'providers' | 'roles'>('agents');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);
  const [editingProvider, setEditingProvider] = useState<AIProvider | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [agentsRes, providersRes, rolesRes] = await Promise.all([
        supabase.from('ai_agents').select(`
          *,
          provider:ai_providers(name),
          roles:ai_agent_roles(role:ai_roles(name))
        `).order('updated_at', { ascending: false }),
        supabase.from('ai_providers').select('*').eq('is_active', true),
        supabase.from('ai_roles').select('*')
      ]);

      if (agentsRes.data) {
        const formattedAgents: AIAgent[] = agentsRes.data.map((a: any) => ({
          ...a,
          provider_name: a.provider?.name,
          roles: a.roles?.map((r: any) => r.role?.name) || []
        }));
        setAgents(formattedAgents);
      }
      if (providersRes.data) setProviders(providersRes.data);
      if (rolesRes.data) setRoles(rolesRes.data);
    } catch (error) {
      console.error('Error fetching AI data:', error);
      toast.error('Failed to establish terminal link with AI registry.');
    } finally {
      setLoading(false);
    }
  }

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesProvider = filterProvider === 'all' || agent.provider_id === filterProvider;
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const handleToggleStatus = async (agent: AIAgent) => {
    const newStatus = agent.status === 'Active' ? 'Inactive' : 'Active';
    const { error } = await supabase
      .from('ai_agents')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', agent.id);

    if (error) {
       toast.error(`Protocol failure: Could not ${newStatus === 'Active' ? 'activate' : 'deactivate'} agent.`);
    } else {
       toast.success(`Agent ${agent.name} ${newStatus === 'Active' ? 'is now live' : 'has been mothballed'}.`);
       setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, status: newStatus } : a));
    }
  };

  const handleDeleteAgent = async (agent: AIAgent) => {
    if (agent.status === 'Active') {
      toast.error("Security Override Required: Cannot purge an active agent. Deactivate first.");
      return;
    }

    if (!confirm(`Are you sure you want to PERMANENTLY PURGE '${agent.name}' from the registry? This cannot be undone.`)) return;

    const { error } = await supabase.from('ai_agents').delete().eq('id', agent.id);

    if (error) {
      toast.error("Purge failure: Database rejected the deletion request.");
    } else {
      toast.success(`Agent '${agent.name}' has been scrubbed from the registry.`);
      setAgents(prev => prev.filter(a => a.id !== agent.id));
    }
  };

  const handleToggleProvider = async (provider: AIProvider) => {
    const { error } = await supabase
      .from('ai_providers')
      .update({ is_active: !provider.is_active })
      .eq('id', provider.id);

    if (error) {
      toast.error("Registry Failure: Failed to update provider state.");
    } else {
      toast.success(`${provider.name} is now ${!provider.is_active ? 'ENABLED' : 'DISABLED'}.`);
      setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, is_active: !p.is_active } : p));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">AI AGENT <span className="text-primary underline decoration-primary/30 underline-offset-8">ARCHIVE</span></h2>
          <p className="text-muted-foreground mt-3 font-medium">Configure and oversee autonomous intelligence modules for plan generation and safety audits.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-secondary/50 p-1.5 rounded-2xl border border-border/50 flex gap-1">
            <button
               onClick={() => setView('agents')}
               className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'agents' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
            >
               Agents
            </button>
            <button
               onClick={() => setView('providers')}
               className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'providers' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
            >
               Providers
            </button>
            <button
               onClick={() => setView('roles')}
               className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'roles' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
            >
               Roles
            </button>
          </div>
          <button
            onClick={() => {
              if (view === 'agents') { setEditingAgent(null); setIsModalOpen(true); }
              else if (view === 'providers') { setEditingProvider(null); setIsProviderModalOpen(true); }
            }}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            Initialize {view === 'agents' ? 'Agent' : view === 'providers' ? 'Provider' : 'Role'}
          </button>
        </div>
      </div>

      {view === 'agents' ? (
        <>
          {/* Control Panel */}
          <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search by agent signature or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer"
              >
                <option value="all">ALL DEPLOYMENT STATUS</option>
                <option value="Active">LIVE PROTOCOLS</option>
                <option value="Draft">DRAFT MODULES</option>
                <option value="Inactive">MOTHBALLED</option>
              </select>

              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer"
              >
                <option value="all">ALL AI PROVIDERS</option>
                {providers.map(p => <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Registered Modules', value: agents.length, icon: Bot, color: 'text-primary' },
              { label: 'Live Operations', value: agents.filter(a => a.status === 'Active').length, icon: Cpu, color: 'text-green-500' },
              { label: 'Draft Schemes', value: agents.filter(a => a.status === 'Draft').length, icon: Clock, color: 'text-yellow-500' },
              { label: 'Assigned Roles', value: roles.length, icon: Shield, color: 'text-blue-500' },
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

          {loading ? (
            <div className="bg-card rounded-3xl border border-border p-20 flex flex-col items-center justify-center text-muted-foreground gap-6 shadow-sm">
               <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <Loader2 className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
               </div>
               <p className="font-black uppercase tracking-[0.3em] text-sm">Syncing AI Grid...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <div key={agent.id} className="group bg-card rounded-3xl border border-border p-8 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-inner">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-foreground uppercase tracking-tight leading-none">{agent.name}</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">{agent.provider_name}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${
                      agent.status === 'Active' 
                        ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                        : agent.status === 'Draft'
                        ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                    }`}>
                      {agent.status}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 h-20 overflow-hidden">
                    <p className="text-sm font-bold text-foreground/80 line-clamp-1">{agent.purpose}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{agent.description || 'No detailed system description available.'}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {agent.roles?.map((role, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary text-foreground/60 rounded-lg text-[8px] font-black uppercase tracking-widest border border-border/50">
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                    <button
                      onClick={() => { setEditingAgent(agent); setIsModalOpen(true); }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground/60 hover:text-foreground hover:bg-secondary/80 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Settings className="w-3 h-3" />
                      Configure
                    </button>
                    <button
                      onClick={() => handleToggleStatus(agent)}
                      className={`p-3 rounded-xl border transition-all ${
                        agent.status === 'Active'
                          ? 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive hover:text-white'
                          : 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500 hover:text-white'
                      }`}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAgent(agent)}
                      className="p-3 bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all border border-transparent hover:border-destructive/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : view === 'providers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
           {providers.map(p => (
              <div key={p.id} className="bg-card rounded-3xl border border-border p-8 relative overflow-hidden group">
                 <div className="flex items-center justify-between mb-8">
                    <div className="p-3 bg-secondary rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                       <Cpu className="w-6 h-6" />
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${p.is_active ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                       {p.is_active ? 'Active' : 'Offline'}
                    </div>
                 </div>
                 <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-2">{p.name}</h3>
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-8">Neutral Compute Provider</p>
                 
                 <div className="flex items-center gap-3 pt-6 border-t border-border">
                    <button 
                       onClick={() => { setEditingProvider(p); setIsProviderModalOpen(true); }}
                       className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground/60 hover:text-foreground rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                       <Edit2 className="w-3 h-3" />
                       Rename
                    </button>
                    <button 
                       onClick={() => handleToggleProvider(p)}
                       className={`p-3 rounded-xl border transition-all ${p.is_active ? 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive hover:text-white' : 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500 hover:text-white'}`}
                    >
                       {p.is_active ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </button>
                 </div>
              </div>
           ))}
        </div>
      ) : (
        <div className="bg-card rounded-3xl border border-border p-20 flex flex-col items-center justify-center text-center">
           <Shield className="w-16 h-16 text-muted-foreground/30 mb-6" />
           <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Operational Role Management</p>
           <p className="text-xs font-bold text-muted-foreground/60 mt-2">Roles define behavior profiles. Manage roles from the catalog dashboard.</p>
        </div>
      )}

      {/* Modals */}
      {isModalOpen && <AgentFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} agent={editingAgent} providers={providers} roles={roles} onSuccess={fetchData} supabase={supabase} />}
      {isProviderModalOpen && <ProviderFormModal isOpen={isProviderModalOpen} onClose={() => setIsProviderModalOpen(false)} provider={editingProvider} onSuccess={fetchData} supabase={supabase} />}
    </div>
  );
}

function ProviderFormModal({ isOpen, onClose, provider, onSuccess, supabase }: { isOpen: boolean, onClose: () => void, provider: AIProvider | null, onSuccess: () => void, supabase: any }) {
   const [loading, setLoading] = useState(false);
   const [name, setName] = useState(provider?.name || '');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         if (provider) {
            const { error } = await supabase.from('ai_providers').update({ name }).eq('id', provider.id);
            if (error) throw error;
         } else {
            const { error } = await supabase.from('ai_providers').insert([{ name }]);
            if (error) throw error;
         }
         toast.success("Registry module updated.");
         onSuccess();
         onClose();
      } catch (err: any) {
         toast.error(`Protocol failure: ${err.message}`);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
         <div className="bg-card rounded-3xl border border-border max-w-md w-full p-10 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"><XCircle className="w-6 h-6" /></button>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">{provider ? 'Rename Provider' : 'Register Provider'}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">AI Neural Network Integration Setup</p>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provider Title</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold" placeholder="e.g. OpenAI GPT-4 Turbo" />
               </div>
               <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                  Finalize Registry Update
               </button>
            </form>
         </div>
      </div>
   );
}

function AgentFormModal({ 
  isOpen, onClose, agent, providers, roles, onSuccess, supabase 
}: { 
  isOpen: boolean, onClose: () => void, agent: AIAgent | null, providers: AIProvider[], roles: AIRole[], onSuccess: () => void, supabase: any 
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    description: agent?.description || '',
    purpose: agent?.purpose || '',
    provider_id: agent?.provider_id || providers[0]?.id || '',
    system_prompt: agent?.system_prompt || '',
    temperature: agent?.temperature || 0.7,
    max_tokens: agent?.max_tokens || 1024,
    assigned_roles: agent?.roles || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        name: formData.name,
        description: formData.description,
        purpose: formData.purpose,
        provider_id: formData.provider_id,
        system_prompt: formData.system_prompt,
        temperature: formData.temperature,
        max_tokens: formData.max_tokens,
        status: agent ? agent.status : 'Draft',
        updated_at: new Date().toISOString(),
      };

      let agentId = agent?.id;

      if (agent) {
        const { error } = await supabase.from('ai_agents').update(dataToSave).eq('id', agent.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('ai_agents').insert([{ ...dataToSave, created_at: new Date().toISOString() }]).select();
        if (error) throw error;
        agentId = data[0].id;
      }

      // Sync Roles (Mental simplification for MVP: replace all with new set)
      // In a real app, you'd use a junction table properly
      
      toast.success(agent ? 'Agent protocol updated.' : 'Intelligence module initialized.');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(`Sync Failure: ${error.message || 'Unknown protocol error.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-card rounded-3xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"
        >
          <XCircle className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{agent ? 'Configure Module' : 'Initialize Module'}</h3>
            <p className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-widest opacity-60">Defining AI Agent Parameters & System Prompts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Unique Signature (Name)</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold"
                placeholder="e.g. ReturnAgent_v1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Strategic Provider</label>
              <select
                value={formData.provider_id}
                onChange={(e) => setFormData({ ...formData, provider_id: e.target.value })}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold"
              >
                {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Purpose</label>
            <input
              required
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold"
              placeholder="e.g. Handle customer refund eligibility audits"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Instruction Profile (Prompt)</label>
            <textarea
              rows={6}
              value={formData.system_prompt}
              onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm"
              placeholder="You are a highly efficient returns assistant..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Creativity Index (Temp: {formData.temperature})</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Token Limit</label>
              <input
                type="number"
                value={formData.max_tokens}
                onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-secondary text-foreground/60 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-all"
            >
              Cancel Protocol
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
              {agent ? 'Update Registry' : 'Commit to Registry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
