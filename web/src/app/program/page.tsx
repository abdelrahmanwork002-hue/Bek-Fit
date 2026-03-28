'use client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Edit2, History } from 'lucide-react';

export default function ProgramCustomization() {
  const weeks = [
    {
      week: 1,
      days: [
        { day: 'Monday', exercises: ['Squats', 'Push-ups', 'Plank'], rest: false },
        { day: 'Tuesday', exercises: ['Deadlifts', 'Rows', 'Lunges'], rest: false },
        { day: 'Wednesday', exercises: [], rest: true },
        { day: 'Thursday', exercises: ['Bench Press', 'Shoulder Press'], rest: false },
        { day: 'Friday', exercises: ['Leg Press', 'Calf Raises'], rest: false },
        { day: 'Saturday', exercises: [], rest: true },
        { day: 'Sunday', exercises: [], rest: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl mb-2">Customize Your Program</h1>
              <p className="text-gray-400">Modify exercises, sets, reps, and rest days</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              <History className="w-5 h-5" />
              Version History
            </button>
          </div>

          {weeks.map((week) => (
            <div key={week.week} className="mb-8">
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#6dccc4]" />
                Week {week.week}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {week.days.map((dayPlan, index) => (
                  <div
                    key={index}
                    className={`bg-[#0f0f0f] rounded-xl border ${
                      dayPlan.rest ? 'border-white/10' : 'border-white/10'
                    } p-6`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg">{dayPlan.day}</h3>
                      {!dayPlan.rest && (
                        <button className="p-1 hover:bg-white/5 rounded">
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                    </div>

                    {dayPlan.rest ? (
                      <div className="text-center py-6">
                        <p className="text-gray-400">Rest Day</p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {dayPlan.exercises.map((exercise, i) => (
                          <li
                            key={i}
                            className="px-3 py-2 bg-[#1a1a1a] rounded text-sm"
                          >
                            {exercise}
                          </li>
                        ))}
                        <button className="w-full px-3 py-2 border border-dashed border-white/20 rounded text-sm text-gray-400 hover:border-[#6dccc4] hover:text-[#6dccc4] transition-colors">
                          + Add Exercise
                        </button>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
