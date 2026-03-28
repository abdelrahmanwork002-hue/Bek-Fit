import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Play, Filter } from 'lucide-react';

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

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Push-ups',
      bodyArea: 'Chest',
      equipment: 'None',
      difficulty: 'Beginner',
      duration: '30s',
      sets: '3',
      reps: '10-15',
      videoUrl: 'https://youtube.com/example',
      description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
      usedInPlans: 42
    },
    {
      id: '2',
      name: 'Dumbbell Press',
      bodyArea: 'Chest',
      equipment: 'Dumbbells',
      difficulty: 'Intermediate',
      duration: '45s',
      sets: '4',
      reps: '8-12',
      videoUrl: 'https://youtube.com/example',
      description: 'Chest exercise using dumbbells for controlled movement',
      usedInPlans: 28
    },
    {
      id: '3',
      name: 'Bodyweight Squat',
      bodyArea: 'Legs',
      equipment: 'None',
      difficulty: 'Beginner',
      duration: '40s',
      sets: '3',
      reps: '12-15',
      videoUrl: 'https://youtube.com/example',
      description: 'Fundamental lower body exercise targeting quads and glutes',
      usedInPlans: 56
    },
    {
      id: '4',
      name: 'Plank Hold',
      bodyArea: 'Core',
      equipment: 'None',
      difficulty: 'Beginner',
      duration: '60s',
      sets: '3',
      reps: '1',
      videoUrl: 'https://youtube.com/example',
      description: 'Core stability exercise building endurance',
      usedInPlans: 67
    },
    {
      id: '5',
      name: 'Deadlift',
      bodyArea: 'Back',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      duration: '60s',
      sets: '5',
      reps: '5',
      videoUrl: 'https://youtube.com/example',
      description: 'Compound exercise targeting posterior chain',
      usedInPlans: 34
    },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBodyArea = filterBodyArea === 'all' || exercise.bodyArea === filterBodyArea;
    const matchesDifficulty = filterDifficulty === 'all' || exercise.difficulty === filterDifficulty;
    return matchesSearch && matchesBodyArea && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Exercise Library</h2>
          <p className="text-gray-600 mt-1">Manage exercises, substitutions, and categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Exercise
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterBodyArea}
            onChange={(e) => setFilterBodyArea(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Body Areas</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Core">Core</option>
            <option value="Arms">Arms</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exercise
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Body Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sets/Reps
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Used In Plans
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExercises.map((exercise) => (
              <tr key={exercise.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <p className="text-sm text-gray-500">{exercise.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{exercise.bodyArea}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{exercise.equipment}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      exercise.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-700'
                        : exercise.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {exercise.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {exercise.sets} × {exercise.reps}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{exercise.usedInPlans}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add New Exercise</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Push-ups"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the exercise..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Area
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Chest</option>
                    <option>Back</option>
                    <option>Legs</option>
                    <option>Core</option>
                    <option>Arms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Dumbbells"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10-15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30s"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
