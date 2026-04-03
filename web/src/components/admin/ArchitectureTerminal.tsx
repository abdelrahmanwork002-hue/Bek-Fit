'use client';
import { useState, useEffect, useCallback } from 'react';
import { 
  Dumbbell, Search, Plus, Save, ArrowLeft, 
  Trash2, Layout, Layers, ChevronDown, 
  Activity, Loader2, GripVertical, Check, X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useSearchParams, useRouter } from 'next/navigation';

interface Exercise {
  id: string;
  name: string;
  category: string;
  target_muscles: string[];
  equipment: string;
}

interface RoutineExercise {
  id: string;
  exercise_id: string;
  name: string;
  sets: number;
  reps: number;
  order_index: number;
}

interface Routine {
  id: string;
  day_number: number;
  title: string;
  exercises: RoutineExercise[];
}

export function ArchitectureTerminal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('userId');
  const planId = searchParams.get('planId');
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState('');
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const fetchExercises = useCallback(async () => {
    const { data, error } = await supabase.from('exercises').select('*').eq('status', 'Active');
    if (data) {
      setAllExercises(data.map(ex => ({
        id: ex.id,
        name: ex.title,
        category: ex.category || 'Gym',
        target_muscles: ex.target_muscles || [],
        equipment: ex.equipment || 'None'
      })));
    }
  }, [supabase]);

  const fetchPlanData = useCallback(async () => {
    if (!planId) return;
    const { data: planRoutines, error } = await supabase
      .from('routines')
      .select(`
        id, day_number, title,
        routine_exercises (
          id, exercise_id, sets, reps, order_index,
          exercises ( title )
        )
      `)
      .eq('plan_id', planId)
      .order('day_number', { ascending: true });

    if (planRoutines) {
      const formatted = planRoutines.map((r: any) => ({
        id: r.id,
        day_number: r.day_number,
        title: r.title,
        exercises: r.routine_exercises.map((re: any) => ({
          id: re.id,
          exercise_id: re.exercise_id,
          name: re.exercises?.title || 'Unknown Movement',
          sets: re.sets,
          reps: re.reps,
          order_index: re.order_index
        })).sort((a: any, b: any) => a.order_index - b.order_index)
      }));
      setRoutines(formatted);
    }
  }, [planId, supabase]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      await Promise.all([fetchExercises(), fetchPlanData()]);
      if (userId) {
        const { data: user } = await supabase.from('users').select('full_name').eq('id', userId).single();
        if (user) setUserName(user.full_name);
      }
      setLoading(false);
    }
    init();
  }, [userId, planId, fetchExercises, fetchPlanData, supabase]);

  const addDay = () => {
    const newDay: Routine = {
       id: `temp-${Date.now()}`,
       day_number: routines.length + 1,
       title: `Session ${routines.length + 1}`,
       exercises: []
    };
    setRoutines([...routines, newDay]);
    setActiveDayIndex(routines.length);
  };

  const removeDay = (id: string) => {
    setRoutines(routines.filter(r => r.id !== id));
    if (activeDayIndex >= routines.length - 1) setActiveDayIndex(Math.max(0, routines.length - 2));
  };

  const addExerciseToDay = (ex: Exercise) => {
    const activeDay = routines[activeDayIndex];
    if (!activeDay) return;

    const newRoutineEx: RoutineExercise = {
      id: `temp-ex-${Date.now()}`,
      exercise_id: ex.id,
      name: ex.name,
      sets: 3,
      reps: 12,
      order_index: activeDay.exercises.length
    };

    const updatedRoutines = [...routines];
    updatedRoutines[activeDayIndex] = {
      ...activeDay,
      exercises: [...activeDay.exercises, newRoutineEx]
    };
    setRoutines(updatedRoutines);
  };

  const removeExerciseFromDay = (routineExId: string) => {
    const updatedRoutines = [...routines];
    updatedRoutines[activeDayIndex] = {
      ...updatedRoutines[activeDayIndex],
      exercises: updatedRoutines[activeDayIndex].exercises.filter(ex => ex.id !== routineExId)
    };
    setRoutines(updatedRoutines);
  };

  const updateExDetails = (routineExId: string, sets: number, reps: number) => {
    const updatedRoutines = [...routines];
    updatedRoutines[activeDayIndex] = {
      ...updatedRoutines[activeDayIndex],
      exercises: updatedRoutines[activeDayIndex].exercises.map(ex => 
        ex.id === routineExId ? { ...ex, sets, reps } : ex
      )
    };
    setRoutines(updatedRoutines);
  };

  const handleSave = async () => {
    if (!planId) return;
    setSaving(true);
    try {
      // 1. Delete existing/old routines for this plan (or update intelligently)
      // Safety: For this MVP override, we'll replace the architecture.
      await supabase.from('routines').delete().eq('plan_id', planId);

      for (const rout of routines) {
        const { data: newRout, error: routErr } = await supabase
          .from('routines')
          .insert({
            plan_id: planId,
            day_number: rout.day_number,
            title: rout.title
          })
          .select()
          .single();

        if (newRout) {
          const exercisesToInsert = rout.exercises.map((ex, idx) => ({
             routine_id: newRout.id,
             exercise_id: ex.exercise_id,
             sets: ex.sets,
             reps: ex.reps,
             order_index: idx
          }));
          if (exercisesToInsert.length > 0) {
            await supabase.from('routine_exercises').insert(exercisesToInsert);
          }
        }
      }
      toast.success('Architecture finalized and committed to secure storage.');
    } catch (err) {
      toast.error('Sync failure during architecture commit.');
    } finally {
      setSaving(false);
    }
  };

  const filteredExercises = allExercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
     <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Linking with AI Architecture...</p>
     </div>
  );

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
           <p className="text-muted-foreground font-medium">Overriding protocol for: <span className="text-primary font-black uppercase">{userName || 'Active Patient'}</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Commit Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          {/* Day Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
             {routines.map((r, idx) => (
                <button 
                  key={r.id}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`flex-shrink-0 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                     activeDayIndex === idx 
                        ? 'bg-primary text-primary-foreground shadow-lg border-primary shadow-primary/20' 
                        : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                   {r.title}
                </button>
             ))}
             <button 
               onClick={addDay}
               className="flex-shrink-0 p-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
             >
                <Plus className="w-5 h-5" />
             </button>
          </div>

          {/* Active Day Content */}
          <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg text-primary font-black text-xs">
                      #{activeDayIndex + 1}
                   </div>
                   <input 
                      value={routines[activeDayIndex]?.title || ''}
                      onChange={(e) => {
                         const updated = [...routines];
                         updated[activeDayIndex].title = e.target.value;
                         setRoutines(updated);
                      }}
                      className="bg-transparent border-none p-0 text-sm font-black uppercase tracking-widest text-foreground focus:ring-0 w-48"
                   />
                </div>
                {routines.length > 0 && (
                   <button onClick={() => removeDay(routines[activeDayIndex].id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                   </button>
                )}
             </div>

             <div className="space-y-4">
                {routines[activeDayIndex]?.exercises.length === 0 && (
                   <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
                      <Layout className="w-12 h-12 mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Protocol Empty</p>
                      <p className="text-[8px] font-bold uppercase mt-2">Append modules from the registry on the right</p>
                   </div>
                )}
                {routines[activeDayIndex]?.exercises.map((ex, i) => (
                  <div key={ex.id} className="group relative bg-secondary/20 rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <GripVertical className="w-4 h-4 text-muted-foreground/30 cursor-grab" />
                        <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all font-black text-xs">
                           0{i+1}
                        </div>
                        <div>
                           <p className="text-sm font-black text-foreground uppercase tracking-tight">{ex.name}</p>
                           <p className="text-[8px] font-black text-muted-foreground uppercase mt-1 opacity-60">Intensity Protocol Required</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-1">
                           <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Sets</label>
                           <input 
                              type="number" 
                              value={ex.sets}
                              onChange={(e) => updateExDetails(ex.id, parseInt(e.target.value), ex.reps)}
                              className="w-12 bg-card border border-border rounded-lg p-1 text-center text-xs font-black text-foreground"
                           />
                        </div>
                        <div className="flex flex-col gap-1">
                           <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Reps</label>
                           <input 
                              type="number" 
                              value={ex.reps}
                              onChange={(e) => updateExDetails(ex.id, ex.sets, parseInt(e.target.value))}
                              className="w-12 bg-card border border-border rounded-lg p-1 text-center text-xs font-black text-foreground"
                           />
                        </div>
                        <button onClick={() => removeExerciseFromDay(ex.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                           <X className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-card rounded-3xl border border-border p-8 shadow-sm flex flex-col h-full max-h-[800px] sticky top-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2 mb-6">
                 <Dumbbell className="w-4 h-4 text-primary" />
                 Movement Registry
              </h3>
              
              <div className="relative group mb-6">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search library..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-xs font-bold"
                 />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                 {filteredExercises.map(ex => (
                   <div 
                      key={ex.id} 
                      onClick={() => addExerciseToDay(ex)}
                      className="p-4 bg-secondary/20 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer group flex items-center justify-between"
                   >
                      <div>
                         <p className="text-[10px] font-black text-foreground uppercase tracking-tight">{ex.name}</p>
                         <p className="text-[8px] font-bold text-muted-foreground uppercase opacity-60 mt-1">{ex.category}</p>
                      </div>
                      <Plus className="w-4 h-4 text-primary opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
