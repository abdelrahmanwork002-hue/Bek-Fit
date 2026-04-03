'use client';
import { useState, useEffect } from 'react';
import { 
  Plus, Copy, Edit2, Archive, Eye, Search, 
  Trash2, GripVertical, Clock, Dumbbell, 
  ChevronRight, Save, XCircle, Loader2, Sparkles
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { SupabaseClient } from '@supabase/supabase-js';

interface Exercise {
  id: string;
  name: string;
  category: string;
  bodyArea: string;
  default_sets?: number;
  default_reps?: number;
  duration_seconds?: number;
}

interface PlanExercise {
  exercise_id: string;
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  order_index: number;
}

interface Template {
  id: string;
  name: string;
  goal: string;
  difficulty: string;
  duration: string;
  equipment: string[];
  description: string;
  workouts_per_week: number;
  status: 'active' | 'archived';
  usage_count: number;
  last_modified: string;
  exercises: PlanExercise[];
}

export function PlanTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('plan_templates')
        .select(`
          *,
          exercises:template_exercises(
            exercise_id,
            sets,
            reps,
            rest_seconds,
            order_index,
            exercises(title)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setTemplates(data.map((t: any) => ({
          ...t,
          exercises: t.exercises.map((te: any) => ({
            exercise_id: te.exercise_id,
            name: te.exercises.title,
            sets: te.sets,
            reps: te.reps,
            rest_seconds: te.rest_seconds,
            order_index: te.order_index
          }))
        })));
      }
    } catch (err: any) {
      toast.error(`Sync Failure: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const filteredTemplates = templates.filter(t => {
    const matchesDiff = filterDifficulty === 'all' || t.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesDiff && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">PLAN <span className="text-primary underline decoration-primary/30 underline-offset-8">TEMPLATES</span></h2>
           <p className="text-muted-foreground mt-3 font-medium">Architect movement protocols and progressive overload schedules.</p>
        </div>
        <button onClick={() => { setEditingTemplate(null); setShowCreateModal(true); }} className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
           <Plus className="w-4 h-4" />
           Construct Template
        </button>
      </div>

      {/* Analytics Deck */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'ACTIVE PROTOCOLS', value: templates.filter(t => t.status === 'active').length, color: 'text-primary' },
          { label: 'TOTAL DEPLOYMENTS', value: templates.reduce((s, t) => s + t.usage_count, 0), color: 'text-foreground' },
          { label: 'MOST ADOPTED', value: 'Neck Relief', color: 'text-foreground' },
          { label: 'ARCHIVED', value: templates.filter(t => t.status === 'archived').length, color: 'text-muted-foreground' }
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm group hover:border-primary/30 transition-all">
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{stat.label}</p>
             <p className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Control Deck */}
      <div className="bg-card rounded-3xl border border-border p-6 shadow-sm flex flex-wrap gap-4">
         <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="px-6 py-3 bg-secondary/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-[10px] font-black uppercase tracking-widest text-foreground cursor-pointer">
            <option value="all">ALL DIFFICULTIES</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
         </select>
         <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-6 py-3 bg-secondary/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-[10px] font-black uppercase tracking-widest text-foreground cursor-pointer">
            <option value="active">LIVE STATUS</option>
            <option value="archived">ARCHIVED</option>
         </select>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-card rounded-3xl border border-border p-8 hover:shadow-xl hover:border-primary/20 transition-all group flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${template.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-secondary text-muted-foreground border-border'}`}>{template.status}</span>
            </div>

            <div className="mb-6">
               <h3 className="text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{template.name}</h3>
               <p className="text-[10px] font-bold text-muted-foreground opacity-60 mt-1 uppercase tracking-widest">{template.goal}</p>
            </div>

            <p className="text-sm font-medium text-muted-foreground mb-8 line-clamp-2">{template.description}</p>

            <div className="space-y-3 mb-8 flex-grow">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className={template.difficulty === 'Advanced' ? 'text-red-500' : 'text-primary'}>{template.difficulty}</span>
               </div>
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground">{template.duration}</span>
               </div>
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-muted-foreground">Frequency</span>
                  <span className="text-foreground">{template.workouts_per_week}x/WEEK</span>
               </div>
               <div className="pt-4 border-t border-border/50">
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-2">Structure Preview</p>
                  <p className="text-xs font-black text-foreground">{template.exercises.length} PROTOCOLS CONFIGURED</p>
               </div>
            </div>

            <div className="flex gap-2">
               <button className="flex-1 py-4 bg-secondary text-foreground font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
               </button>
               <button onClick={() => { setEditingTemplate(template); setShowCreateModal(true); }} className="p-4 border border-border rounded-2xl text-muted-foreground hover:bg-secondary hover:text-primary transition-all">
                  <Edit2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Construction Modal */}
      {showCreateModal && (
        <PlanTemplateModal 
           isOpen={showCreateModal}
           onClose={() => setShowCreateModal(false)}
           template={editingTemplate}
           onSuccess={fetchTemplates}
           supabase={supabase}
        />
      )}
    </div>
  );
}

interface PlanTemplateModalProps {
   isOpen: boolean;
   onClose: () => void;
   template: Template | null;
   onSuccess: () => void;
   supabase: SupabaseClient;
}

function PlanTemplateModal({ isOpen, onClose, template, onSuccess, supabase }: PlanTemplateModalProps) {
   const [saving, setSaving] = useState(false);
   const [exercises, setExercises] = useState<Exercise[]>([]);
   const [formData, setFormData] = useState({
      name: template?.name || '',
      description: template?.description || '',
      goal: template?.goal || 'General Fitness',
      difficulty: template?.difficulty || 'Intermediate',
      duration_weeks: template?.duration?.replace(' weeks', '') || '8',
      workouts_per_week: template?.workouts_per_week || 3,
      exercises: template?.exercises || [] as PlanExercise[]
   });

   useEffect(() => {
     async function fetchExercises() {
       const { data } = await supabase.from('exercises').select('*').eq('status', 'Active');
       if (data) setExercises(data.map((ex: { id: string; title: string; category?: string; body_area?: string; default_sets?: number; default_reps?: number; duration_seconds?: number }) => ({
          id: ex.id,
          name: ex.title,
          category: ex.category || 'Gym',
          bodyArea: ex.body_area || 'Mixed',
          default_sets: ex.default_sets,
          default_reps: ex.default_reps,
          duration_seconds: ex.duration_seconds
       } as Exercise)));
     }
     fetchExercises();
   }, []);

   const addExercise = (ex: Exercise) => {
      setFormData(prev => ({
         ...prev,
         exercises: [
            ...prev.exercises,
            {
               exercise_id: ex.id,
               name: ex.name,
               sets: ex.default_sets || 3,
               reps: String(ex.default_reps || 12),
               rest_seconds: ex.duration_seconds || 60,
               order_index: prev.exercises.length
            }
         ]
      }));
   };

   const removeExercise = (index: number) => {
      setFormData(prev => ({
         ...prev,
         exercises: prev.exercises.filter((_, i: number) => i !== index)
      }));
   };

   const updateExerciseVolume = (index: number, key: string, value: any) => {
      setFormData(prev => ({
         ...prev,
         exercises: prev.exercises.map((ex: PlanExercise, i: number) => 
            i === index ? { ...ex, [key]: value } : ex
         )
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      try {
         const planData = {
            name: formData.name,
            description: formData.description,
            goal: formData.goal,
            difficulty: formData.difficulty,
            duration_weeks: parseInt(formData.duration_weeks),
            workouts_per_week: formData.workouts_per_week,
            status: 'active'
         };

         let templateId = template?.id;

         if (templateId) {
            // Update
            const { error: updateError } = await supabase
               .from('plan_templates')
               .update(planData)
               .eq('id', templateId);
            if (updateError) throw updateError;

            // Clear old exercises
            const { error: deleteError } = await supabase
               .from('template_exercises')
               .delete()
               .eq('template_id', templateId);
            if (deleteError) throw deleteError;
         } else {
            // Insert
            const { data, error: insertError } = await supabase
               .from('plan_templates')
               .insert([planData])
               .select()
               .single();
            if (insertError) throw insertError;
            templateId = data.id;
         }

         // Insert exercises
         const exerciseData = formData.exercises.map((ex: PlanExercise, idx: number) => ({
            template_id: templateId,
            exercise_id: ex.exercise_id,
            sets: ex.sets,
            reps: ex.reps,
            rest_seconds: ex.rest_seconds,
            order_index: idx
         }));

         const { error: junctionError } = await supabase
            .from('template_exercises')
            .insert(exerciseData);
         if (junctionError) throw junctionError;

         toast.success("Protocol Template Committed to Core Memory.");
         onSuccess();
         onClose();
      } catch (err: unknown) {
         const message = err instanceof Error ? err.message : 'Unknown error';
         toast.error(`Architecture Failure: ${message}`);
      } finally {
         setSaving(false);
      }
   };

   return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
         <div className="bg-card rounded-[3rem] border border-border max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-secondary rounded-2xl text-muted-foreground transition-all z-10"><XCircle className="w-8 h-8" /></button>
            <form onSubmit={handleSubmit} className="p-12">
               <div className="mb-12">
                  <h3 className="text-4xl font-black text-foreground uppercase tracking-tight">{template ? 'Reconfigure Template' : 'Architect Template'}</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mt-3">Defining Kinetic Sequences and Volume Protocols</p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Column: Metadata */}
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Template Signature</label>
                        <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-8 py-5 bg-secondary/50 border border-border rounded-3xl focus:ring-2 focus:ring-primary/20 outline-none font-black text-lg" placeholder="e.g. OLYMPIAN STRENGTH V1" />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Strategic Goal</label>
                           <select value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} className="w-full px-8 py-5 bg-secondary/50 border border-border rounded-3xl font-black text-xs uppercase tracking-widest cursor-pointer">
                              {['Weight Loss', 'Muscle Gain', 'Strength Training', 'Pain Management', 'General Fitness'].map(g => <option key={g}>{g}</option>)}
                           </select>
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Complexity</label>
                           <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-8 py-5 bg-secondary/50 border border-border rounded-3xl font-black text-xs uppercase tracking-widest cursor-pointer">
                              {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d}>{d}</option>)}
                           </select>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Description</label>
                        <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-8 py-5 bg-secondary/50 border border-border rounded-3xl font-medium text-sm" placeholder="Define the transformation pathway..." />
                     </div>
                  </div>

                  {/* Right Column: Exercise Sequencing */}
                  <div className="space-y-8">
                     <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Sequence Selection (Volume Mapping)</label>
                        <div className="bg-secondary/30 rounded-[2rem] border border-border p-6 min-h-[400px] flex flex-col gap-4">
                           {formData.exercises.length === 0 ? (
                              <div className="flex-grow flex flex-col items-center justify-center text-center opacity-30 gap-4">
                                 <Sparkles className="w-12 h-12" />
                                 <p className="text-[10px] font-black uppercase tracking-widest max-w-[200px]">Add protocols from library to begin volume mapping.</p>
                              </div>
                           ) : (
                              <div className="space-y-4">
                                 {formData.exercises.map((ex: any, idx: number) => (
                                    <div key={idx} className="bg-card rounded-2xl border border-border p-4 shadow-sm animate-in slide-in-from-right-4">
                                       <div className="flex items-center justify-between mb-4">
                                          <div className="flex items-center gap-3">
                                             <GripVertical className="w-4 h-4 text-muted-foreground opacity-30" />
                                             <p className="text-xs font-black uppercase text-foreground">{ex.name}</p>
                                          </div>
                                          <button type="button" onClick={() => removeExercise(idx)} className="text-destructive hover:scale-110 transition-transform"><Trash2 className="w-4 h-4" /></button>
                                       </div>
                                       <div className="grid grid-cols-3 gap-3">
                                          <div className="space-y-1">
                                             <p className="text-[8px] font-black text-muted-foreground uppercase text-center">Sets</p>
                                             <input type="number" value={ex.sets} onChange={(e) => updateExerciseVolume(idx, 'sets', parseInt(e.target.value))} className="w-full bg-secondary/50 border border-border rounded-lg text-center font-black text-xs p-2" />
                                          </div>
                                          <div className="space-y-1">
                                             <p className="text-[8px] font-black text-muted-foreground uppercase text-center">Reps/Time</p>
                                             <input value={ex.reps} onChange={(e) => updateExerciseVolume(idx, 'reps', e.target.value)} className="w-full bg-secondary/50 border border-border rounded-lg text-center font-black text-xs p-2" />
                                          </div>
                                          <div className="space-y-1">
                                             <p className="text-[8px] font-black text-muted-foreground uppercase text-center">Rest (s)</p>
                                             <input type="number" value={ex.rest_seconds} onChange={(e) => updateExerciseVolume(idx, 'rest_seconds', parseInt(e.target.value))} className="w-full bg-secondary/50 border border-border rounded-lg text-center font-black text-xs p-2" />
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                           
                           <div className="mt-4 pt-4 border-t border-border/50">
                              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-3 px-2">Library Ingress</p>
                              <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                                 {exercises.map((ex: Exercise) => (
                                    <button key={ex.id} type="button" onClick={() => addExercise(ex)} className="w-full flex items-center justify-between p-3 bg-card hover:bg-primary/10 border border-border rounded-xl transition-all group">
                                       <span className="text-[10px] font-black uppercase text-foreground group-hover:text-primary">{ex.name}</span>
                                       <Plus className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100" />
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-12 pt-8 border-t border-border flex justify-end gap-4">
                  <button type="button" onClick={onClose} className="px-10 py-5 bg-secondary text-foreground rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">Abort Architecture</button>
                  <button type="submit" disabled={saving} className="px-12 py-5 bg-primary text-primary-foreground rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
                     {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     Commit Template
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
