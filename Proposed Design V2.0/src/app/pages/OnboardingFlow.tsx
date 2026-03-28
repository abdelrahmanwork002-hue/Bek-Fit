import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { GoalSelection } from '../components/onboarding/GoalSelection';
import { PainMap } from '../components/onboarding/PainMap';
import { HealthQuestionnaire } from '../components/onboarding/HealthQuestionnaire';
import { MobilityTests } from '../components/onboarding/MobilityTests';
import { NutritionAssessment } from '../components/onboarding/NutritionAssessment';
import { RedFlagScreen } from '../components/onboarding/RedFlagScreen';
import { ConsentScreen } from '../components/onboarding/ConsentScreen';

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const steps = [
    { id: 'goal', title: 'Your Goal', component: GoalSelection },
    { id: 'painmap', title: 'Pain Map', component: PainMap, showIf: (goal: string) => goal === 'pain-relief' },
    { id: 'health', title: 'Health Info', component: HealthQuestionnaire },
    { id: 'mobility', title: 'Mobility Tests', component: MobilityTests },
    { id: 'nutrition', title: 'Nutrition', component: NutritionAssessment },
    { id: 'redflags', title: 'Red Flags', component: RedFlagScreen },
    { id: 'consent', title: 'Consent', component: ConsentScreen },
  ];

  const visibleSteps = steps.filter((step) => !step.showIf || step.showIf(selectedGoal || ''));
  const CurrentStepComponent = visibleSteps[currentStep]?.component;

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });

    if (currentStep === 0 && data.goal) {
      setSelectedGoal(data.goal);
    }

    if (currentStep < visibleSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete
      completeOnboarding();
      navigate('/payment');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Step {currentStep + 1} of {visibleSteps.length}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(((currentStep + 1) / visibleSteps.length) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6dccc4] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / visibleSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {visibleSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                    index === currentStep
                      ? 'bg-[#6dccc4] text-[#1a1a1a]'
                      : index < currentStep
                      ? 'bg-[#6dccc4]/20 text-[#6dccc4]'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {index < currentStep && <Check className="w-4 h-4" />}
                  <span>{step.title}</span>
                </div>
                {index < visibleSteps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 dark:bg-white/10 hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          {/* Current Step */}
          <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-2xl border border-gray-200 dark:border-white/10 p-8">
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}