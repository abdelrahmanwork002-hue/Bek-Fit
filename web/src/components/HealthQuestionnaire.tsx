'use client';
import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface HealthQuestionnaireProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function HealthQuestionnaire({ data, onNext }: HealthQuestionnaireProps) {
  const [formData, setFormData] = useState({
    age: data.age || '',
    gender: data.gender || '',
    fitnessLevel: data.fitnessLevel || [3],
    exerciseFrequency: data.exerciseFrequency || '',
    medicalConditions: data.medicalConditions || '',
    medications: data.medications || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl mb-2">Health & Lifestyle Information</h2>
      <p className="text-gray-400 mb-8">
        Help us understand your baseline health to create a safe and appropriate plan.
      </p>

      <div className="space-y-6 mb-8">
        {/* Age */}
        <div>
          <label className="block text-sm mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm mb-2">Gender</label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, gender: option })}
                className={`px-4 py-3 rounded-lg border transition-colors ${
                  formData.gender === option
                    ? 'border-[#6dccc4] bg-[#6dccc4]/10'
                    : 'border-white/10 hover:border-white/20 bg-[#1a1a1a]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Fitness Level */}
        <div>
          <label className="block text-sm mb-2">
            Current Fitness Level: {['Beginner', 'Intermediate', 'Advanced'][formData.fitnessLevel[0] - 1]}
          </label>
          <Slider.Root
            value={formData.fitnessLevel}
            onValueChange={(value) => setFormData({ ...formData, fitnessLevel: value })}
            max={3}
            min={1}
            step={1}
            className="relative flex items-center select-none touch-none w-full h-5"
          >
            <Slider.Track className="bg-white/10 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-[#6dccc4] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-[#6dccc4] rounded-full hover:bg-[#5fbbb3] focus:outline-none focus:ring-2 focus:ring-[#6dccc4]"
              aria-label="Fitness Level"
            />
          </Slider.Root>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </div>

        {/* Exercise Frequency */}
        <div>
          <label className="block text-sm mb-2">How often do you currently exercise?</label>
          <select
            value={formData.exerciseFrequency}
            onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            required
          >
            <option value="">Select frequency</option>
            <option value="never">Never</option>
            <option value="1-2">1-2 times per week</option>
            <option value="3-4">3-4 times per week</option>
            <option value="5+">5+ times per week</option>
          </select>
        </div>

        {/* Medical Conditions */}
        <div>
          <label className="block text-sm mb-2">
            Do you have any medical conditions? (Optional)
          </label>
          <textarea
            value={formData.medicalConditions}
            onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            rows={3}
            placeholder="e.g., diabetes, high blood pressure, etc."
          />
        </div>

        {/* Medications */}
        <div>
          <label className="block text-sm mb-2">
            Are you currently taking any medications? (Optional)
          </label>
          <textarea
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            rows={3}
            placeholder="List any medications"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
      >
        Continue
      </button>
    </form>
  );
}
