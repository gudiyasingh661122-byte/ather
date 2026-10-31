import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export type NavSectionId = 'home' | 'experience' | 'worlds' | 'materials' | 'about';

interface NavbarProps {
  activeSection: NavSectionId;
  onNavigate: (sectionId: NavSectionId) => void;
  onOpenArchiveModal: () => void;
}

const NAV_ITEMS: { id: NavSectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'worlds', label: 'Worlds' },
  { id: 'materials', label: 'Materials' },
  { id: 'about', label: 'About' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenArchiveModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: NavSectionId) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 border-b border-white/12'
          : 'bg-gradient-to-b from-[#050505]/80 to-transparent border-b border-white/6'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-4 md:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-serif-editorial text-2xl font-normal tracking-[0.26em] text-[#F5F3EF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
        >
          AETHER
        </a>

        {/* Zone 2: 5 clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-normal"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B] ${
                  isActive
                    ? 'text-[#F5F3EF]'
                    : 'text-[#92908C] hover:text-[#F5F3EF]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-[#C6A56B] transition-transform duration-300 origin-left w-full ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenArchiveModal}
            className="hidden sm:inline-flex items-center justify-center border border-white/15 bg-[#101010]/90 px-4 py-2 text-xs font-medium tracking-wider text-[#F5F3EF] hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
          >
            Curatorial Index
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center border border-white/12 bg-[#101010] text-[#F5F3EF] hover:border-[#C6A56B] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A56B]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-b border-white/12 bg-[#050505]/98 px-6 py-8"
        >
          <div className="flex flex-col gap-5">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-baseline justify-between border-b border-white/8 pb-3 font-serif-editorial text-2xl transition-colors ${
                    isActive ? 'text-[#C6A56B]' : 'text-[#F5F3EF] hover:text-[#C6A56B]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono-tabular text-xs text-[#92908C]">0{idx + 1}</span>
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArchiveModal();
              }}
              className="mt-2 w-full border border-[#C6A56B]/50 bg-[#101010] py-3 text-xs font-medium tracking-widest text-[#F5F3EF] hover:bg-[#C6A56B] hover:text-[#050505] transition-colors"
            >
              Open Curatorial Index
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
