'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface PainMapProps {
  data: Record<string, any>
  onNext: (data: any) => void
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
]

export function PainMap({ data, onNext }: PainMapProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(data.painAreas || [])

  const toggleArea = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]
    )
  }

  const handleSubmit = () => {
    onNext({ painAreas: selectedAreas })
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-2">Identify Pain Points</h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Tap on the body map where you experience pain or discomfort.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Body Diagram */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[240px] aspect-[1/2] bg-muted/30 rounded-3xl border border-border p-4">
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full opacity-20 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="100" cy="30" r="18" />
              <path d="M100 48 L100 150 M100 65 L60 110 M100 65 L140 110 M100 150 L80 250 L75 350 M100 150 L120 250 L125 350" />
            </svg>

            {bodyAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => toggleArea(area.id)}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 transition-all duration-200 shadow-sm ${
                  selectedAreas.includes(area.id)
                    ? 'bg-destructive border-destructive scale-125 z-10'
                    : 'bg-primary/20 border-primary hover:bg-primary/40'
                }`}
                style={{ top: area.top, left: area.left }}
                title={area.label}
              />
            ))}
          </div>
        </div>

        {/* Selected Areas List */}
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            Selected Areas ({selectedAreas.length})
          </h3>
          {selectedAreas.length === 0 ? (
            <div className="h-full min-h-[120px] flex items-center justify-center border-2 border-dashed border-border rounded-2xl text-muted-foreground">
              No areas selected
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {selectedAreas.map((areaId) => {
                const area = bodyAreas.find((a) => a.id === areaId)
                return (
                  <div
                    key={areaId}
                    className="flex items-center justify-between p-3 bg-card border border-border rounded-xl animate-in fade-in slide-in-from-bottom-1"
                  >
                    <span className="font-medium">{area?.label}</span>
                    <button
                      type="button"
                      onClick={() => toggleArea(areaId)}
                      className="p-1 hover:bg-muted rounded-md text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </div>
  )
}
