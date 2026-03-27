/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Header } from '@/components/Header'
import { submitOnboarding } from '@/app/actions/onboarding'

// Import components
import { GoalSelection } from '@/components/onboarding/GoalSelection'
import { PainMap } from '@/components/onboarding/PainMap'
import { HealthQuestionnaire } from '@/components/onboarding/HealthQuestionnaire'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const router = useRouter()
  const supabase = createClient()

  // Define steps
  const steps = [
    { id: 'goal', title: 'Goal', component: GoalSelection },
    { 
      id: 'painmap', 
      title: 'Pain Map', 
      component: PainMap, 
      showIf: (goal: string) => goal === 'pain-relief' 
    },
    { id: 'health', title: 'Health Info', component: HealthQuestionnaire },
    { id: 'consent', title: 'Consent' },
  ]

  // Filter visible steps
  const visibleSteps = steps.filter((step) => !step.showIf || step.showIf(formData.goal || ''))
  const currentStepData = visibleSteps[currentStep]
  const CurrentStepComponent = currentStepData?.component

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNext = (data: any) => {
    const updatedData = { ...formData, ...data }
    setFormData(updatedData)
    if (currentStep < visibleSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final submission
      handleSubmit(updatedData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/')
    }
  }

  const handleSubmit = async (finalData: any) => {
    setIsLoading(true)
    setError(null)
    console.log('Submitting onboarding data:', finalData)
    try {
      await submitOnboarding(finalData)
      // The server action should handle redirection or success state
    } catch (e: any) {
      setError(e.message || 'Something went wrong during submission.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/5">
        <div className="max-w-3xl mx-auto">
          {/* Progress Section */}
          <div className="mb-10 text-center">
             <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-4 px-2 no-scrollbar">
                {visibleSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-primary text-primary-foreground scale-105 shadow-md'
                          : index < currentStep
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index < currentStep && <Check className="w-4 h-4" />}
                      <span>{step.title}</span>
                    </div>
                    {index < visibleSteps.length - 1 && (
                      <div className="w-4 h-0.5 bg-border sm:w-8" />
                    )}
                  </div>
                ))}
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phase {currentStep + 1}
                </span>
                <span className="text-xs font-bold text-primary">
                  {Math.round(((currentStep + 1) / visibleSteps.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / visibleSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Errors */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          {/* Main Card */}
          <div className={`bg-card border border-border rounded-[2rem] p-8 md:p-12 shadow-sm animate-in fade-in zoom-in-95 duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            {CurrentStepComponent ? (
              <CurrentStepComponent
                data={formData}
                onNext={handleNext}
              />
            ) : (
              <div className="space-y-6 text-center py-12">
                 <h2 className="text-3xl font-bold">Ready to Begin?</h2>
                 <p className="text-muted-foreground text-lg">
                    By continuing, you agree to our Terms of Service and Privacy Policy. 
                    We'll use your data to generate a personalized AI fitness plan.
                 </p>
                 <button
                    onClick={() => handleNext({ consent: true })}
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                    {isLoading ? 'Creating Plan...' : 'Get My Plan'}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                 </button>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-border text-foreground hover:bg-muted transition-all font-medium active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              {currentStep === 0 ? 'Home' : 'Back'}
            </button>
            
            <div className="text-muted-foreground flex items-center justify-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-sm font-medium">Encryption Active</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
