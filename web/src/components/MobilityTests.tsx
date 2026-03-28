'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';

interface MobilityTestsProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

const mobilityTests = [
  {
    id: 'overhead-squat',
    name: 'Overhead Squat',
    description: 'Stand with arms overhead, squat down as low as comfortable while keeping arms straight.',
    videoPlaceholder: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'shoulder-flexion',
    name: 'Shoulder Flexion',
    description: 'Lying on your back, raise both arms straight up and try to touch the floor behind your head.',
    videoPlaceholder: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'toe-touch',
    name: 'Standing Toe Touch',
    description: 'Stand with feet together and try to touch your toes while keeping legs straight.',
    videoPlaceholder: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function MobilityTests({ data, onNext }: MobilityTestsProps) {
  const [testResults, setTestResults] = useState<Record<string, string>>(
    data.mobilityTests || {}
  );

  const handleTestResult = (testId: string, result: string) => {
    setTestResults({ ...testResults, [testId]: result });
  };

  const handleSubmit = () => {
    onNext({ mobilityTests: testResults });
  };

  const allTestsCompleted = mobilityTests.every((test) => testResults[test.id]);

  return (
    <div>
      <h2 className="text-3xl mb-2">Mobility Assessment</h2>
      <p className="text-gray-400 mb-8">
        Follow the instructions for each test and select how well you can perform it.
      </p>

      <div className="space-y-6 mb-8">
        {mobilityTests.map((test) => (
          <div
            key={test.id}
            className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Video/Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[#0f0f0f]">
                <img
                  src={test.videoPlaceholder}
                  alt={test.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[#6dccc4] flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#1a1a1a] ml-1" fill="#1a1a1a" />
                  </div>
                </button>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl mb-3">{test.name}</h3>
                <p className="text-gray-400 mb-4">{test.description}</p>

                <div className="space-y-2">
                  {['Yes', 'With Difficulty', 'No'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleTestResult(test.id, option)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors text-left ${
                        testResults[test.id] === option
                          ? 'border-[#6dccc4] bg-[#6dccc4]/10'
                          : 'border-white/10 hover:border-white/20 bg-[#0f0f0f]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allTestsCompleted}
        className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
