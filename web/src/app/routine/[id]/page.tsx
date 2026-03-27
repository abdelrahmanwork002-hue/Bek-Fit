'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { ArrowLeft, Play, Check, RefreshCw, MessageSquare, ChevronRight, Info } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Slider from '@radix-ui/react-slider'
import Image from 'next/image'

export default function RoutineExecutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [currentExercise, setCurrentExercise] = useState(0)
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({})
  const [notes, setNotes] = useState<Record<number, string>>({})
  const [difficulty, setDifficulty] = useState<Record<number, number[]>>({})
  const [showSwapModal, setShowSwapModal] = useState(false)

  // Mock exercise data (aligned with schema)
  const exercises = [
    {
      id: 1,
      name: 'Barbell Squat',
      sets: 4,
      reps: '8-10',
      rest: '90s',
      tempo: '3-1-1',
      muscles: 'Quadriceps, Glutes',
      instructions: 'Stand with feet shoulder-width apart. Lower your body by bending knees and hips. Keep chest up and back straight.',
      video: 'https://images.unsplash.com/photo-1574680094895-01b811403525?q=80&w=1000'
    },
    {
      id: 2,
      name: 'Push-ups',
      sets: 3,
      reps: '12-15',
      rest: '60s',
      tempo: '2-0-2',
      muscles: 'Chest, Triceps, Shoulders',
      instructions: 'Start in plank position. Lower body until chest nearly touches floor. Push back up to starting position.',
      video: 'https://images.unsplash.com/photo-1598971639058-aba3c393bcaf?q=80&w=1000'
    }
  ]

  const exercise = exercises[currentExercise]

  const toggleSet = (exerciseIndex: number, setIndex: number) => {
    const current = completedSets[exerciseIndex] || []
    const newSets = [...current]
    newSets[setIndex] = !newSets[setIndex]
    setCompletedSets({ ...completedSets, [exerciseIndex]: newSets })
  }

  const allSetsCompleted = () => {
    const sets = completedSets[currentExercise] || []
    return sets.filter(Boolean).length === exercise.sets
  }

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-20 pb-12">
        {/* Navigation Bar */}
        <div className="border-b border-border bg-card sticky top-16 z-10 transition-shadow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Exit
              </button>
              <div className="text-center font-bold">
                 <span className="text-primary">{currentExercise + 1}</span>
                 <span className="text-muted-foreground mx-1">/</span>
                 <span className="text-muted-foreground">{exercises.length}</span>
              </div>
              <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                 <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Media Header */}
          <div className="mb-10 group">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-muted mb-6 shadow-2xl border border-border">
              <Image
                src={exercise.video}
                alt={exercise.name}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] hover:bg-black/20 transition-all">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/20 scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-10 h-10 ml-1" fill="currentColor" />
                </div>
              </button>
            </div>

            <div className="flex items-start justify-between mb-4">
               <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2">{exercise.name}</h1>
                  <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">
                     {exercise.instructions}
                  </p>
               </div>
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 font-sans">Sets</p>
              <p className="text-3xl font-black text-primary leading-none">{exercise.sets}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 font-sans">Reps</p>
              <p className="text-3xl font-black text-primary leading-none">{exercise.reps}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 font-sans">Rest</p>
              <p className="text-3xl font-black text-primary leading-none">{exercise.rest}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 border border-border flex flex-col items-center justify-center shadow-sm">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 font-sans">Tempo</p>
              <p className="text-3xl font-black text-primary leading-none">{exercise.tempo}</p>
            </div>
          </div>

          {/* Set Tracking Interface */}
          <div className="bg-card rounded-[2rem] p-8 border border-border mb-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Track Your Performance</h2>
            <div className="grid grid-cols-1 gap-3">
              {Array.from({ length: exercise.sets }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => toggleSet(currentExercise, index)}
                  className={`flex items-center gap-6 p-5 rounded-2xl border-2 transition-all duration-200 group ${
                    completedSets[currentExercise]?.[index]
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-border/80 bg-muted/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                    completedSets[currentExercise]?.[index]
                      ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                      : 'border-border bg-background'
                  }`}>
                    {completedSets[currentExercise]?.[index] ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : (
                      <span className="text-sm font-black text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                     <p className="font-bold text-lg">Set {index + 1}</p>
                     <p className="text-sm text-muted-foreground font-medium">{exercise.reps} reps target</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                     completedSets[currentExercise]?.[index] ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                     {completedSets[currentExercise]?.[index] ? 'Completed' : 'Pending'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6 mb-12">
            <div className="bg-card rounded-2xl p-6 border border-border">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Performance Notes
                </label>
                <textarea
                  value={notes[currentExercise] || ''}
                  onChange={(e) => setNotes({ ...notes, [currentExercise]: e.target.value })}
                  placeholder="How did this weight feel? Any pain points?"
                  className="w-full px-5 py-4 bg-muted/30 border border-border rounded-xl focus:border-primary focus:outline-none transition-colors min-h-[100px]"
                />
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
                <label className="block text-sm font-bold uppercase tracking-wider mb-6">
                  Intensitiy Rating: <span className="text-primary">{['Low', 'Optimal', 'High', 'Extreme'][difficulty[currentExercise]?.[0] - 1 || 1]}</span>
                </label>
                <Slider.Root
                  value={difficulty[currentExercise] || [2]}
                  onValueChange={(value) => setDifficulty({ ...difficulty, [currentExercise]: value })}
                  max={4}
                  min={1}
                  step={1}
                  className="relative flex items-center select-none touch-none w-full h-5"
                >
                  <Slider.Track className="bg-muted relative grow rounded-full h-2">
                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-6 h-6 bg-primary rounded-full shadow-lg hover:scale-110 focus:outline-none transition-transform"
                    aria-label="Intensity"
                  />
                </Slider.Root>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-4 sticky bottom-4">
            <button
              onClick={() => setShowSwapModal(true)}
              className="px-8 py-5 border-2 border-border bg-card rounded-2xl font-bold hover:bg-muted transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <RefreshCw className="w-5 h-5 text-primary" />
              Swap
            </button>

            <button
              onClick={handleNextExercise}
              disabled={!allSetsCompleted()}
              className="flex-1 px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 active:scale-95 duration-200"
            >
              {currentExercise < exercises.length - 1 ? 'Next Exercise' : 'Finish Session'}
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      {/* Exercise Swap Dialog */}
      <Dialog.Root open={showSwapModal} onOpenChange={setShowSwapModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-300" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl z-50 animate-in zoom-in-95 duration-300">
            <Dialog.Title className="text-3xl font-black mb-2">Adjust Routine</Dialog.Title>
            <Dialog.Description className="text-muted-foreground mb-8 text-lg">
              Swap <span className="text-foreground font-bold">{exercise.name}</span> for an alternative that targets similar muscle groups.
            </Dialog.Description>

            <div className="grid grid-cols-1 gap-3 mb-10">
              {['Goblet Squat', 'Leg Press', 'Manual Form Check'].map((alt) => (
                <button
                  key={alt}
                  className="w-full p-5 bg-muted/30 rounded-2xl border border-border hover:border-primary/50 hover:bg-muted transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-1">
                     <p className="font-bold text-lg group-hover:text-primary transition-colors">{alt}</p>
                     <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">AI Recommended: Lowers spinal load while maintaining quads activation.</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 px-6 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity">
                Swap This Set
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
