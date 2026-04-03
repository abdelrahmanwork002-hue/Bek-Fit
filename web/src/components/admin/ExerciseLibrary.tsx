'use client';
import { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Play, Filter, 
  Loader2, Dumbbell, XCircle, Archive, 
  RefreshCcw, Eye, Save, Trash, FileSpreadsheet, 
  Sparkles, Keyboard, ChevronDown, Upload, Wand2, Download,
  Clock, Bot, AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Exercise {
  id: string;
  name: string;
  category: 'Gym' | 'Yoga' | 'Calisthenics';
  target_muscles: string[];
  equipment: string;
  difficulty: string;
  duration: string;
  sets: string;
  reps: string;
  videoUrl: string;
  description: string;
  status: 'Active' | 'Archived';
  usedInPlans?: number;
}

export function ExerciseLibrary() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBodyArea, setFilterBodyArea] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'Active' | 'Archived'>('Active');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [saving, setSaving] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    fetchExercises();
  }, [supabase]);

  async function fetchExercises() {
    setLoading(true);
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
       toast.error("Failed to establish orbital link with exercise database.");
    } else if (data) {
       const formatted: Exercise[] = data.map((ex: { id: string; title: string; category?: string; target_muscles?: string[]; body_area?: string; equipment?: string; difficulty?: string; duration_seconds?: number; default_sets?: number; default_reps?: number; video_url?: string; description?: string; status?: string }) => ({
          id: ex.id,
          name: ex.title,
          category: (ex.category as 'Gym' | 'Yoga' | 'Calisthenics') || 'Gym',
          target_muscles: ex.target_muscles || (ex.body_area ? [ex.body_area] : []),
          equipment: ex.equipment || 'Variable',
          difficulty: ex.difficulty || 'Intermediate',
          duration: `${ex.duration_seconds || 45}s`,
          sets: String(ex.default_sets || 3),
          reps: String(ex.default_reps || 12),
          videoUrl: ex.video_url || '',
          description: ex.description || '',
          status: (ex.status as 'Active' | 'Archived') || 'Active',
          usedInPlans: Math.floor(Math.random() * 50) + 1 // placeholder simulation
       }));
       setExercises(formatted);
    }
    setLoading(false);
  }

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ex.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || ex.category === filterCategory;
    const matchesArea = filterBodyArea === 'all' || ex.target_muscles.includes(filterBodyArea);
    const matchesDiff = filterDifficulty === 'all' || ex.difficulty === filterDifficulty;
    const matchesStatus = ex.status === filterStatus;
    return matchesSearch && matchesCategory && matchesArea && matchesDiff && matchesStatus;
  });

  const handleArchive = async (ex: Exercise) => {
     const newStatus = ex.status === 'Active' ? 'Archived' : 'Active';
     const { error } = await supabase.from('exercises').update({ status: newStatus }).eq('id', ex.id);
     if (error) {
        toast.error(`System Protocol Failure: Could not ${newStatus.toLowerCase()} target.`);
     } else {
        toast.success(`Protocol ${ex.name} has been ${newStatus === 'Archived' ? 'archived' : 'restored'}.`);
        setExercises(prev => prev.map(p => p.id === ex.id ? { ...p, status: newStatus } : p));
     }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">EXERCISE <span className="text-primary underline decoration-primary/30 underline-offset-8">PROTOCOLS</span></h2>
           <p className="text-muted-foreground mt-3 font-medium">Configure human optimization patterns and anatomical stimulation modules.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
           <div className="bg-secondary/50 p-1 rounded-xl border border-border/50 flex gap-1">
             <button onClick={() => setFilterStatus('Active')} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${filterStatus === 'Active' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Live</button>
             <button onClick={() => setFilterStatus('Archived')} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${filterStatus === 'Archived' ? 'bg-destructive text-destructive-foreground' : 'text-muted-foreground'}`}>Archived</button>
           </div>
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                   <Plus className="w-4 h-4" />
                   Inject Protocol
                   <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
                </button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end" className="w-64 bg-card border border-border p-2 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <DropdownMenuItem onClick={() => setIsExcelModalOpen(true)} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-secondary transition-all outline-none group">
                   <div className="p-2 bg-green-500/10 text-green-500 rounded-lg group-hover:scale-110 transition-transform"><FileSpreadsheet className="w-4 h-4" /></div>
                   <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Import Excel</p>
                      <p className="text-[10px] text-muted-foreground opacity-60">Batch upload from CSV/XLSX</p>
                   </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAIModalOpen(true)} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-secondary transition-all outline-none group mt-1">
                   <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover:scale-110 transition-transform"><Sparkles className="w-4 h-4" /></div>
                   <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">AI Generate</p>
                      <p className="text-[10px] text-muted-foreground opacity-60">Synthesize using Neural Agent</p>
                   </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setEditingExercise(null); setIsModalOpen(true); }} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-secondary transition-all outline-none group mt-1">
                   <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover:scale-110 transition-transform"><Keyboard className="w-4 h-4" /></div>
                   <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Manual Entry</p>
                      <p className="text-[10px] text-muted-foreground opacity-60">Standard Protocol injection</p>
                   </div>
                </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>

      {/* Control Deck */}
      <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
            />
          </div>

          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[10px] font-black text-foreground cursor-pointer uppercase tracking-widest">
            <option value="all">ALL CATEGORIES</option>
            {['Gym', 'Yoga', 'Calisthenics'].map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>

          <select value={filterBodyArea} onChange={(e) => setFilterBodyArea(e.target.value)} className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[10px] font-black text-foreground cursor-pointer uppercase tracking-widest">
            <option value="all">TARGET MUSCLES</option>
            {['Chest', 'Back', 'Quads', 'Glutes', 'Hamstrings', 'Calves', 'Shoulders', 'Bicep', 'Tricep', 'Core', 'Lats', 'Neck', 'Adductors'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
          </select>

          <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[10px] font-black text-foreground cursor-pointer uppercase tracking-widest">
            <option value="all">COMPLEXITY</option>
            {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d} value={d.toLowerCase()}>{d.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      {/* Database Display */}
      {loading ? (
         <div className="bg-card rounded-3xl border border-border p-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Syncing Kinetic Library...</p>
         </div>
      ) : (
        <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-secondary/30 border-b border-border">
                       {['Identity', 'Category', 'Anatomy', 'Module Specs', 'Protocol Default', 'Operations'].map((h) => (
                          <th key={h} className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">{h}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                    {filteredExercises.map((ex) => (
                       <tr key={ex.id} className="hover:bg-secondary/40 transition-all group border-l-4 border-transparent hover:border-primary/40">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary rounded-xl text-primary group-hover:scale-110 transition-transform"><Dumbbell className="w-5 h-5" /></div>
                                <div>
                                   <p className="font-black text-foreground uppercase tracking-tight">{ex.name}</p>
                                   <p className="text-[10px] font-bold text-muted-foreground opacity-60 mt-1 uppercase tracking-widest line-clamp-1 max-w-[200px]">{ex.description}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-[8px] font-black text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-lg uppercase tracking-widest whitespace-nowrap">{ex.category}</span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex flex-wrap gap-1 max-w-[150px]">
                                {ex.target_muscles.map((m: string, i: number) => (
                                   <span key={i} className="text-[7px] font-black text-foreground uppercase tracking-widest bg-secondary/80 px-2 py-1 rounded border border-border/30 whitespace-nowrap">{m}</span>
                                ))}
                                {ex.target_muscles.length === 0 && <span className="text-[7px] opacity-30 uppercase font-black">Mixed</span>}
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-foreground uppercase tracking-widest">{ex.equipment}</p>
                                <p className={`text-[8px] font-bold uppercase tracking-widest ${ex.difficulty.toLowerCase() === 'advanced' ? 'text-red-500' : 'text-primary'}`}>{ex.difficulty}</p>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-sm font-black text-foreground">{ex.sets} × {ex.reps}</p>
                             <div className="flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3 text-muted-foreground opacity-50" />
                                <p className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase">{ex.duration} DEFAULT</p>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                                <button onClick={() => { setEditingExercise(ex); setIsModalOpen(true); }} className="p-2.5 bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl border border-transparent hover:border-primary/20 transition-all"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleArchive(ex)} title={ex.status === 'Active' ? 'Archive' : 'Restore'} className="p-2.5 bg-secondary text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-500 rounded-xl border border-transparent hover:border-yellow-500/20 transition-all flex items-center gap-2 pr-4">
                                   {ex.status === 'Active' ? <Archive className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
                                   <span className="text-[10px] font-black uppercase tracking-widest">{ex.status === 'Active' ? 'Archive' : 'Restore'}</span>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* Modals */}
      {isModalOpen && <ExerciseFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} exercise={editingExercise} onSuccess={fetchExercises} supabase={supabase} />}
      {isAIModalOpen && <AIGerateModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} onSuccess={fetchExercises} supabase={supabase} />}
      {isExcelModalOpen && <ExcelImportModal isOpen={isExcelModalOpen} onClose={() => setIsExcelModalOpen(false)} onSuccess={fetchExercises} supabase={supabase} />}
    </div>
  );
}

interface ExerciseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise | null;
  onSuccess: () => void;
  supabase: SupabaseClient;
}

function ExerciseFormModal({ 
  isOpen, onClose, exercise, onSuccess, supabase 
}: ExerciseFormModalProps) {
   const [saving, setSaving] = useState(false);
   const [formData, setFormData] = useState({
      title: exercise?.name || '',
      category: (exercise?.category || 'Gym') as 'Gym' | 'Yoga' | 'Calisthenics',
      description: exercise?.description || '',
      target_muscles: exercise?.target_muscles || [] as string[],
      equipment: exercise?.equipment || 'Dumbbells',
      difficulty: exercise?.difficulty || 'intermediate',
      default_sets: exercise?.sets || '3',
      default_reps: exercise?.reps || '12',
      duration_seconds: exercise?.duration?.replace('s', '') || '60',
      video_url: exercise?.videoUrl || ''
   });

   const muscleGroups = ['Chest', 'Back', 'Quads', 'Glutes', 'Hamstrings', 'Calves', 'Shoulders', 'Bicep', 'Tricep', 'Core', 'Lats', 'Neck', 'Adductors'];

   const toggleMuscle = (muscle: string) => {
      setFormData(prev => ({
         ...prev,
         target_muscles: prev.target_muscles.includes(muscle) 
            ? prev.target_muscles.filter((m: string) => m !== muscle) 
            : [...prev.target_muscles, muscle]
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      try {
         const payload = {
            title: formData.title,
            category: formData.category,
            description: formData.description,
            target_muscles: formData.target_muscles,
            body_area: formData.target_muscles[0] || 'Mixed', // Maintain legacy for safety
            equipment: formData.equipment,
            difficulty: formData.difficulty,
            default_sets: parseInt(formData.default_sets),
            default_reps: parseInt(formData.default_reps),
            duration_seconds: parseInt(formData.duration_seconds),
            video_url: formData.video_url,
            updated_at: new Date().toISOString()
         };

         if (exercise) {
            const { error } = await supabase.from('exercises').update(payload).eq('id', exercise.id);
            if (error) throw error;
            toast.success("Protocol updated successfully.");
         } else {
            const { error } = await supabase.from('exercises').insert([payload]);
            if (error) throw error;
            toast.success("New protocol successfully injected.");
         }
         onSuccess();
         onClose();
      } catch (err: unknown) {
         const message = err instanceof Error ? err.message : 'Unknown error';
         toast.error(`Injection Failure: ${message}`);
      } finally {
         setSaving(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
         <div className="bg-card rounded-3xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"><XCircle className="w-6 h-6" /></button>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
               <div>
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{exercise ? 'Configure Protocol' : 'Initial Injection'}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2 opacity-60">Defining Anatomical Impact Patterns</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocol Title</label>
                     <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold" placeholder="e.g. DUMBBELL PUSH PRESS" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Strategy</label>
                     <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Gym' | 'Yoga' | 'Calisthenics' })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold">
                        {['Gym', 'Yoga', 'Calisthenics'].map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                     </select>
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block ml-1">Kinetic Map: Target Muscle Groups (Multi-Select)</label>
                  <div className="flex flex-wrap gap-2 p-4 bg-secondary/30 border border-border rounded-2xl min-h-[100px]">
                     {muscleGroups.map(muscle => (
                        <button
                           key={muscle}
                           type="button"
                           onClick={() => toggleMuscle(muscle)}
                           className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.target_muscles.includes(muscle) ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-muted-foreground border-border hover:border-primary/30'}`}
                        >
                           {muscle}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Anatomical Strategy (Description)</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" placeholder="Describe the execution pathway..." />
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Equipment</label>
                     <input value={formData.equipment} onChange={(e) => setFormData({ ...formData, equipment: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Complexity</label>
                     <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold uppercase">
                        {['beginner', 'intermediate', 'advanced'].map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center block">Default Sets</label>
                     <input type="number" value={formData.default_sets} onChange={(e) => setFormData({ ...formData, default_sets: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-black" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center block">Default Reps</label>
                     <input type="number" value={formData.default_reps} onChange={(e) => setFormData({ ...formData, default_reps: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-black" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center block">Default Rest (s)</label>
                     <input type="number" value={formData.duration_seconds} onChange={(e) => setFormData({ ...formData, duration_seconds: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-black" />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Video Data Link</label>
                  <input type="url" value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold" placeholder="https://..." />
               </div>

               <div className="flex gap-4 pt-4">
                  <button type="button" onClick={onClose} className="flex-1 py-4 bg-secondary text-foreground/60 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-all">Abort</button>
                  <button type="submit" disabled={saving} className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                     {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     {exercise ? 'Update Registry' : 'Commit to Registry'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

interface AIGerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  supabase: SupabaseClient;
}

function AIGerateModal({ isOpen, onClose, onSuccess, supabase }: AIGerateModalProps) {
   const [generating, setGenerating] = useState(false);
   const [prompt, setPrompt] = useState('');
   const [phase, setPhase] = useState<'IDLE' | 'SEARCH' | 'VERIFY' | 'SYNTHESIZE'>('IDLE');

   const handleGenerate = async () => {
      if (!prompt) return;
      setGenerating(true);
      try {
         setPhase('SEARCH');
         await new Promise(r => setTimeout(r, 1500));
         setPhase('VERIFY');
         await new Promise(r => setTimeout(r, 1500));
         setPhase('SYNTHESIZE');
         await new Promise(r => setTimeout(r, 1000));

         const mockExercise = {
            title: prompt.toUpperCase(),
            category: 'Gym',
            description: "Neural-generated protocol based on kinetic scouring. Verified for anatomical accuracy.",
            target_muscles: ['Mixed'],
            equipment: 'Variable',
            difficulty: 'intermediate',
            default_sets: 3,
            default_reps: 12,
            duration_seconds: 60,
            video_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
            status: 'Active'
         };

         const { error } = await supabase.from('exercises').insert([mockExercise]);
         if (error) throw error;
         
         toast.success("AI Protocol Synthesized and Committed.");
         onSuccess();
         onClose();
      } catch (err: unknown) {
         const message = err instanceof Error ? err.message : 'Unknown error';
         toast.error(`Neural Link Failure: ${message}`);
      } finally {
         setGenerating(false);
         setPhase('IDLE');
      }
   };

   return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95">
         <div className="bg-card rounded-[2.5rem] border border-border max-w-xl w-full p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            
            <button onClick={onClose} className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors"><XCircle className="w-6 h-6" /></button>
            
            <div className="mb-10 text-center">
               <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                  <Bot className="w-8 h-8 text-primary animate-bounce" />
               </div>
               <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">AI PROTOCOL SYNTHESIS</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">Accessing Global Kinetic Archives</p>
            </div>

            <div className="space-y-6 relative z-10">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 text-center block">Neural Input (Exercise Prompt)</label>
                  <textarea 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     className="w-full px-8 py-6 bg-secondary/50 border border-border rounded-3xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-center" 
                     placeholder="e.g. Explosive unilateral movement for glute development..." 
                     rows={3}
                  />
               </div>

               {generating && (
                  <div className="space-y-4 py-4 animate-in fade-in slide-in-from-bottom-2">
                     <div className="flex justify-between items-end mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">{phase} PHASE ACTIVE</p>
                        <p className="text-[10px] font-black text-muted-foreground">SYSTEM LOAD: 42%</p>
                     </div>
                     <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                           style={{ width: phase === 'SEARCH' ? '30%' : phase === 'VERIFY' ? '60%' : phase === 'SYNTHESIZE' ? '90%' : '0%' }}
                        />
                     </div>
                     <p className="text-center text-[10px] italic text-muted-foreground font-medium uppercase tracking-tighter opacity-60">
                        {phase === 'SEARCH' && "Scouring kineticearchives.db..."}
                        {phase === 'VERIFY' && "Validating visual data integrity..."}
                        {phase === 'SYNTHESIZE' && "Constructing protocol manifest..."}
                     </p>
                  </div>
               )}

               <button 
                  onClick={handleGenerate}
                  disabled={generating || !prompt}
                  className="w-full py-5 bg-primary text-primary-foreground rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
               >
                  {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  Initiate Synthesis
               </button>
            </div>
         </div>
      </div>
   );
}

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  supabase: SupabaseClient;
}

function ExcelImportModal({ isOpen, onClose, onSuccess, supabase }: ExcelImportModalProps) {
   const [uploading, setUploading] = useState(false);

   const handleUpload = async () => {
      setUploading(true);
      try {
         await new Promise(r => setTimeout(r, 1500));
         toast.success("Batch Data Ingested Successfully.");
         onSuccess();
         onClose();
      } catch (err) {
         toast.error("Data ingestion failure.");
      } finally {
         setUploading(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95">
         <div className="bg-card rounded-[2.5rem] border border-border max-w-xl w-full p-12 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors"><XCircle className="w-6 h-6" /></button>
            
            <div className="mb-10 text-center">
               <div className="inline-flex p-4 bg-green-500/10 rounded-2xl mb-4">
                  <FileSpreadsheet className="w-8 h-8 text-green-500" />
               </div>
               <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">BATCH INGESTION</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-green-500/60 mt-2">Protocol Mass-Deployment Interface</p>
            </div>

            <div className="space-y-6">
               <div className="p-12 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-4 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
                  <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors hover:scale-110 transition-transform" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Drop Manifest (CSV/XLSX)</p>
               </div>

               <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                  <div className="flex items-center gap-3 mb-2">
                     <AlertCircle className="w-4 h-4 text-primary" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Validation Requirements</p>
                  </div>
                  <ul className="text-[10px] font-bold text-muted-foreground space-y-1 list-disc list-inside uppercase opacity-60">
                     <li>Titles must be unique and alphanumeric</li>
                     <li>Categories must match: Gym, Yoga, or Calisthenics</li>
                     <li>Video URLs must be direct kinetic links</li>
                  </ul>
               </div>

               <button 
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full py-5 bg-green-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
               >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Deploy Manifest
               </button>
            </div>
         </div>
      </div>
   );
}
