import React from 'react';
import { SmartVideo } from './SmartVideo';
import { getVideoById } from '../utils/videoCatalog';
import { NavSectionId } from './Navbar';

interface IntroductionProps {
  onNavigate: (sectionId: NavSectionId) => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onNavigate }) => {
  const sphereVideo = getVideoById('monochrome-chrome-sphere');

  return (
    <section
      id="about"
      aria-label="Introduction — Where imagination becomes an experience"
      className="relative w-full bg-[#050505] py-28 md:py-40 border-t border-white/12"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Section Kicker */}
        <div className="mb-10 flex items-center gap-3 text-xs text-[#92908C]">
          <span className="font-mono-tabular text-[#C6A56B]">02</span>
          <span aria-hidden="true">·</span>
          <span>Curatorial Manifesto</span>
          <span aria-hidden="true">·</span>
          <span>Spatial Philosophy</span>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Monumental Headline & Editorial Prose */}
          <div className="flex flex-col justify-between lg:col-span-7 pr-0 lg:pr-8">
            <div>
              <h2
                className="font-serif-editorial text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-[1.06] tracking-[-0.01em] text-[#F5F3EF]"
                style={{ textWrap: 'balance' }}
              >
                Where imagination becomes an{' '}
                <span className="italic text-[#C6A56B]">experience.</span>
              </h2>

              <p className="mt-8 max-w-[62ch] text-base md:text-lg font-light leading-[1.75] text-[#F5F3EF]/85">
                AETHER dissolves the boundary between physical luxury materials and real-time
                computational space. Rather than treating the screen as a flat surface, every frame
                is composed as an architectural chamber where light grazes brushed gold, liquid
                mercury folds in zero gravity, and dark crystal refracts the unseen.
              </p>

              <p className="mt-6 max-w-[62ch] text-sm md:text-base font-light leading-[1.75] text-[#92908C]">
                Each sequence in this installation is anchored by high-definition 4K visual studies—paired
                with live physical rendering so motion, depth, and reflection respond organically to
                your presence.
              </p>
            </div>

            {/* Architectural Pillars Row */}
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/12 pt-8 sm:grid-cols-3">
              <div>
                <p className="font-mono-tabular text-xs text-[#C6A56B]">01 · Optical Fidelity</p>
                <h3 className="mt-2 font-serif-editorial text-xl text-[#F5F3EF]">
                  True 4K Footage
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#92908C]">
                  Native motion studies captured with grazing chiaroscuro illumination and zero
                  synthetic compression clutter.
                </p>
              </div>

              <div>
                <p className="font-mono-tabular text-xs text-[#C6A56B]">02 · Tactile Matter</p>
                <h3 className="mt-2 font-serif-editorial text-xl text-[#F5F3EF]">
                  PBR Reflections
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#92908C]">
                  Anisotropic champagne gold, mirror chrome, and smoked quartz calibrated to
                  studio environment maps.
                </p>
              </div>

              <div>
                <p className="font-mono-tabular text-xs text-[#C6A56B]">03 · Spatial Poise</p>
                <h3 className="mt-2 font-serif-editorial text-xl text-[#F5F3EF]">
                  Kinetic Restraint
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#92908C]">
                  Damped camera choreography and viewport-aware playback engineered for effortless
                  equilibrium.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Visual Transition Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-white/12 bg-[#101010] p-4 sm:p-6">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] w-full overflow-hidden bg-[#050505]">
              <SmartVideo
                src={sphereVideo.src}
                posterAccent={sphereVideo.posterSvgAccent}
                fallbackGradient={sphereVideo.fallbackGradient}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#050505]/30" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono-tabular text-[11px] text-[#C6A56B]">
                    Study II · Morphogenetic Matter
                  </p>
                  <p className="font-serif-editorial text-lg text-[#F5F3EF]">
                    {sphereVideo.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('worlds')}
                  className="border border-white/20 bg-[#050505]/85 px-3.5 py-2 text-xs text-[#F5F3EF] hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Enter Worlds
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#92908C]">
              <span>Chiaroscuro Top-Left Rim Lighting</span>
              <span className="font-mono-tabular text-[#F5F3EF]">2160p · 30fps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
