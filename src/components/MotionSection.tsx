import React, { useState } from 'react';
import { Pause, Play, Maximize2, Minimize2 } from 'lucide-react';
import { SmartVideo } from './SmartVideo';
import { getVideoById } from '../utils/videoCatalog';

export const MotionSection: React.FC = () => {
  const chromeVideo = getVideoById('liquid-chrome-waves');
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [expandedFrame, setExpandedFrame] = useState<boolean>(false);

  return (
    <section
      id="experience"
      aria-label="The Art of Motion"
      className="relative w-full bg-[#101010] py-28 md:py-36 border-t border-white/12 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-[#92908C]">
              <span className="font-mono-tabular text-[#C6A56B]">03</span>
              <span aria-hidden="true">·</span>
              <span>The Art of Motion</span>
              <span aria-hidden="true">·</span>
              <span>Fluid Metallic Kinematics</span>
            </div>
            <h2
              className="font-serif-editorial text-[clamp(2.25rem,4.5vw,4.25rem)] font-light leading-[1.08] text-[#F5F3EF]"
              style={{ textWrap: 'balance' }}
            >
              Laminar flow sculpted in <span className="italic text-[#C6A56B]">liquid chrome.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-[#92908C]">
            Continuous sinusoidal ribbons of mirror-polished mercury fold across a zero-gravity
            aperture. Adjust temporal velocity below to inspect how specular highlights travel
            along each crest.
          </p>
        </div>

        {/* Large Immersive Video Presentation Frame */}
        <div
          className={`relative w-full overflow-hidden border border-white/15 bg-[#050505] transition-all duration-500 ${
            expandedFrame ? 'h-[82svh]' : 'h-[62svh] min-h-[440px]'
          }`}
        >
          <SmartVideo
            src={chromeVideo.src}
            posterAccent={chromeVideo.posterSvgAccent}
            fallbackGradient={chromeVideo.fallbackGradient}
            playbackRate={playbackRate}
            isUserPaused={isPaused}
            className="h-full w-full"
          />

          {/* Subtle Editorial Scrim */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-[#050505]/55" />

          {/* Top-Left Metadata Overlay */}
          <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#F5F3EF]/80">
              <span className="font-mono-tabular text-[#C6A56B]">SEQUENCE 03.A</span>
              <span aria-hidden="true">·</span>
              <span>{chromeVideo.title}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{playbackRate.toFixed(1)}x Velocity</span>
            </div>

            <button
              type="button"
              onClick={() => setExpandedFrame((prev) => !prev)}
              aria-label={expandedFrame ? 'Restore standard cinema frame' : 'Expand cinema frame'}
              className="inline-flex items-center gap-2 border border-white/15 bg-[#050505]/80 px-3.5 py-2 text-xs text-[#F5F3EF] hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {expandedFrame ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Standard Aperture</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Expand Aperture</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Editorial Overlay + Working Temporal Controls */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-serif-editorial text-2xl md:text-3xl font-light text-[#F5F3EF]">
                “Motion is the architecture of time made visible through reflection.”
              </p>
              <p className="mt-2 text-xs text-[#92908C]">
                {chromeVideo.lighting}
              </p>
            </div>

            {/* Interactive Temporal Controls */}
            <div className="flex flex-wrap items-center gap-3 border border-white/15 bg-[#050505]/90 p-2">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-2 border border-white/12 bg-[#101010] px-3.5 py-2 text-xs font-medium text-[#F5F3EF] hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5 text-[#C6A56B]" />
                    <span>Resume Motion</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5 text-[#C6A56B]" />
                    <span>Freeze Frame</span>
                  </>
                )}
              </button>

              <div
                role="group"
                aria-label="Playback velocity controls"
                className="flex items-center gap-1"
              >
                {[0.5, 1.0, 1.5].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-3 py-2 font-mono-tabular text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      playbackRate === rate
                        ? 'bg-[#C6A56B] text-[#050505] font-medium'
                        : 'text-[#92908C] hover:text-[#F5F3EF]'
                    }`}
                  >
                    {rate.toFixed(1)}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
