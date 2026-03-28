'use client';
import { useState } from 'react';
import { Target, Heart, TrendingUp, Users, Zap } from 'lucide-react';

interface GoalSelectionProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

const goals = [
  {
    id: 'pain-relief',
    name: 'Pain Relief',
    description: 'Address chronic pain and discomfort',
    icon: Heart,
  },
  {
    id: 'fitness',
    name: 'Improve Fitness',
    description: 'Build strength and endurance',
    icon: Zap,
  },
  {
    id: 'weight-loss',
    name: 'Weight Management',
    description: 'Achieve your ideal weight',
    icon: TrendingUp,
  },
  {
    id: 'overall-health',
    name: 'Overall Health',
    description: 'Enhance general wellness',
    icon: Target,
  },
  {
    id: 'performance',
    name: 'Athletic Performance',
    description: 'Optimize sports performance',
    icon: Users,
  },
];

export function GoalSelection({ data, onNext }: GoalSelectionProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(data.goal || null);

  const handleSubmit = () => {
    if (selectedGoal) {
      onNext({ goal: selectedGoal });
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-2">What's Your Primary Goal?</h2>
      <p className="text-gray-400 mb-8">
        Select the goal that best describes what you want to achieve. This will help us personalize your plan.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                selectedGoal === goal.id
                  ? 'border-[#6dccc4] bg-[#6dccc4]/10'
                  : 'border-white/10 hover:border-white/20 bg-[#1a1a1a]'
              }`}
            >
              <Icon
                className={`w-8 h-8 mb-4 ${
                  selectedGoal === goal.id ? 'text-[#6dccc4]' : 'text-gray-400'
                }`}
              />
              <h3 className="text-xl mb-2">{goal.name}</h3>
              <p className="text-sm text-gray-400">{goal.description}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedGoal}
        className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
