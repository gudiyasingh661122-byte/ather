import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  MATERIAL_UNIVERSE_STUDIES,
  MaterialStudy,
  getVideoById,
} from '../utils/videoCatalog';
import { AetherSculptureCanvas } from './AetherSculptureCanvas';
import { SmartVideo } from './SmartVideo';

export const Materials: React.FC = () => {
  const [activeStudy, setActiveStudy] = useState<MaterialStudy>(MATERIAL_UNIVERSE_STUDIES[0]);
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);

  const activeVideoMeta = getVideoById(activeStudy.videoId);

  return (
    <section
      id="materials"
      aria-label="Material Universe"
      className="relative w-full bg-[#101010] py-28 md:py-40 border-t border-white/12"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs text-[#92908C]">
                <span className="font-mono-tabular text-[#C6A56B]">05</span>
                <span aria-hidden="true">·</span>
                <span>Material Universe</span>
                <span aria-hidden="true">·</span>
                <span>Interactive 3D &amp; Footage Synthesis</span>
              </div>
              <h2
                className="font-serif-editorial text-[clamp(2.25rem,4.5vw,4.25rem)] font-light leading-[1.08] text-[#F5F3EF]"
                style={{ textWrap: 'balance' }}
              >
                The alchemy of <span className="italic text-[#C6A56B]">surface and light.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm font-light leading-relaxed text-[#92908C]">
              Select any of the five material pillars below to morph the real-time 3D gyroscope
              sculpture and synchronize its corresponding 4K motion plate.
            </p>
          </div>

          {/* 5 Material Pillar Selector Tabs — Single Horizontal Row */}
          <div
            role="tablist"
            aria-label="Material Universe Categories"
            className="flex items-center gap-2 overflow-x-auto border border-white/12 bg-[#050505] p-1.5 w-full sm:w-fit"
          >
            {MATERIAL_UNIVERSE_STUDIES.map((study) => {
              const isSelected = study.id === activeStudy.id;
              return (
                <button
                  key={study.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setActiveStudy(study)}
                  className={`px-4 py-2 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#C6A56B] text-[#050505] font-medium'
                      : 'text-[#92908C] hover:text-[#F5F3EF]'
                  }`}
                >
                  {study.indexLabel}. {study.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Split Showcase: Interactive 3D Gyroscope Viewport + Synchronized 4K Footage Study */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left 7 Columns: Unobstructed 3D Sculpture Viewport + Collapsible Bottom Dock */}
          <div className="relative flex min-h-[480px] lg:min-h-[600px] flex-col justify-between overflow-hidden border border-white/12 bg-[#050505] lg:col-span-7">
            {/* Top-Left Minimal Spec Header */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-5 pointer-events-none">
              <div className="flex items-center gap-2 text-xs text-[#92908C]">
                <span className="font-mono-tabular text-[#C6A56B]">3D ARTIFACT</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F5F3EF]">{activeStudy.name}</span>
              </div>
              <span className="font-mono-tabular text-xs text-[#92908C]">
                Interactive WebGL · Move pointer to orbit
              </span>
            </div>

            {/* 100% Unobstructed Center 3D Scene Viewport */}
            <div className="absolute inset-0 z-0">
              <AetherSculptureCanvas
                activeStudy={activeStudy}
                explodedFactor={explodedFactor}
                rotationSpeedMultiplier={rotationSpeed}
              />
            </div>

            {/* Ergonomic Collapsible Bottom Dock (Solid rgba surface over WebGL, zero backdrop-blur) */}
            <div className="relative z-10 mx-auto mb-4 w-[94%] max-w-[680px]">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setDockCollapsed((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 border border-b-0 border-white/15 bg-[#101010] px-3.5 py-1 text-[11px] text-[#92908C] hover:text-[#F5F3EF] transition-colors cursor-pointer"
                >
                  {dockCollapsed ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5 text-[#C6A56B]" />
                      <span>Show 3D Controls</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5 text-[#C6A56B]" />
                      <span>Hide Controls</span>
                    </>
                  )}
                </button>
              </div>

              {!dockCollapsed && (
                <div className="flex flex-wrap items-center justify-between gap-4 border border-white/15 bg-[#101010] px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="exploded-slider"
                      className="text-xs text-[#92908C] whitespace-nowrap"
                    >
                      Exploded Ring Separation
                    </label>
                    <input
                      id="exploded-slider"
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={explodedFactor}
                      onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
                      className="h-1 w-28 accent-[#C6A56B] cursor-pointer"
                    />
                    <span className="font-mono-tabular text-xs text-[#F5F3EF] w-9">
                      {Math.round(explodedFactor * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#92908C]">Kinematics:</span>
                    {[0, 1, 2].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => setRotationSpeed(spd)}
                        className={`px-2.5 py-1 font-mono-tabular text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          rotationSpeed === spd
                            ? 'bg-[#C6A56B] text-[#050505] font-medium'
                            : 'border border-white/12 text-[#92908C] hover:text-[#F5F3EF]'
                        }`}
                      >
                        {spd === 0 ? 'Static' : `${spd}x`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Synchronized Uploaded Footage Swatch & Optical Readout */}
          <div className="flex flex-col justify-between border border-white/12 bg-[#050505] p-6 md:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#92908C]">
                <span>MATERIAL STUDY {activeStudy.indexLabel} / 05</span>
                <span className="font-mono-tabular text-[#C6A56B]">{activeStudy.category}</span>
              </div>

              <h3 className="mt-3 font-serif-editorial text-3xl font-normal text-[#F5F3EF]">
                {activeStudy.name}
              </h3>
              <p className="mt-1 text-sm italic font-serif-editorial text-[#C6A56B]">
                {activeStudy.headline}
              </p>

              <p className="mt-4 text-sm font-light leading-relaxed text-[#92908C]">
                {activeStudy.description}
              </p>

              {/* Live Reference Footage Swatch */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs text-[#92908C]">
                  <span>Reference 4K Motion Plate</span>
                  <span className="font-mono-tabular text-[#F5F3EF]">
                    {activeVideoMeta.title}
                  </span>
                </div>
                <div className="relative aspect-video w-full overflow-hidden border border-white/12 bg-[#101010]">
                  <SmartVideo
                    key={activeStudy.videoSrc}
                    src={activeStudy.videoSrc}
                    posterAccent={activeVideoMeta.posterSvgAccent}
                    fallbackGradient={activeVideoMeta.fallbackGradient}
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Tabular Optical & Physical Readout */}
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/12 pt-6">
              <div>
                <dt className="text-[11px] text-[#92908C]">Refractive Index</dt>
                <dd className="mt-1 font-mono-tabular text-sm text-[#F5F3EF]">
                  {activeStudy.opticalReadout.refractiveIndex}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-[#92908C]">Reflectance</dt>
                <dd className="mt-1 font-mono-tabular text-sm text-[#C6A56B]">
                  {activeStudy.opticalReadout.specularReflectance}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-[#92908C]">Micro-Roughness</dt>
                <dd className="mt-1 font-mono-tabular text-sm text-[#F5F3EF]">
                  {activeStudy.opticalReadout.surfaceMicroRoughness}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
