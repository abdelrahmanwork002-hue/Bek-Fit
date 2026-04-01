'use client';
import { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, AlertTriangle, Edit2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface PendingPlan {
  id: string;
  userName: string;
  userEmail: string;
  goal: string;
  age: number;
  painAreas: string[];
  safetyFlags: string[];
  createdDate: string;
  status: 'pending' | 'approved' | 'rejected';
  planSummary: string;
  weekCount: number;
  workoutsPerWeek: number;
}

export function PlanApprovalQueue() {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedPlan, setSelectedPlan] = useState<PendingPlan | null>(null);

  const [plans, setPlans] = useState<PendingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchQueue() {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          full_name,
          email,
          created_at,
          profile_data,
          goals ( title ),
          plans ( is_active )
        `);
      
      if (!error && data) {
         const queue: PendingPlan[] = data.map((u: any) => {
            const profile = u.profile_data || {};
            let status: 'pending' | 'approved' | 'rejected' = 'pending';
            if (u.plans && u.plans.length > 0) {
              status = u.plans[0].is_active ? 'approved' : 'pending';
            }
            
            const flags: string[] = [];
            if (profile.age > 50) flags.push("Age 50+");
            if (profile.pain_areas && profile.pain_areas.length > 0) flags.push("Pain management flags");
            
            return {
              id: u.id,
              userName: u.full_name || 'Unnamed User',
              userEmail: u.email || 'No Email',
              goal: u.goals?.title || 'General Fitness',
              age: profile.age || 0,
              painAreas: profile.pain_areas || [],
              safetyFlags: flags,
              createdDate: new Date(u.created_at).toISOString().split('T')[0],
              status: status,
              planSummary: 'AI-generated progressive overload module pending review.',
              weekCount: 8,
              workoutsPerWeek: 3
            }
         });
         setPlans(queue);
      }
      setLoading(false);
    }
    fetchQueue();
  }, [supabase]);

  const filteredPlans = plans.filter(plan =>
    filterStatus === 'all' || plan.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Plan Approval Queue</h2>
          <p className="text-gray-600 mt-1">Review and approve AI-generated workout plans</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending Approval</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {plans.filter(p => p.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Approved Today</p>
          <p className="text-2xl font-semibold text-green-600 mt-1">
            {plans.filter(p => p.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Rejected Today</p>
          <p className="text-2xl font-semibold text-red-600 mt-1">0</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Safety Flags</p>
          <p className="text-2xl font-semibold text-yellow-600 mt-1">
            {plans.filter(p => p.safetyFlags.length > 0).length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Plan List */}
      {loading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 flex flex-col items-center justify-center text-gray-400">
           <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
           <p>Syncing AI Generation Queues...</p>
        </div>
      ) : (
      <div className="space-y-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{plan.userName}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      plan.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : plan.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {plan.status}
                  </span>
                  {plan.safetyFlags.length > 0 && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs">{plan.safetyFlags.length} safety flags</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{plan.userEmail}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Goal</p>
                    <p className="text-sm font-medium text-gray-900">{plan.goal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm font-medium text-gray-900">{plan.age}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900">{plan.weekCount} weeks</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Frequency</p>
                    <p className="text-sm font-medium text-gray-900">{plan.workoutsPerWeek}x/week</p>
                  </div>
                </div>

                {plan.painAreas.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Pain Areas</p>
                    <div className="flex gap-2">
                      {plan.painAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {plan.safetyFlags.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Safety Flags</p>
                    <div className="flex gap-2">
                      {plan.safetyFlags.map((flag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-700 mb-3">{plan.planSummary}</p>

                <p className="text-xs text-gray-500">Created: {plan.createdDate}</p>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Review
                </button>
                {plan.status === 'pending' && (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Review Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Plan Review: {selectedPlan.userName}
              </h3>
              <p className="text-gray-600">{selectedPlan.planSummary}</p>
            </div>
            <div className="p-6 space-y-6">
              {/* User Profile */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">User Profile</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="text-gray-900">{selectedPlan.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Goal</p>
                    <p className="text-gray-900">{selectedPlan.goal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{selectedPlan.userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Plan Structure */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Plan Structure</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Duration</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedPlan.weekCount} weeks
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Workouts per Week</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedPlan.workoutsPerWeek} sessions
                      </p>
                    </div>
                  </div>

                  {/* Sample Week */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Week 1 Sample</p>
                    <div className="space-y-2">
                      {['Monday', 'Wednesday', 'Friday'].map((day, index) => (
                        <div key={index} className="bg-white rounded border border-gray-200 p-3">
                          <p className="font-medium text-gray-900 mb-2">{day}</p>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Warm-up: 5 minutes</li>
                            <li>• Exercise 1: Push-ups - 3 sets × 10 reps</li>
                            <li>• Exercise 2: Bodyweight Squats - 3 sets × 12 reps</li>
                            <li>• Exercise 3: Plank Hold - 3 sets × 30s</li>
                            <li>• Cool-down: 5 minutes</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Review */}
              {selectedPlan.safetyFlags.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Safety Review Required</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <p className="font-medium text-yellow-900">Safety Flags Detected</p>
                    </div>
                    <ul className="space-y-1 ml-7">
                      {selectedPlan.safetyFlags.map((flag, index) => (
                        <li key={index} className="text-sm text-yellow-800">• {flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Edit Plan
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  Approve & Publish
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
