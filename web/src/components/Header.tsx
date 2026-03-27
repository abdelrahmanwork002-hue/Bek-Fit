'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const pathname = usePathname()

  const isLanding = pathname === '/'

  const navigation = isLanding
    ? [
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Features', href: '#features' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ]
    : [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Nutrition', href: '/nutrition' },
        { name: 'Tips', href: '/tips' },
        { name: 'Blog', href: '/blog' },
        { name: 'Profile', href: '/profile' },
      ]

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-24">
              <Image 
                src="/logo.png" 
                alt="BekFit Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            {isLanding && (
              <Link
                href="/onboarding"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Your Plan
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary px-2 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary px-2 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-2 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              {isLanding && (
                <Link
                  href="/onboarding"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Your Plan
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
