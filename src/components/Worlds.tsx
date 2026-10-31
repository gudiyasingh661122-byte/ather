import React, { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { DIMENSIONAL_WORLDS, DimensionalWorld, getVideoById } from '../utils/videoCatalog';
import { SmartVideo } from './SmartVideo';

export const Worlds: React.FC = () => {
  const [selectedWorld, setSelectedWorld] = useState<DimensionalWorld | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedWorld) {
        setSelectedWorld(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedWorld]);

  return (
    <section
      id="worlds"
      aria-label="Dimensional Worlds"
      className="relative w-full bg-[#050505] py-28 md:py-40 border-t border-white/12"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-[#92908C]">
              <span className="font-mono-tabular text-[#C6A56B]">04</span>
              <span aria-hidden="true">·</span>
              <span>Dimensional Worlds</span>
              <span aria-hidden="true">·</span>
              <span>Three Spatial Realms</span>
            </div>
            <h2
              className="font-serif-editorial text-[clamp(2.25rem,4.5vw,4.25rem)] font-light leading-[1.08] text-[#F5F3EF]"
              style={{ textWrap: 'balance' }}
            >
              Three realms of <span className="italic text-[#C6A56B]">constructed reality.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base font-light leading-relaxed text-[#92908C]">
            Each realm is inhabited by a distinct 4K motion study—ranging from infinite bronze
            colonnades to morphogenetic spheres and sub-surface quartz dispersion.
          </p>
        </div>

        {/* 3 Immersive World Cards — Zero Video Duplication */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {DIMENSIONAL_WORLDS.map((world) => {
            const videoMeta = getVideoById(world.videoId);
            return (
              <article
                key={world.id}
                className="group relative flex flex-col justify-between border border-white/12 bg-[#101010] transition-colors duration-300 hover:border-[#C6A56B]/60"
              >
                {/* Cinematic Video Viewport with Subtle Hover Scale */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <SmartVideo
                      src={world.src}
                      posterAccent={videoMeta.posterSvgAccent}
                      fallbackGradient={videoMeta.fallbackGradient}
                      filterStyle={world.filterPreset}
                      className="h-full w-full"
                    />
                  </div>

                  {/* Measured Dark Gradient Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

                  {/* Top Numbered Label & Specs */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs">
                    <span className="font-mono-tabular text-sm text-[#C6A56B]">
                      {world.indexLabel}
                    </span>
                    <span className="font-mono-tabular text-[11px] text-[#F5F3EF]/75">
                      {videoMeta.resolutionLabel}
                    </span>
                  </div>

                  {/* Bottom Title & Description Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs text-[#C6A56B] mb-1.5">{world.subtitle}</p>
                    <h3 className="font-serif-editorial text-3xl font-normal text-[#F5F3EF]">
                      {world.indexLabel}. {world.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-[#F5F3EF]/80">
                      {world.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/12 flex items-center justify-between text-xs text-[#92908C]">
                      <span>{world.lightIndex}</span>
                      <button
                        type="button"
                        data-cursor-label="Inspect"
                        onClick={() => setSelectedWorld(world)}
                        className="inline-flex items-center gap-1.5 font-medium text-[#F5F3EF] group-hover:text-[#C6A56B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6A56B]"
                      >
                        <span>Enter World {world.indexLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Dimensional World Inspector Modal */}
      {selectedWorld && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="world-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 p-4 md:p-10"
        >
          <div className="relative flex w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-[#101010] lg:flex-row">
            {/* Large 4K Video Preview */}
            <div className="relative aspect-video lg:aspect-auto lg:w-7/12 min-h-[300px] bg-[#050505]">
              <SmartVideo
                src={selectedWorld.src}
                isHero={true}
                filterStyle={selectedWorld.filterPreset}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
            </div>

            {/* Curatorial Details Column */}
            <div className="flex flex-col justify-between p-6 md:p-10 lg:w-5/12">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-tabular text-xs text-[#C6A56B]">
                    REALM {selectedWorld.indexLabel} · IMMERSIVE INSPECTION
                  </span>
                  <button
                    type="button"
                    aria-label="Close realm inspector"
                    onClick={() => setSelectedWorld(null)}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-[#F5F3EF] hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <h3
                  id="world-modal-title"
                  className="mt-4 font-serif-editorial text-3xl md:text-4xl font-light text-[#F5F3EF]"
                >
                  {selectedWorld.title}
                </h3>
                <p className="mt-1 text-xs text-[#C6A56B]">{selectedWorld.subtitle}</p>

                <p className="mt-5 text-sm font-light leading-relaxed text-[#F5F3EF]/85">
                  {selectedWorld.description}
                </p>

                <dl className="mt-8 space-y-4 border-t border-white/12 pt-6 text-xs">
                  <div>
                    <dt className="text-[#92908C]">Architectural Notes</dt>
                    <dd className="mt-1 text-[#F5F3EF]">{selectedWorld.architecturalNotes}</dd>
                  </div>
                  <div className="flex justify-between border-t border-white/8 pt-3">
                    <dt className="text-[#92908C]">Illumination Spectrum</dt>
                    <dd className="font-mono-tabular text-[#F5F3EF]">{selectedWorld.lightIndex}</dd>
                  </div>
                  <div className="flex justify-between border-t border-white/8 pt-3">
                    <dt className="text-[#92908C]">Acoustic Resonance</dt>
                    <dd className="font-mono-tabular text-[#C6A56B]">{selectedWorld.acousticsLabel}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/12 pt-6">
                <div className="flex gap-2">
                  {DIMENSIONAL_WORLDS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWorld(w)}
                      className={`px-3 py-1.5 font-mono-tabular text-xs transition-colors cursor-pointer ${
                        w.id === selectedWorld.id
                          ? 'bg-[#C6A56B] text-[#050505] font-medium'
                          : 'border border-white/12 text-[#92908C] hover:text-[#F5F3EF]'
                      }`}
                    >
                      {w.indexLabel}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedWorld(null)}
                  className="border border-white/20 px-4 py-2 text-xs text-[#F5F3EF] hover:border-[#C6A56B] transition-colors cursor-pointer"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
