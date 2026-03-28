'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { ArrowLeft, Play, Check, RefreshCw, MessageSquare } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Slider from '@radix-ui/react-slider';
import { useParams } from 'next/navigation';

type SetRecord = { reps: string; weight: string; completed: boolean; skipped: boolean; };

export default function RoutineExecution() {
  const { id } = useParams();
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [setsData, setSetsData] = useState<Record<number, SetRecord[]>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [difficulty, setDifficulty] = useState<Record<number, number[]>>({});
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedSwapIndex, setSelectedSwapIndex] = useState<number | null>(null);

  // Mock exercise data
  const exercises = [
    {
      id: 1,
      name: 'Barbell Squat',
      sets: 4,
      reps: '8-10',
      rest: '90s',
      tempo: '3-1-1',
      warmupSets: 2,
      muscles: 'Quadriceps, Glutes',
      goal: 'Strength Building',
      video: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMHdvcmtvdXQlMjByb3V0aW5lfGVufDF8fHx8MTc3NDYzNTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      instructions: 'Stand with feet shoulder-width apart. Lower your body by bending knees and hips. Keep chest up and back straight.',
    },
    {
      id: 2,
      name: 'Push-ups',
      sets: 3,
      reps: '12-15',
      rest: '60s',
      tempo: '2-0-2',
      warmupSets: 1,
      muscles: 'Chest, Triceps, Shoulders',
      goal: 'Upper Body Strength',
      video: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMHdvcmtvdXQlMjByb3V0aW5lfGVufDF8fHx8MTc3NDYzNTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      instructions: 'Start in plank position. Lower body until chest nearly touches floor. Push back up to starting position.',
    },
  ];

  const [exercisesData, setExercisesData] = useState(exercises);
  const exercise = exercisesData[currentExercise];

  // Initialize or get current sets
  const currentSets = setsData[currentExercise] || Array.from({ length: exercise.sets }).map(() => ({ reps: '', weight: '', completed: false, skipped: false }));

  const updateSet = (setIndex: number, field: keyof SetRecord, value: any) => {
    const newSets = [...currentSets];
    newSets[setIndex] = { ...newSets[setIndex], [field]: value };
    setSetsData({ ...setsData, [currentExercise]: newSets });
  };

  const completeSet = (setIndex: number) => {
    updateSet(setIndex, 'completed', true);
  };

  const skipSet = (setIndex: number) => {
    updateSet(setIndex, 'skipped', true);
  };

  const allSetsCompleted = () => {
    return currentSets.filter(s => s.completed || s.skipped).length === exercise.sets;
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Routine complete
      router.push('/home');
    }
  };

  const applySwap = () => {
    if (selectedSwapIndex !== null) {
      const altNames = ['Goblet Squat', 'Leg Press', 'Bulgarian Split Squat'];
      const newExercises = [...exercisesData];
      newExercises[currentExercise] = { 
        ...newExercises[currentExercise], 
        name: `${altNames[selectedSwapIndex]} (Swapped)` 
      };
      setExercisesData(newExercises);
      setShowSwapModal(false);
      setSelectedSwapIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
      <Header />

      <div className="pt-20 pb-12">
        {/* Top Bar */}
        <div className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push('/home')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                Exit Routine
              </button>
              <span className="text-gray-600 dark:text-gray-400">
                Exercise {currentExercise + 1} of {exercises.length}
              </span>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Exercise Video/Image */}
          <div className="mb-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0f0f0f] mb-4">
              <img
                src={exercise.video}
                alt={exercise.name}
                className="w-full h-full object-cover opacity-60"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                <div className="w-20 h-20 rounded-full bg-[#6dccc4] flex items-center justify-center">
                  <Play className="w-10 h-10 text-[#1a1a1a] ml-1" fill="#1a1a1a" />
                </div>
              </button>
            </div>

            <h1 className="text-4xl mb-2">{exercise.name}</h1>
            <p className="text-gray-400">{exercise.instructions}</p>
          </div>

          {/* Exercise Details */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">SETS</p>
              <p className="text-2xl text-[#6dccc4]">{exercise.sets}</p>
            </div>
            <div className="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">REPS</p>
              <p className="text-2xl text-[#6dccc4]">{exercise.reps}</p>
            </div>
            <div className="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">REST</p>
              <p className="text-2xl text-[#6dccc4]">{exercise.rest}</p>
            </div>
            <div className="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">TEMPO</p>
              <p className="text-2xl text-[#6dccc4]">{exercise.tempo}</p>
            </div>
            <div className="bg-[#0f0f0f] rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">WU.S</p>
              <p className="text-2xl text-[#6dccc4]">{exercise.warmupSets}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#0f0f0f] rounded-lg p-6 border border-white/10 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">TARGET MUSCLES</p>
                <p className="text-lg">{exercise.muscles}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">GOAL</p>
                <p className="text-lg">{exercise.goal}</p>
              </div>
            </div>
          </div>

          {/* Set Tracking */}
          <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-2xl mb-4">Track Your Sets</h2>
            <div className="space-y-4">
              {currentSets.map((setData, index) => {
                const isLocked = index > 0 && !currentSets[index - 1].completed && !currentSets[index - 1].skipped;
                const isFinished = setData.completed || setData.skipped;

                return (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border transition-all ${
                      isLocked ? 'opacity-40 cursor-not-allowed bg-[#1a1a1a]/50 border-white/5' : 
                      isFinished ? 'bg-[#1a1a1a] border-[#6dccc4]/30' : 'bg-[#1a1a1a] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto min-w-[120px]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0f0f0f] flex items-center justify-center text-gray-400 font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-400 text-sm">Target: {exercise.reps} reps</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Reps"
                          value={setData.reps}
                          onChange={(e) => updateSet(index, 'reps', e.target.value)}
                          disabled={isLocked || isFinished}
                          className="w-full px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Weight (lbs)"
                          value={setData.weight}
                          onChange={(e) => updateSet(index, 'weight', e.target.value)}
                          disabled={isLocked || isFinished}
                          className="w-full px-3 py-2 bg-[#0f0f0f] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
                      {isFinished ? (
                        <div className="flex items-center gap-2 px-3 py-2 border border-[#6dccc4]/30 rounded-lg text-[#6dccc4]">
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-medium">{setData.completed ? 'Completed' : 'Skipped'}</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => skipSet(index)}
                            disabled={isLocked}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors disabled:cursor-not-allowed"
                          >
                            Skip
                          </button>
                          <button
                            onClick={() => completeSet(index)}
                            disabled={isLocked || !setData.reps || !setData.weight}
                            className="px-4 py-2 bg-[#6dccc4] text-[#1a1a1a] text-sm font-medium rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Mark Done
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-white/10 mb-8">
            <label className="flex items-center gap-2 text-lg mb-3">
              <MessageSquare className="w-5 h-5 text-[#6dccc4]" />
              Exercise Notes
            </label>
            <textarea
              value={notes[currentExercise] || ''}
              onChange={(e) => setNotes({ ...notes, [currentExercise]: e.target.value })}
              placeholder="How did this exercise feel? Any pain or discomfort?"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
              rows={3}
            />
          </div>

          {/* Difficulty Rating */}
          <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-white/10 mb-8">
            <label className="block text-lg mb-4">
              Difficulty: {['Easy', 'Moderate', 'Hard', 'Very Hard'][difficulty[currentExercise]?.[0] - 1 || 1]}
            </label>
            <Slider.Root
              value={difficulty[currentExercise] || [2]}
              onValueChange={(value) => setDifficulty({ ...difficulty, [currentExercise]: value })}
              max={4}
              min={1}
              step={1}
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <Slider.Track className="bg-white/10 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-[#6dccc4] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-[#6dccc4] rounded-full hover:bg-[#5fbbb3] focus:outline-none focus:ring-2 focus:ring-[#6dccc4]"
                aria-label="Difficulty"
              />
            </Slider.Root>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowSwapModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Swap Exercise
            </button>

            <button
              onClick={handleNextExercise}
              disabled={!allSetsCompleted()}
              className="flex-1 px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentExercise < exercises.length - 1 ? 'Next Exercise' : 'Complete Routine'}
            </button>
          </div>
        </div>
      </div>

      {/* Swap Exercise Modal */}
      <Dialog.Root open={showSwapModal} onOpenChange={setShowSwapModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto z-50">
            <Dialog.Title className="text-2xl mb-4">Swap Exercise</Dialog.Title>
            <Dialog.Description className="text-gray-400 mb-6">
              Choose an alternative exercise to replace {exercise.name}
            </Dialog.Description>

            <div className="space-y-3 mb-6">
              {['Goblet Squat', 'Leg Press', 'Bulgarian Split Squat'].map((alt, i) => (
                <button
                  key={alt}
                  onClick={() => setSelectedSwapIndex(i)}
                  className={`w-full p-4 bg-[#1a1a1a] rounded-lg border transition-colors text-left ${selectedSwapIndex === i ? 'border-[#6dccc4]' : 'border-white/10 hover:border-[#6dccc4]/50'}`}
                >
                  <p className="font-medium mb-1 flex items-center justify-between">
                    {alt}
                    {selectedSwapIndex === i && <Check className="w-4 h-4 text-[#6dccc4]" />}
                  </p>
                  <p className="text-sm text-gray-400">Similar muscle groups, adjusted difficulty</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => { setShowSwapModal(false); setSelectedSwapIndex(null); }}
                className="flex-1 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={applySwap}
                disabled={selectedSwapIndex === null}
                className="flex-1 px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply for Today
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}