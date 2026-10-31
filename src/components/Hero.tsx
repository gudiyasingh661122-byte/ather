import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { getVideoById } from '../utils/videoCatalog';
import { NavSectionId } from './Navbar';

interface HeroProps {
  onNavigate: (sectionId: NavSectionId) => void;
  onOpenArchiveModal: () => void;
}

const HERO_REEL_OPTIONS = [
  { id: 'obsidian-gold-geometry', label: '01. Tectonic Gold' },
  { id: 'liquid-chrome-waves', label: '02. Liquid Chrome' },
  { id: 'monochrome-chrome-sphere', label: '03. Cellular Monolith' },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenArchiveModal }) => {
  const [activeReelId, setActiveReelId] = useState<string>('obsidian-gold-geometry');
  const activeVideo = getVideoById(activeReelId);

  return (
    <section
      id="home"
      aria-label="Cinematic Hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-10"
    >
      {/* Full-Screen 4K Hero Video Background */}
      <div className="absolute inset-0 z-0">
        <SmartVideo
          key={activeVideo.src}
          src={activeVideo.src}
          isHero={true}
          posterAccent={activeVideo.posterSvgAccent}
          fallbackGradient={activeVideo.fallbackGradient}
          className="h-full w-full"
        />
        {/* Measured scrim keeping the video clearly visible while guaranteeing 4.5:1 text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/55" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_55%,rgba(5,5,5,0.62)_0%,transparent_65%)]" />
      </div>

      {/* Top Spacer */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 pt-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#92908C]">
          <span>Exhibition Monograph</span>
          <span aria-hidden="true">·</span>
          <span>Spatial 3D &amp; 4K Motion Architecture</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-tabular text-[#C6A56B]">{activeVideo.resolutionLabel}</span>
        </div>
      </div>

      {/* Center / Main Editorial Composition */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-[1440px] px-6 md:px-12 py-12">
        <div className="max-w-4xl">
          <p className="mb-4 text-xs md:text-sm tracking-[0.18em] text-[#C6A56B]">
            AETHER — Digital Installation
          </p>

          <h1
            className="font-serif-editorial text-[clamp(3.75rem,9.5vw,8.5rem)] font-light leading-[0.9] tracking-[-0.02em] text-[#F5F3EF]"
            style={{ textWrap: 'balance' }}
          >
            BEYOND
            <br />
            <span className="italic font-normal text-[#F5F3EF]">REALITY.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base md:text-lg font-light leading-relaxed text-[#F5F3EF]/85">
            An exploration of digital dimensions, materials and imagination. Sculpted in reflective
            chrome, smoked optical crystal, and champagne-gold light.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              data-cursor-label="Explore"
              onClick={() => onNavigate('experience')}
              className="group inline-flex items-center gap-3 border border-[#C6A56B] bg-[#C6A56B] px-7 py-3.5 text-xs font-semibold tracking-[0.16em] text-[#050505] transition-all duration-200 hover:bg-transparent hover:text-[#F5F3EF] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
            >
              <span>EXPLORE EXPERIENCE</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onOpenArchiveModal}
              className="inline-flex items-center gap-2 border border-white/18 bg-[#050505]/70 px-6 py-3.5 text-xs font-medium tracking-[0.12em] text-[#F5F3EF] transition-colors duration-200 hover:border-[#C6A56B]/60 hover:text-[#C6A56B] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
            >
              <span>Inspect 4K Footage Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator + Hero Reel Switcher */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-6 md:px-12 pt-6 border-t border-white/12">
        <button
          type="button"
          onClick={() => onNavigate('about')}
          aria-label="Scroll to Introduction section"
          className="group inline-flex items-center gap-3 text-left text-xs text-[#92908C] hover:text-[#F5F3EF] transition-colors cursor-pointer w-fit"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-white/15 group-hover:border-[#C6A56B] transition-colors">
            <ArrowDown className="h-3.5 w-3.5 text-[#C6A56B] transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          <span>Scroll to enter the continuum</span>
        </button>

        {/* Interactive Hero Background Reel Selector */}
        <div
          role="group"
          aria-label="Hero Background Study Selector"
          className="flex flex-wrap items-center gap-1 border border-white/12 bg-[#101010]/90 p-1"
        >
          {HERO_REEL_OPTIONS.map((reel) => {
            const isSelected = reel.id === activeReelId;
            return (
              <button
                key={reel.id}
                type="button"
                onClick={() => setActiveReelId(reel.id)}
                className={`px-3 py-1.5 text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C6A56B] text-[#050505] font-medium'
                    : 'text-[#92908C] hover:text-[#F5F3EF]'
                }`}
              >
                {reel.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
