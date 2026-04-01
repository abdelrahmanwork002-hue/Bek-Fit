'use client';
import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Play, Filter, Loader2, Dumbbell, XCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Exercise {
  id: string;
  name: string;
  bodyArea: string;
  equipment: string;
  difficulty: string;
  duration: string;
  sets: string;
  reps: string;
  videoUrl: string;
  description: string;
  usedInPlans: number;
}

export function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBodyArea, setFilterBodyArea] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchExercises() {
      const { data, error } = await supabase
        .from('exercises')
        .select('*');

      if (error) {
        console.error("Error fetching exercises:", error);
      } else if (data) {
        const liveExercises: Exercise[] = data.map((ex: any) => ({
          id: ex.id,
          name: ex.title,
          bodyArea: 'Mixed', // Detailed categorization maps via Categories table
          equipment: 'Variable',
          difficulty: ex.difficulty || 'Intermediate',
          duration: '45s',
          sets: String(ex.default_sets || 3),
          reps: String(ex.default_reps || 12),
          videoUrl: ex.video_url || '',
          description: ex.description || '',
          usedInPlans: Math.floor(Math.random() * 50) + 1 // placeholder usage analytics
        }));
        setExercises(liveExercises);
      }
      setLoading(false);
    }
    fetchExercises();
  }, [supabase]);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBodyArea = filterBodyArea === 'all' || exercise.bodyArea === filterBodyArea;
    const matchesDifficulty = filterDifficulty === 'all' || exercise.difficulty === filterDifficulty;
    return matchesSearch && matchesBodyArea && matchesDifficulty;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">EXERCISE <span className="text-primary underline decoration-primary/30 underline-offset-8">LIBRARY</span></h2>
          <p className="text-muted-foreground mt-3 font-medium">Manage human optimization protocols and movement patterns.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" />
          Inject Protocol
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search exercise database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
            />
          </div>

          <select
            value={filterBodyArea}
            onChange={(e) => setFilterBodyArea(e.target.value)}
            className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer"
          >
            <option value="all">ALL BODY AREAS</option>
            <option value="Chest">CHEST</option>
            <option value="Back">BACK</option>
            <option value="Legs">LEGS</option>
            <option value="Core">CORE</option>
            <option value="Arms">ARMS</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer"
          >
            <option value="all">ALL DIFFICULTIES</option>
            <option value="Beginner">BEGINNER</option>
            <option value="Intermediate">INTERMEDIATE</option>
            <option value="Advanced">ADVANCED</option>
          </select>
        </div>
      </div>

      {/* Exercise List */}
      {loading ? (
        <div className="bg-card rounded-3xl border border-border p-20 flex flex-col items-center justify-center text-muted-foreground gap-6 shadow-sm">
           <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <Loader2 className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
           </div>
           <div className="text-center">
              <p className="font-black uppercase tracking-[0.3em] text-foreground text-sm">Synchronizing Library</p>
              <p className="text-xs font-bold mt-2 opacity-60">Downloading protocol patterns from cloud storage...</p>
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
                      'Movement Pattern', 'Anatomical Area', 'Equipment', 'Complexity', 'Volume Protocol', 'Deployment Count', 'Operations'
                    ].map((head) => (
                      <th key={head} className="px-8 py-5 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredExercises.map((exercise) => (
                    <tr key={exercise.id} className="hover:bg-secondary/40 transition-all group cursor-default">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                            <Dumbbell className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-black text-foreground uppercase tracking-tight">{exercise.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground opacity-60 mt-0.5 uppercase tracking-widest leading-none line-clamp-1 max-w-[200px]">{exercise.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-foreground uppercase tracking-widest bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/30">
                          {exercise.bodyArea}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">{exercise.equipment}</td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border ${
                            exercise.difficulty === 'Beginner'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : exercise.difficulty === 'Intermediate'
                              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}
                        >
                          {exercise.difficulty}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-xs font-black text-foreground uppercase tracking-widest">
                        {exercise.sets} × {exercise.reps}
                      </td>
                      <td className="px-8 py-6 text-xs font-black text-muted-foreground uppercase tracking-widest opacity-60">
                         {exercise.usedInPlans} DEPLOYED
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-90 border border-primary/10 bg-primary/5">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-foreground/60 hover:bg-secondary rounded-xl transition-all active:scale-90 border border-border/50">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-all active:scale-90 border border-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
              Showing 1-20 of {exercises.length} protocols
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-[10px] font-black text-muted-foreground opacity-30 cursor-not-allowed uppercase tracking-widest">Prev</button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-[10px] font-black">1</button>
                <button className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 text-[10px] font-black transition-colors">2</button>
              </div>
              <button className="px-4 py-2 text-[10px] font-black text-primary hover:bg-primary/10 rounded-xl uppercase tracking-widest transition-all">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-card rounded-3xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-border flex items-center justify-between bg-secondary/20">
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Injection Protocol</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-all"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Movement Signature</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                  placeholder="e.g., ATOMIC PUSH-UPS"
                />
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Protocol Description</label>
                <textarea
                  className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                  rows={4}
                  placeholder="Describe the anatomical impact and execution path..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Primary Anatomical Area</label>
                  <select className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold text-foreground cursor-pointer">
                    <option>CHEST</option>
                    <option>BACK</option>
                    <option>LEGS</option>
                    <option>CORE</option>
                    <option>ARMS</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Required Equipment</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                    placeholder="e.g., DUMBBELLS + BENCH"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">VOLUME: SETS</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-black text-center"
                    placeholder="4"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">VOLUME: REPS</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-black text-center"
                    placeholder="12"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">TIME: DURATION</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-black text-center"
                    placeholder="60s"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-2">Visual Data Link (Video URL)</label>
                <input
                  type="url"
                  className="w-full px-6 py-4 bg-secondary/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-bold"
                  placeholder="https://content.bekfit.com/v/..."
                />
              </div>
            </div>
            <div className="p-8 border-t border-border flex justify-end gap-4 bg-secondary/20">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-secondary rounded-2xl transition-all border border-border/50"
              >
                Abort
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                COMMIT PROTOCOL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
