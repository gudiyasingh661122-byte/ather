import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar, NavSectionId } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { MotionSection } from './components/MotionSection';
import { Worlds } from './components/Worlds';
import { Materials } from './components/Materials';
import { FinalExperience } from './components/FinalExperience';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ArchiveDossierModal } from './components/ArchiveDossierModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('home');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    tab: 'dossier' | 'portal';
  }>({ isOpen: false, tab: 'dossier' });

  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track active section in viewport
  useEffect(() => {
    const sectionIds: NavSectionId[] = ['home', 'about', 'experience', 'worlds', 'materials'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const handleNavigate = (sectionId: NavSectionId) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F3EF] selection:bg-[#C6A56B]/30 selection:text-[#F5F3EF]">
      <CustomCursor />

      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenArchiveModal={() => setModalState({ isOpen: true, tab: 'dossier' })}
      />

      <main ref={mainRef}>
        {/* SECTION 01 — CINEMATIC HERO */}
        <Hero
          onNavigate={handleNavigate}
          onOpenArchiveModal={() => setModalState({ isOpen: true, tab: 'dossier' })}
        />

        {/* SECTION 02 — INTRODUCTION */}
        <Introduction onNavigate={handleNavigate} />

        {/* SECTION 03 — THE ART OF MOTION */}
        <MotionSection />

        {/* SECTION 04 — DIMENSIONAL WORLDS */}
        <Worlds />

        {/* SECTION 05 — MATERIAL UNIVERSE */}
        <Materials />

        {/* SECTION 06 — FINAL EXPERIENCE */}
        <FinalExperience
          onOpenPortalModal={() => setModalState({ isOpen: true, tab: 'portal' })}
        />
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenArchiveModal={() => setModalState({ isOpen: true, tab: 'dossier' })}
      />

      <ArchiveDossierModal
        isOpen={modalState.isOpen}
        initialTab={modalState.tab}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
