import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Mail, MapPin, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-400">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
                    rows={6}
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#6dccc4]" />
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Email</p>
                      <a href="mailto:info@bekfit.com" className="text-lg hover:text-[#6dccc4] transition-colors">
                        info@bekfit.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#6dccc4]" />
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Phone</p>
                      <a href="tel:+201012345678" className="text-lg hover:text-[#6dccc4] transition-colors">
                        +20 101 234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6dccc4]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#6dccc4]" />
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Location</p>
                      <p className="text-lg">Cairo, Egypt</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl mb-6">Follow Us</h2>
                
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href="#"
                    className="aspect-square rounded-lg bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-[#6dccc4] hover:bg-[#6dccc4]/10 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-[#6dccc4]" />
                    <span className="text-sm">Instagram</span>
                  </a>

                  <a
                    href="#"
                    className="aspect-square rounded-lg bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-[#6dccc4] hover:bg-[#6dccc4]/10 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-[#6dccc4]" />
                    <span className="text-sm">Facebook</span>
                  </a>

                  <a
                    href="#"
                    className="aspect-square rounded-lg bg-[#1a1a1a] border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-[#6dccc4] hover:bg-[#6dccc4]/10 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-[#6dccc4]" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#0f0f0f] rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl mb-6">Support Hours</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
