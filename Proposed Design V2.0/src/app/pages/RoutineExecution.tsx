import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header } from '../components/Header';
import { ArrowLeft, Play, Check, RefreshCw, MessageSquare } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Slider from '@radix-ui/react-slider';

export function RoutineExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [difficulty, setDifficulty] = useState<Record<number, number[]>>({});
  const [showSwapModal, setShowSwapModal] = useState(false);

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

  const exercise = exercises[currentExercise];

  const toggleSet = (exerciseIndex: number, setIndex: number) => {
    const current = completedSets[exerciseIndex] || [];
    const newSets = [...current];
    newSets[setIndex] = !newSets[setIndex];
    setCompletedSets({ ...completedSets, [exerciseIndex]: newSets });
  };

  const allSetsCompleted = () => {
    const sets = completedSets[currentExercise] || [];
    return sets.filter(Boolean).length === exercise.sets;
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Routine complete
      navigate('/home');
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
                onClick={() => navigate('/home')}
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
            <div className="space-y-3">
              {Array.from({ length: exercise.sets }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg"
                >
                  <button
                    onClick={() => toggleSet(currentExercise, index)}
                    className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      completedSets[currentExercise]?.[index]
                        ? 'border-[#6dccc4] bg-[#6dccc4]'
                        : 'border-white/20'
                    }`}
                  >
                    {completedSets[currentExercise]?.[index] && (
                      <Check className="w-5 h-5 text-[#1a1a1a]" />
                    )}
                  </button>
                  <span className="flex-1">Set {index + 1}</span>
                  <span className="text-gray-400">{exercise.reps} reps</span>
                </div>
              ))}
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
              {['Goblet Squat', 'Leg Press', 'Bulgarian Split Squat'].map((alt) => (
                <button
                  key={alt}
                  className="w-full p-4 bg-[#1a1a1a] rounded-lg border border-white/10 hover:border-[#6dccc4] transition-colors text-left"
                >
                  <p className="font-medium mb-1">{alt}</p>
                  <p className="text-sm text-gray-400">Similar muscle groups, adjusted difficulty</p>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors">
                Apply for Today
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}