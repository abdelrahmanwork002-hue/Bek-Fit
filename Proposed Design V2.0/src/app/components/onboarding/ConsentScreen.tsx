import { useState } from 'react';
import { FileText } from 'lucide-react';

interface ConsentScreenProps {
  data: Record<string, any>;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function ConsentScreen({ data, onNext }: ConsentScreenProps) {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = () => {
    if (accepted) {
      onNext({ 
        consentAccepted: true,
        consentTimestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-8 h-8 text-[#6dccc4]" />
        <h2 className="text-3xl">Consent & Disclaimer</h2>
      </div>
      <p className="text-gray-400 mb-8">
        Please read and accept the following terms before proceeding.
      </p>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
        <h3 className="text-xl mb-4">Important Information</h3>
        
        <div className="space-y-4 text-gray-300">
          <section>
            <h4 className="text-[#6dccc4] mb-2">Not Medical Advice</h4>
            <p className="text-sm">
              BekFit is a wellness and fitness platform. The content, exercises, and nutrition plans provided are for informational and educational purposes only and are not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h4 className="text-[#6dccc4] mb-2">AI-Generated Content</h4>
            <p className="text-sm">
              Your personalized plans are generated using artificial intelligence based on the information you provide. While we strive for accuracy, AI systems may not account for all individual health factors. Always consult with a qualified healthcare professional before starting any new fitness or nutrition program.
            </p>
          </section>

          <section>
            <h4 className="text-[#6dccc4] mb-2">Assumption of Risk</h4>
            <p className="text-sm">
              You acknowledge that physical exercise carries inherent risks. By using BekFit, you voluntarily assume all risks associated with participating in the fitness programs, including but not limited to injury, illness, or death.
            </p>
          </section>

          <section>
            <h4 className="text-[#6dccc4] mb-2">Medical Clearance</h4>
            <p className="text-sm">
              If you have any pre-existing medical conditions, injuries, or concerns, you should obtain clearance from your healthcare provider before beginning any exercise program.
            </p>
          </section>

          <section>
            <h4 className="text-[#6dccc4] mb-2">Data Privacy</h4>
            <p className="text-sm">
              Your health and personal information will be stored securely and used only to provide and improve our services. We will not share your data with third parties without your explicit consent, except as required by law.
            </p>
          </section>

          <section>
            <h4 className="text-[#6dccc4] mb-2">Right to Modify</h4>
            <p className="text-sm">
              You have the right to modify, pause, or discontinue your program at any time. Listen to your body and stop any exercise that causes pain or discomfort.
            </p>
          </section>
        </div>
      </div>

      <label className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-[#1a1a1a] cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-white/20 bg-[#0f0f0f] text-[#6dccc4] focus:ring-[#6dccc4]"
        />
        <span className="flex-1">
          I have read and understood the above information. I acknowledge that BekFit is not providing medical advice and I accept the terms and conditions. I consent to having my data processed to generate AI-powered personalized fitness and nutrition plans.
        </span>
      </label>

      <button
        onClick={handleSubmit}
        disabled={!accepted}
        className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Accept & Continue
      </button>
    </div>
  );
}
