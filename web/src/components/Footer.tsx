'use client';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, Mail } from 'lucide-react';
const logo = '/Bek Fit Logo.png';;

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <img src={logo} alt="BekFit Logo" className="h-8 w-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Fix Your Body. Build Real Strength.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@bekfit.com"
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#6dccc4] hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BekFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}