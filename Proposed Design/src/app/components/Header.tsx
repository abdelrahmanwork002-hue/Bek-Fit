import { Link, useLocation } from 'react-router';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/48bc728e82b0f1020faca2cabc8139daa8e961da.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const location = useLocation();

  const isLanding = location.pathname === '/';

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
      ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="BekFit Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-[#6dccc4] transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-[#6dccc4] transition-colors"
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-[#6dccc4] hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            {isLanding && (
              <Link
                to="/onboarding"
                className="px-6 py-2 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors"
              >
                Start Your Plan
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-[#6dccc4] px-2 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-[#6dccc4] px-2 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-2 py-2 text-gray-300 hover:text-[#6dccc4] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              {isLanding && (
                <Link
                  to="/onboarding"
                  className="px-6 py-2 bg-[#6dccc4] text-[#1a1a1a] rounded-lg hover:bg-[#5fbbb3] transition-colors text-center"
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
  );
}
