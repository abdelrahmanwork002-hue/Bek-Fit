'use client';
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface RedFlagScreenProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

const redFlags = [
  'Unexplained weight loss (more than 5kg in the last month)',
  'Fever or night sweats',
  'Loss of bladder or bowel control',
  'Numbness in the groin area',
  'Severe pain that worsens at night or at rest',
  'Recent significant trauma or injury',
  'History of cancer',
  'Persistent or worsening neurological symptoms',
];

export function RedFlagScreen({ data, onNext }: RedFlagScreenProps) {
  const [selectedFlags, setSelectedFlags] = useState<string[]>(data.redFlags || []);
  const [showWarning, setShowWarning] = useState(false);

  const toggleFlag = (flag: string) => {
    if (selectedFlags.includes(flag)) {
      setSelectedFlags(selectedFlags.filter((f) => f !== flag));
    } else {
      setSelectedFlags([...selectedFlags, flag]);
    }
  };

  const handleSubmit = () => {
    if (selectedFlags.length > 0) {
      setShowWarning(true);
    } else {
      onNext({ redFlags: selectedFlags, hasMedicalClearance: true });
    }
  };

  if (showWarning) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-[#ef5350]/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-[#ef5350]" />
        </div>
        <h2 className="text-3xl mb-4">Medical Consultation Required</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Based on your responses, we strongly recommend consulting with a healthcare professional before starting an exercise program. Your health and safety are our top priority.
        </p>
        <div className="bg-[#ef5350]/10 border border-[#ef5350]/20 rounded-lg p-6 mb-8">
          <p className="text-[#ef5350] mb-4">You indicated the following symptoms:</p>
          <ul className="list-disc list-inside text-left text-gray-300 space-y-2">
            {selectedFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>
        <p className="text-gray-400 mb-6">
          Please consult with your doctor and return with medical clearance to continue.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-8 h-8 text-[#ef5350]" />
        <h2 className="text-3xl">Health Screening</h2>
      </div>
      <p className="text-gray-400 mb-8">
        Please check any of the following symptoms you're currently experiencing. This helps ensure your safety.
      </p>

      <div className="space-y-3 mb-8">
        {redFlags.map((flag) => (
          <label
            key={flag}
            className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
              selectedFlags.includes(flag)
                ? 'border-[#ef5350] bg-[#ef5350]/10'
                : 'border-white/10 hover:border-white/20 bg-[#1a1a1a]'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedFlags.includes(flag)}
              onChange={() => toggleFlag(flag)}
              className="mt-1 w-5 h-5 rounded border-white/20 bg-[#0f0f0f] text-[#ef5350] focus:ring-[#ef5350]"
            />
            <span className="flex-1">{flag}</span>
          </label>
        ))}
      </div>

      <div className="bg-[#6dccc4]/10 border border-[#6dccc4]/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-300">
          If you don't have any of these symptoms, click Continue to proceed with your onboarding.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
