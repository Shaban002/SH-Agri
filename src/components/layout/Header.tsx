import React, { useState } from 'react';
import { Sprout, Menu, X, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  toggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'الرئيسية' },
    { id: 'crops', label: 'دليل المحاصيل' },
    { id: 'ipm', label: 'المكافحة والمبيدات' },
    { id: 'diagnosis', label: 'التشخيص الزراعي' },
    { id: 'fertilizer', label: 'حاسبة التسميد' },
    { id: 'irrigation', label: 'إدارة الري' },
    { id: 'berseem', label: 'البرسيم والحشات' },
    { id: 'farm', label: 'سجل المزرعة' },
    { id: 'economics', label: 'الإنتاجية والتكاليف' },
    { id: 'library', label: 'المكتبة والمراجع' },
    { id: 'admin', label: 'لوحة الإدارة' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Universal Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Primary CTA & Theme Toggle) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 h-16 min-w-0">
          {/* Zone 1: Single text element wordmark with icon */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none whitespace-nowrap shrink-0 group min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-105" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                SH-Agri
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                المساعد الزراعي بمصر
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.slice(0, 6).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[13px] ${
                  activeTab === link.id
                    ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dropdown for Secondary Tools */}
            <div className="relative group">
              <button className="text-[13px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap shrink-0 flex items-center gap-1">
                المزيد من الأدوات
                <span className="text-xs">▾</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1.5 hidden group-hover:block transition-all z-50">
                {navLinks.slice(6).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-right px-4 py-2 text-xs transition-colors block ${
                      activeTab === link.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: 1 Primary Action + Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors shrink-0"
              title={darkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
              aria-label={darkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Smart Assistant Action - Hidden on mobile phones to prevent overflow, accessible via drawer */}
            <button
              onClick={() => handleNavClick('assistant')}
              className={`hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm ${
                activeTab === 'assistant'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>اسأل الخبير الذكي</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg focus:outline-none shrink-0"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-right px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => handleNavClick('assistant')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              <span>المساعد الزراعي الذكي</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center"
              title={darkMode ? 'نهاري' : 'ليلي'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
