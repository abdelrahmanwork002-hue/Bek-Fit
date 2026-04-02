'use client';
import { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Play, Filter, 
  Loader2, Dumbbell, XCircle, Archive, 
  RefreshCcw, Eye, Save, Trash, FileSpreadsheet, 
  Sparkles, Keyboard, ChevronDown, Upload, Wand2, Download
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
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
  bodyArea: string;
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
  }, []);

  async function fetchExercises() {
    setLoading(true);
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
       toast.error("Failed to establish orbital link with exercise database.");
    } else if (data) {
       const formatted: Exercise[] = data.map((ex: any) => ({
          id: ex.id,
          name: ex.title,
          category: (ex.category as any) || 'Gym',
          bodyArea: ex.body_area || 'Mixed',
          equipment: ex.equipment || 'Variable',
          difficulty: ex.difficulty || 'Intermediate',
          duration: `${ex.duration_seconds || 45}s`,
          sets: String(ex.default_sets || 3),
          reps: String(ex.default_reps || 12),
          videoUrl: ex.video_url || '',
          description: ex.description || '',
          status: (ex.status as any) || 'Active',
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
    const matchesArea = filterBodyArea === 'all' || ex.bodyArea === filterBodyArea;
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
            <option value="all">ANATOMICAL AREAS</option>
            {['Chest', 'Back', 'Legs', 'Core', 'Arms', 'Shoulders'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
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
                       {['Identity', 'Category', 'Anatomy', 'Module Specs', 'Volume', 'Operations'].map((h) => (
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
                             <span className="text-[8px] font-black text-foreground uppercase tracking-widest bg-secondary/80 px-2 py-1 rounded border border-border/30">{ex.bodyArea}</span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-foreground uppercase tracking-widest">{ex.equipment}</p>
                                <p className={`text-[8px] font-bold uppercase tracking-widest ${ex.difficulty.toLowerCase() === 'advanced' ? 'text-red-500' : 'text-primary'}`}>{ex.difficulty}</p>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-sm font-black text-foreground">{ex.sets} × {ex.reps}</p>
                             <p className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase">{ex.duration}</p>
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

function ExcelImportModal({ isOpen, onClose, onSuccess, supabase }: any) {
   const [file, setFile] = useState<File | null>(null);
   const [uploading, setUploading] = useState(false);

   const handleUpload = async () => {
      if (!file) return;
      setUploading(true);
      try {
         const reader = new FileReader();
         reader.onload = async (e) => {
            const content = e.target?.result as string;
            // Simple CSV parsing for demonstration (real implementation would use xlsx)
            const lines = content.split('\n').filter(l => l.trim());
            const headers = lines[0].split(',');
            const rows = lines.slice(1).map(line => {
               const values = line.split(',');
               return {
                  title: values[0],
                  category: values[1] || 'Gym',
                  body_area: values[2] || 'Full Body',
                  difficulty: values[3] || 'intermediate',
                  description: values[4] || ''
               };
            });

            const { error } = await supabase.from('exercises').insert(rows);
            if (error) throw error;
            toast.success(`${rows.length} protocols successfully ingested.`);
            onSuccess();
            onClose();
         };
         reader.readAsText(file);
      } catch (err: any) {
         toast.error(`Registry Overload: ${err.message}`);
      } finally {
         setUploading(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
         <div className="bg-card rounded-3xl border border-border max-w-lg w-full p-10 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"><XCircle className="w-6 h-6" /></button>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Protocol Batch Ingress</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8 text-center bg-secondary/50 p-4 rounded-xl">Supports .CSV files (Title, Category, BodyArea, Difficulty, Description)</p>

            <div className="space-y-6">
               <div className="w-full h-40 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all cursor-pointer group relative">
                  <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <Upload className={`w-8 h-8 ${file ? 'text-green-500' : 'text-muted-foreground group-hover:text-primary'} transition-colors`} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-8 text-center">{file ? file.name : 'Drop Protocol Data or Click to Select'}</p>
               </div>

               <div className="flex gap-4">
                  <button onClick={onClose} className="flex-1 py-4 bg-secondary text-foreground/60 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-all">Abort</button>
                  <button onClick={handleUpload} disabled={!file || uploading} className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                     {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                     Commit Batch
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

function AIGerateModal({ isOpen, onClose, onSuccess, supabase }: any) {
   const [generating, setGenerating] = useState(false);
   const [prompt, setPrompt] = useState('');
   const [agents, setAgents] = useState<any[]>([]);

   useEffect(() => {
     async function fetchAgents() {
       const { data } = await supabase.from('ai_agents').select('*').eq('status', 'Active');
       if (data) setAgents(data);
     }
     fetchAgents();
   }, []);

   const handleGenerate = async () => {
      setGenerating(true);
      try {
         // This would call your AI orchestration layer
         toast.loading("AI Agent is deep-thinking...");
         await new Promise(r => setTimeout(r, 2000));
         
         const samplePayload = {
            title: `AI: ${prompt.split(' ').slice(0, 2).join(' ').toUpperCase()}`,
            category: 'Gym',
            body_area: 'Mixed',
            difficulty: 'intermediate',
            description: `Generated based on prompt: ${prompt}`,
            default_sets: 3,
            default_reps: 12,
            duration_seconds: 60
         };

         const { error } = await supabase.from('exercises').insert([samplePayload]);
         if (error) throw error;
         toast.success("AI Synthesis Complete. Protocol Registered.");
         onSuccess();
         onClose();
      } catch (err: any) {
         toast.error(`Neural Link Failure: ${err.message}`);
      } finally {
         setGenerating(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
         <div className="bg-card rounded-3xl border border-border max-w-lg w-full p-10 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-colors"><XCircle className="w-6 h-6" /></button>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Neural Pulse: AI Protocol Synthesis</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">Consult specific AI Agents to design optimized movement patterns.</p>

            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Strategic AI Agent</label>
                  <select className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold">
                     {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                     {agents.length === 0 && <option>NO ACTIVE AGENTS DETECTED</option>}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synthesis Requirement (Prompt)</label>
                  <textarea rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm" placeholder="e.g. Design a high-intensity shoulder mobility protocol using active resistance..." />
               </div>

               <div className="flex gap-4">
                  <button onClick={onClose} className="flex-1 py-4 bg-secondary text-foreground/60 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-all">Abort</button>
                  <button onClick={handleGenerate} disabled={!prompt || generating} className="flex-[2] py-4 bg-purple-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-purple-500/20 flex items-center justify-center gap-3">
                     {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                     Initiate AI Strategy
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

function ExerciseFormModal({ 
  isOpen, onClose, exercise, onSuccess, supabase 
}: any) {
   const [saving, setSaving] = useState(false);
   const [formData, setFormData] = useState({
      title: exercise?.name || '',
      category: exercise?.category || 'Gym',
      description: exercise?.description || '',
      body_area: exercise?.bodyArea || 'Chest',
      equipment: exercise?.equipment || 'Dumbbells',
      difficulty: exercise?.difficulty || 'intermediate',
      default_sets: exercise?.sets || '3',
      default_reps: exercise?.reps || '12',
      duration_seconds: exercise?.duration?.replace('s', '') || '60',
      video_url: exercise?.videoUrl || ''
   });

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      try {
         const payload = {
            ...formData,
            default_sets: parseInt(formData.default_sets),
            default_reps: parseInt(formData.default_reps),
            duration_seconds: parseInt(formData.duration_seconds),
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
      } catch (err: any) {
         toast.error(`Injection Failure: ${err.message}`);
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

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocol Title</label>
                     <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold" placeholder="e.g. DUMBBELL PUSH PRESS" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category Strategy</label>
                     <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold">
                        {['Gym', 'Yoga', 'Calisthenics'].map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Zone</label>
                     <select value={formData.body_area} onChange={(e) => setFormData({ ...formData, body_area: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-bold">
                        {['Chest', 'Back', 'Legs', 'Core', 'Arms', 'Shoulders'].map(a => <option key={a} value={a}>{a.toUpperCase()}</option>)}
                     </select>
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
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center block">Sets</label>
                     <input type="number" value={formData.default_sets} onChange={(e) => setFormData({ ...formData, default_sets: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-black" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center block">Reps</label>
                     <input type="number" value={formData.default_reps} onChange={(e) => setFormData({ ...formData, default_reps: e.target.value })} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-black" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center block">Secs</label>
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
