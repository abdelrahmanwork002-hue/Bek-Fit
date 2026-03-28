import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  goal: string;
  onboardingComplete: boolean;
  planStatus: 'active' | 'inactive';
  paymentStatus: 'active' | 'pending' | 'expired';
  lastActivity: string;
  joinDate: string;
  age?: number;
  painAreas?: string[];
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [filterPlanStatus, setFilterPlanStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      goal: 'Weight Loss',
      onboardingComplete: true,
      planStatus: 'active',
      paymentStatus: 'active',
      lastActivity: '2 hours ago',
      joinDate: '2026-03-15',
      age: 32,
      painAreas: ['Lower Back']
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      goal: 'Muscle Gain',
      onboardingComplete: true,
      planStatus: 'active',
      paymentStatus: 'pending',
      lastActivity: '1 day ago',
      joinDate: '2026-03-20',
      age: 28
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      goal: 'Pain Management',
      onboardingComplete: false,
      planStatus: 'inactive',
      paymentStatus: 'expired',
      lastActivity: '5 days ago',
      joinDate: '2026-02-10',
      age: 45,
      painAreas: ['Neck', 'Shoulders']
    },
    {
      id: '4',
      name: 'James Martinez',
      email: 'james.m@email.com',
      goal: 'General Fitness',
      onboardingComplete: true,
      planStatus: 'active',
      paymentStatus: 'active',
      lastActivity: '30 min ago',
      joinDate: '2026-03-25',
      age: 35
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      goal: 'Strength Training',
      onboardingComplete: true,
      planStatus: 'inactive',
      paymentStatus: 'pending',
      lastActivity: '3 hours ago',
      joinDate: '2026-03-18',
      age: 29
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = filterPaymentStatus === 'all' || user.paymentStatus === filterPaymentStatus;
    const matchesPlan = filterPlanStatus === 'all' || user.planStatus === filterPlanStatus;
    return matchesSearch && matchesPayment && matchesPlan;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">Manage users, verify payments, and oversee programs</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterPaymentStatus}
            onChange={(e) => setFilterPaymentStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Payment Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>

          <select
            value={filterPlanStatus}
            onChange={(e) => setFilterPlanStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Plan Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Active Plans</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {users.filter(u => u.planStatus === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Pending Payments</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {users.filter(u => u.paymentStatus === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Onboarding Complete</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {users.filter(u => u.onboardingComplete).length}
          </p>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Goal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Onboarding
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.goal}</td>
                <td className="px-6 py-4">
                  {user.onboardingComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.planStatus === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.planStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.paymentStatus === 'active'
                        ? 'bg-green-100 text-green-700'
                        : user.paymentStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.lastActivity}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Goal</p>
                    <p className="text-gray-900">{selectedUser.goal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="text-gray-900">{selectedUser.age || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Activity</p>
                    <p className="text-gray-900">{selectedUser.lastActivity}</p>
                  </div>
                </div>
                {selectedUser.painAreas && selectedUser.painAreas.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Pain Areas</p>
                    <div className="flex gap-2">
                      {selectedUser.painAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Section */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment Status</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Status</p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {selectedUser.paymentStatus}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Mark as Paid
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Revoke Access
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-2">Payment Receipt</p>
                    <div className="bg-gray-100 rounded h-32 flex items-center justify-center">
                      <p className="text-gray-500">No receipt uploaded</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Plan Information</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Plan Status</p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {selectedUser.planStatus}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Plan
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">Completed workout: Day 5</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">Logged in to dashboard</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">Updated profile information</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
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
