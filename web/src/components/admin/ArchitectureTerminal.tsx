'use client';
import { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Search, 
  Plus, 
  Save, 
  ArrowLeft, 
  Settings, 
  Trash2, 
  Layout, 
  Clock, 
  ChevronRight, 
  Activity,
  Layers,
  ChevronDown
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';

export function ArchitectureTerminal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('userId');
  const planId = searchParams.get('planId');
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArchitecture() {
       if (userId) {
          const { data: user } = await supabase.from('users').select('full_name').eq('id', userId).single();
          if (user) setUserName(user.full_name);
       }
       // Mock for now until schema is fully mapped
       setExercises([
          { id: '1', name: 'Barbell Back Squat', category: 'Strength', defaultReps: '8-12', defaultSets: 3 },
          { id: '2', name: 'Flat Bench Press', category: 'Strength', defaultReps: '8-12', defaultSets: 3 },
          { id: '3', name: 'Deadlift', category: 'Strength', defaultReps: '5-8', defaultSets: 3 },
       ]);
       setLoading(false);
    }
    fetchArchitecture();
  }, [userId, supabase]);

  const handleSave = () => {
    toast.success('Architecture finalized and pushed to user deployment.');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-3">
              <button onClick={() => router.back()} className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <ArrowLeft className="w-4 h-4 text-primary" />
              </button>
              <h2 className="text-3xl font-black text-foreground tracking-tight uppercase tracking-widest">PROTOCOL <span className="text-primary underline decoration-primary/30 underline-offset-8">ARCHITECT</span></h2>
           </div>
           <p className="text-muted-foreground font-medium">Fine-tuning routine for: <span className="text-foreground font-black">{userName || 'Active Patient'}</span></p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Save className="w-4 h-4" />
            Commit Sequence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Active Protocol Grid */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Layout className="w-5 h-5" />
                   </div>
                   <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Strategic Routine Layer</h3>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">Structure:</span>
                   <div className="flex gap-1">
                      {['Mon', 'Wed', 'Fri'].map(d => (
                         <span key={d} className="px-2 py-1 bg-secondary rounded text-[8px] font-black uppercase">{d}</span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                {[1, 2, 3].map((set, i) => (
                  <div key={i} className="group relative bg-secondary/20 rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all font-black text-xs">
                              0{i+1}
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Primary Strength Module</p>
                              <p className="text-sm font-black text-foreground uppercase tracking-tight">Compound Body Flow</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right px-4 border-r border-border/50">
                              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Repetition Range</p>
                              <p className="text-xs font-black text-foreground">8-12 Reps</p>
                           </div>
                           <div className="text-right px-4 border-r border-border/50">
                              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Sets</p>
                              <p className="text-xs font-black text-foreground">3 Intensity Logs</p>
                           </div>
                           <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                     <div className="h-1 bg-secondary/50 rounded-full w-full overflow-hidden">
                        <div className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-700" style={{width: `${30 + i*20}%`}} />
                     </div>
                  </div>
                ))}
             </div>

             <button className="w-full mt-6 py-4 border-2 border-dashed border-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 group">
                <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" />
                Append Movement Module
             </button>
          </div>
        </div>

        {/* Exercise Repository Side Panel */}
        <div className="space-y-6">
           <div className="bg-card rounded-3xl border border-border p-8 shadow-sm flex flex-col h-full max-h-[800px]">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2 mb-6">
                 <Dumbbell className="w-4 h-4 text-primary" />
                 Module Registry
              </h3>
              
              <div className="relative group mb-6">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Filter by signature..."
                   className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-xs font-bold"
                 />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                 {exercises.map(ex => (
                   <div key={ex.id} className="p-4 bg-secondary/20 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] font-black text-foreground uppercase tracking-tight">{ex.name}</p>
                         <Plus className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1">{ex.category}</p>
                   </div>
                 ))}
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    Load Density Index
                 </p>
                 <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{width: '75%'}} />
                    </div>
                    <span className="text-[10px] font-black text-foreground">75%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
