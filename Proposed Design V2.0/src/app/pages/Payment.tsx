import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Upload, CheckCircle, Clock, XCircle } from 'lucide-react';

export function Payment() {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'active' | 'expired'>('pending');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (receiptFile) {
      // Simulate upload
      setTimeout(() => {
        setUploadSuccess(true);
      }, 1000);
    }
  };

  const StatusBadge = () => {
    const config = {
      pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/20', text: 'Pending' },
      active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/20', text: 'Active' },
      expired: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/20', text: 'Expired' },
    };

    const { icon: Icon, color, bg, text } = config[paymentStatus];

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
        <span className={color}>{text}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl mb-2">Payment Status</h1>
          <p className="text-gray-400 mb-8">
            Complete your payment to unlock your personalized wellness plan
          </p>

          {/* Status Card */}
          <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Subscription Status</h2>
              <StatusBadge />
            </div>

            {paymentStatus === 'pending' && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                <p className="text-yellow-500 mb-2">Payment Pending Verification</p>
                <p className="text-gray-400 text-sm">
                  Your payment is being verified. This usually takes 24-48 hours. You'll receive access once approved.
                </p>
              </div>
            )}

            {paymentStatus === 'active' && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                <p className="text-green-500 mb-2">Payment Verified</p>
                <p className="text-gray-400 text-sm">
                  Your subscription is active! You have full access to your personalized plan.
                </p>
              </div>
            )}

            {paymentStatus === 'expired' && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <p className="text-red-500 mb-2">Subscription Expired</p>
                <p className="text-gray-400 text-sm">
                  Please renew your subscription to continue accessing your plan.
                </p>
              </div>
            )}
          </div>

          {/* Payment Instructions */}
          <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8 mb-8">
            <h2 className="text-2xl mb-6">Payment Instructions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-[#6dccc4] mb-3">Option 1: InstaPay</h3>
                <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-400">InstaPay Username:</p>
                  <p className="text-lg font-mono">BekFit@InstaPay</p>
                  <p className="text-sm text-gray-400 mt-4">Amount:</p>
                  <p className="text-2xl text-[#6dccc4]">299 EGP / month</p>
                </div>
              </div>

              <div>
                <h3 className="text-[#6dccc4] mb-3">Option 2: Vodafone Cash</h3>
                <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-400">Vodafone Cash Number:</p>
                  <p className="text-lg font-mono">01012345678</p>
                  <p className="text-sm text-gray-400 mt-4">Amount:</p>
                  <p className="text-2xl text-[#6dccc4]">299 EGP / month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Receipt */}
          <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl mb-6">Upload Payment Receipt</h2>

            {uploadSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl mb-2">Receipt Uploaded Successfully!</h3>
                <p className="text-gray-400 mb-6">
                  We'll verify your payment within 24-48 hours and activate your account.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-400 mb-6">
                  After making your payment, please upload a screenshot or photo of your receipt for verification.
                </p>

                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 mb-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="cursor-pointer px-6 py-3 bg-[#1a1a1a] border border-white/20 rounded-lg hover:bg-white/5 transition-colors inline-block"
                  >
                    Choose File
                  </label>
                  {receiptFile && (
                    <p className="mt-4 text-gray-400">Selected: {receiptFile.name}</p>
                  )}
                </div>

                <button
                  onClick={handleUpload}
                  disabled={!receiptFile}
                  className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload Receipt
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
