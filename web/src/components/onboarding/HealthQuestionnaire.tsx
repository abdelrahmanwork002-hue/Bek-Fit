'use client'

import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'

interface HealthQuestionnaireProps {
  data: Record<string, any>
  onNext: (data: any) => void
}

export function HealthQuestionnaire({ data, onNext }: HealthQuestionnaireProps) {
  const [formData, setFormData] = useState({
    age: data.age || '',
    gender: data.gender || '',
    fitnessLevel: data.fitnessLevel || [2],
    exerciseFrequency: data.exerciseFrequency || '',
    medicalConditions: data.medicalConditions || '',
    medications: data.medications || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold mb-2">Health & Lifestyle</h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Help us understand your baseline health to create a safe and appropriate plan.
      </p>

      <div className="space-y-6 mb-8">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
            required
            placeholder="e.g. 30"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="grid grid-cols-3 gap-3">
            {['Male', 'Female', 'Other'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, gender: option })}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
                  formData.gender === option
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-border/80 bg-card'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Fitness Level */}
        <div>
          <label className="block text-sm font-medium mb-2">
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
            <Slider.Track className="bg-muted relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-primary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-primary rounded-full hover:opacity-90 focus:outline-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              aria-label="Fitness Level"
            />
          </Slider.Root>
          <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
          </div>
        </div>

        {/* Exercise Frequency */}
        <div>
          <label className="block text-sm font-medium mb-2">How often do you exercise?</label>
          <select
            value={formData.exerciseFrequency}
            onChange={(e) => setFormData({ ...formData, exerciseFrequency: e.target.value })}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
            required
          >
            <option value="">Select frequency</option>
            <option value="never">Never</option>
            <option value="1-2">1-2 times per week</option>
            <option value="3-4">3-4 times per week</option>
            <option value="5+">5+ times per week</option>
          </select>
        </div>

        {/* Optional Textareas */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Medical Conditions (Optional)</label>
            <textarea
              value={formData.medicalConditions}
              onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:outline-none min-h-[80px]"
              placeholder="e.g. Lower back stiffness, high BP..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Medications (Optional)</label>
            <textarea
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:outline-none min-h-[80px]"
              placeholder="List any regular medications"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </form>
  )
}
