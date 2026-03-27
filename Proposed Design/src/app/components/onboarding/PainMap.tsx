import { useState } from 'react';

interface PainMapProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

const bodyAreas = [
  { id: 'neck', label: 'Neck', top: '8%', left: '50%' },
  { id: 'shoulder-left', label: 'Left Shoulder', top: '15%', left: '35%' },
  { id: 'shoulder-right', label: 'Right Shoulder', top: '15%', left: '65%' },
  { id: 'upper-back', label: 'Upper Back', top: '20%', left: '50%' },
  { id: 'lower-back', label: 'Lower Back', top: '35%', left: '50%' },
  { id: 'hip-left', label: 'Left Hip', top: '45%', left: '40%' },
  { id: 'hip-right', label: 'Right Hip', top: '45%', left: '60%' },
  { id: 'knee-left', label: 'Left Knee', top: '65%', left: '42%' },
  { id: 'knee-right', label: 'Right Knee', top: '65%', left: '58%' },
  { id: 'ankle-left', label: 'Left Ankle', top: '85%', left: '43%' },
  { id: 'ankle-right', label: 'Right Ankle', top: '85%', left: '57%' },
];

export function PainMap({ data, onNext }: PainMapProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(data.painAreas || []);

  const toggleArea = (areaId: string) => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter((id) => id !== areaId));
    } else {
      setSelectedAreas([...selectedAreas, areaId]);
    }
  };

  const handleSubmit = () => {
    onNext({ painAreas: selectedAreas });
  };

  return (
    <div>
      <h2 className="text-3xl mb-2">Where Do You Feel Pain?</h2>
      <p className="text-gray-400 mb-8">
        Tap on the areas where you experience pain or discomfort. You can select multiple areas.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Body Diagram */}
        <div className="flex-1">
          <div className="relative w-full max-w-xs mx-auto aspect-[3/5] bg-[#1a1a1a] rounded-2xl border border-white/10">
            {/* Simple body outline */}
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full opacity-30"
              fill="none"
              stroke="#6dccc4"
              strokeWidth="2"
            >
              {/* Head */}
              <circle cx="100" cy="30" r="20" />
              {/* Torso */}
              <line x1="100" y1="50" x2="100" y2="150" />
              {/* Arms */}
              <line x1="100" y1="70" x2="60" y2="120" />
              <line x1="100" y1="70" x2="140" y2="120" />
              {/* Legs */}
              <line x1="100" y1="150" x2="80" y2="250" />
              <line x1="100" y1="150" x2="120" y2="250" />
              <line x1="80" y1="250" x2="75" y2="350" />
              <line x1="120" y1="250" x2="125" y2="350" />
            </svg>

            {/* Pain point buttons */}
            {bodyAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => toggleArea(area.id)}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 transition-all ${
                  selectedAreas.includes(area.id)
                    ? 'bg-[#ef5350] border-[#ef5350] scale-110'
                    : 'bg-[#6dccc4]/20 border-[#6dccc4] hover:bg-[#6dccc4]/40'
                }`}
                style={{ top: area.top, left: area.left }}
                title={area.label}
              />
            ))}
          </div>
        </div>

        {/* Selected Areas List */}
        <div className="flex-1">
          <h3 className="text-xl mb-4">Selected Pain Areas:</h3>
          {selectedAreas.length === 0 ? (
            <p className="text-gray-400">No areas selected</p>
          ) : (
            <ul className="space-y-2">
              {selectedAreas.map((areaId) => {
                const area = bodyAreas.find((a) => a.id === areaId);
                return (
                  <li
                    key={areaId}
                    className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg"
                  >
                    <span>{area?.label}</span>
                    <button
                      onClick={() => toggleArea(areaId)}
                      className="text-[#ef5350] hover:text-[#f44336]"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
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
