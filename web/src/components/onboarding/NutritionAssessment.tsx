'use client';
import { useState } from 'react';

interface NutritionAssessmentProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function NutritionAssessment({ data, onNext }: NutritionAssessmentProps) {
  const [formData, setFormData] = useState({
    dietType: data.dietType || '',
    restrictions: data.restrictions || [],
    mealsPerDay: data.mealsPerDay || '3',
    cookingFrequency: data.cookingFrequency || '',
    waterIntake: data.waterIntake || '',
  });

  const restrictionOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut Allergy',
    'Halal',
    'Kosher',
  ];

  const toggleRestriction = (restriction: string) => {
    if (formData.restrictions.includes(restriction)) {
      setFormData({
        ...formData,
        restrictions: formData.restrictions.filter((r) => r !== restriction),
      });
    } else {
      setFormData({
        ...formData,
        restrictions: [...formData.restrictions, restriction],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl mb-2">Nutrition Assessment</h2>
      <p className="text-gray-400 mb-8">
        Help us create a personalized meal plan that fits your lifestyle and preferences.
      </p>

      <div className="space-y-6 mb-8">
        {/* Diet Type */}
        <div>
          <label className="block text-sm mb-2">Current Diet Type</label>
          <select
            value={formData.dietType}
            onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            required
          >
            <option value="">Select diet type</option>
            <option value="balanced">Balanced</option>
            <option value="low-carb">Low Carb</option>
            <option value="high-protein">High Protein</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="plant-based">Plant-Based</option>
          </select>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm mb-2">Dietary Restrictions (Select all that apply)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {restrictionOptions.map((restriction) => (
              <button
                key={restriction}
                type="button"
                onClick={() => toggleRestriction(restriction)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                  formData.restrictions.includes(restriction)
                    ? 'border-[#6dccc4] bg-[#6dccc4]/10'
                    : 'border-white/10 hover:border-white/20 bg-[#1a1a1a]'
                }`}
              >
                {restriction}
              </button>
            ))}
          </div>
        </div>

        {/* Meals Per Day */}
        <div>
          <label className="block text-sm mb-2">Meals Per Day</label>
          <div className="grid grid-cols-4 gap-3">
            {['2', '3', '4', '5'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, mealsPerDay: option })}
                className={`px-4 py-3 rounded-lg border transition-colors ${
                  formData.mealsPerDay === option
                    ? 'border-[#6dccc4] bg-[#6dccc4]/10'
                    : 'border-white/10 hover:border-white/20 bg-[#1a1a1a]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Frequency */}
        <div>
          <label className="block text-sm mb-2">How often do you cook?</label>
          <select
            value={formData.cookingFrequency}
            onChange={(e) => setFormData({ ...formData, cookingFrequency: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            required
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="few-times">A few times a week</option>
            <option value="rarely">Rarely</option>
            <option value="never">Never</option>
          </select>
        </div>

        {/* Water Intake */}
        <div>
          <label className="block text-sm mb-2">Daily Water Intake</label>
          <select
            value={formData.waterIntake}
            onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
            required
          >
            <option value="">Select water intake</option>
            <option value="less-1l">Less than 1 liter</option>
            <option value="1-2l">1-2 liters</option>
            <option value="2-3l">2-3 liters</option>
            <option value="more-3l">More than 3 liters</option>
          </select>
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
