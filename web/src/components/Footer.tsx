'use client'

import Link from 'next/link'
import { Instagram, Facebook, MessageCircle, Mail } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="relative h-8 w-24 mb-6">
              <Image 
                src="/logo.png" 
                alt="BekFit Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
              Fix Your Body. Build Real Strength. Tailored by AI, led by experts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-muted-foreground hover:text-primary transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Medical Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all active:scale-95"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all active:scale-95"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@bekfit.com"
                className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all active:scale-95"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} BekFit AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
