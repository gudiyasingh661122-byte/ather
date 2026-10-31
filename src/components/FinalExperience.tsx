import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { getVideoById } from '../utils/videoCatalog';

interface FinalExperienceProps {
  onOpenPortalModal: () => void;
}

export const FinalExperience: React.FC<FinalExperienceProps> = ({ onOpenPortalModal }) => {
  const portalVideo = getVideoById('golden-ring-portal');

  return (
    <section
      id="final"
      aria-label="Final Experience — Enter The Unknown"
      className="relative flex min-h-[90svh] w-full items-center justify-center overflow-hidden bg-[#050505] py-28 border-t border-white/12"
    >
      {/* Full-Bleed 4K Golden Ring Portal Footage */}
      <div className="absolute inset-0 z-0">
        <SmartVideo
          src={portalVideo.src}
          posterAccent={portalVideo.posterSvgAccent}
          fallbackGradient={portalVideo.fallbackGradient}
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.45)_0%,rgba(5,5,5,0.85)_100%)]" />
      </div>

      {/* Centered Monumental Finale Typography */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 text-xs text-[#92908C]">
          <span className="font-mono-tabular text-[#C6A56B]">06</span>
          <span aria-hidden="true">·</span>
          <span>Horizon Singularity</span>
          <span aria-hidden="true">·</span>
          <span>Final Chapter</span>
        </div>

        <h2
          className="font-serif-editorial text-[clamp(3rem,7.5vw,6.75rem)] font-light leading-[0.95] tracking-[-0.02em] text-[#F5F3EF]"
          style={{ textWrap: 'balance' }}
        >
          ENTER THE <span className="italic text-[#C6A56B]">UNKNOWN.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base md:text-xl font-light text-[#F5F3EF]/85">
          Your next dimension begins here.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            data-cursor-label="Enter"
            onClick={onOpenPortalModal}
            className="group inline-flex items-center gap-3 border border-[#C6A56B] bg-[#C6A56B] px-8 py-4 text-xs font-semibold tracking-[0.18em] text-[#050505] transition-all duration-200 hover:bg-transparent hover:text-[#F5F3EF] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A56B]"
          >
            <span>EXPLORE AETHER</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
