import { useState } from 'react';
import { Plus, Copy, Edit2, Archive, Eye } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  goal: string;
  difficulty: string;
  duration: string;
  equipment: string[];
  description: string;
  workoutsPerWeek: number;
  status: 'active' | 'archived';
  usageCount: number;
  lastModified: string;
}

export function PlanTemplates() {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const templates: Template[] = [
    {
      id: '1',
      name: 'Acute Neck Pain Relief',
      goal: 'Pain Management',
      difficulty: 'Beginner',
      duration: '4 weeks',
      equipment: ['None'],
      description: 'Gentle mobility and strengthening exercises for acute neck pain',
      workoutsPerWeek: 3,
      status: 'active',
      usageCount: 24,
      lastModified: '2026-03-20'
    },
    {
      id: '2',
      name: 'Chronic Lower Back Program',
      goal: 'Pain Management',
      difficulty: 'Beginner',
      duration: '8 weeks',
      equipment: ['None', 'Resistance Band'],
      description: 'Progressive program for managing chronic lower back pain',
      workoutsPerWeek: 4,
      status: 'active',
      usageCount: 42,
      lastModified: '2026-03-18'
    },
    {
      id: '3',
      name: 'Beginner Strength Foundation',
      goal: 'Strength Training',
      difficulty: 'Beginner',
      duration: '12 weeks',
      equipment: ['Dumbbells', 'Bench'],
      description: 'Build a solid strength foundation with fundamental movements',
      workoutsPerWeek: 3,
      status: 'active',
      usageCount: 56,
      lastModified: '2026-03-15'
    },
    {
      id: '4',
      name: 'Advanced Powerlifting',
      goal: 'Strength Training',
      difficulty: 'Advanced',
      duration: '16 weeks',
      equipment: ['Barbell', 'Squat Rack', 'Bench'],
      description: 'Competition-prep program for experienced lifters',
      workoutsPerWeek: 5,
      status: 'active',
      usageCount: 12,
      lastModified: '2026-03-10'
    },
    {
      id: '5',
      name: 'Weight Loss Kickstart',
      goal: 'Weight Loss',
      difficulty: 'Beginner',
      duration: '8 weeks',
      equipment: ['None'],
      description: 'Bodyweight-focused program for sustainable weight loss',
      workoutsPerWeek: 4,
      status: 'active',
      usageCount: 67,
      lastModified: '2026-03-05'
    },
    {
      id: '6',
      name: 'Old Shoulder Rehab',
      goal: 'Pain Management',
      difficulty: 'Beginner',
      duration: '6 weeks',
      equipment: ['Resistance Band'],
      description: 'Archived template - replaced with newer version',
      workoutsPerWeek: 3,
      status: 'archived',
      usageCount: 18,
      lastModified: '2026-01-15'
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesDifficulty = filterDifficulty === 'all' || template.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    return matchesDifficulty && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Plan Templates</h2>
          <p className="text-gray-600 mt-1">Create and manage pre-built workout plans</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active Templates</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {templates.filter(t => t.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Usage</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {templates.reduce((sum, t) => sum + t.usageCount, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Most Popular</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">Weight Loss Kickstart</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Archived</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {templates.filter(t => t.status === 'archived').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  template.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {template.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{template.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Goal</span>
                <span className="text-gray-900 font-medium">{template.goal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Difficulty</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    template.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-700'
                      : template.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {template.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="text-gray-900 font-medium">{template.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Frequency</span>
                <span className="text-gray-900 font-medium">{template.workoutsPerWeek}x/week</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Times Used</span>
                <span className="text-gray-900 font-medium">{template.usageCount}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">Equipment</p>
              <div className="flex flex-wrap gap-1">
                {template.equipment.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Last modified: {template.lastModified}
            </p>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Copy className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Create New Template</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Beginner Strength Foundation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the template and its purpose..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Weight Loss</option>
                    <option>Muscle Gain</option>
                    <option>Strength Training</option>
                    <option>Pain Management</option>
                    <option>General Fitness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (weeks)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workouts per Week
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Equipment
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Dumbbells, Resistance Band"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
