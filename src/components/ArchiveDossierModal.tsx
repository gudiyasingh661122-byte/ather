import React, { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { UPLOADED_VIDEO_CATALOG, VideoAssetAnalysis } from '../utils/videoCatalog';
import { SmartVideo } from './SmartVideo';

interface ArchiveDossierModalProps {
  isOpen: boolean;
  initialTab?: 'dossier' | 'portal';
  onClose: () => void;
}

export const ArchiveDossierModal: React.FC<ArchiveDossierModalProps> = ({
  isOpen,
  initialTab = 'dossier',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'portal'>(initialTab);
  const [selectedVideo, setSelectedVideo] = useState<VideoAssetAnalysis>(UPLOADED_VIDEO_CATALOG[0]);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [preferredRealm, setPreferredRealm] = useState('Aureate Continuum');
  const [formError, setFormError] = useState('');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim() || !visitorEmail.includes('@')) {
      setFormError('Please provide your full name and a valid email address.');
      return;
    }
    setFormError('');
    setReservationConfirmed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aether-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 p-4 md:p-8 overflow-y-auto"
    >
      <div className="relative my-auto w-full max-w-6xl border border-white/15 bg-[#101010] p-6 md:p-10">
        {/* Top Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-6">
          <div>
            <p className="font-mono-tabular text-xs text-[#C6A56B]">
              AETHER — CURATORIAL ARCHIVE &amp; PORTAL ACCESS
            </p>
            <h2
              id="aether-modal-heading"
              className="mt-1 font-serif-editorial text-2xl md:text-3xl font-light text-[#F5F3EF]"
            >
              {activeTab === 'dossier'
                ? 'Cinematographic 4K Asset Analysis'
                : 'Enter Private Spatial Exhibition'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex border border-white/12 bg-[#050505] p-1">
              <button
                type="button"
                onClick={() => setActiveTab('dossier')}
                className={`px-3.5 py-1.5 text-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'dossier'
                    ? 'bg-[#C6A56B] text-[#050505] font-medium'
                    : 'text-[#92908C] hover:text-[#F5F3EF]'
                }`}
              >
                4K Footage Dossier (6)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('portal')}
                className={`px-3.5 py-1.5 text-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'portal'
                    ? 'bg-[#C6A56B] text-[#050505] font-medium'
                    : 'text-[#92908C] hover:text-[#F5F3EF]'
                }`}
              >
                Private Viewing Pass
              </button>
            </div>

            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-[#F5F3EF] hover:border-[#C6A56B] hover:text-[#C6A56B] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {activeTab === 'dossier' ? (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Selector List of All 6 Uploaded Videos */}
            <div className="flex flex-col gap-2 lg:col-span-5">
              <p className="mb-2 text-xs text-[#92908C]">
                Select any of the 6 uploaded motion plates to inspect its visual analysis and
                section assignment:
              </p>
              {UPLOADED_VIDEO_CATALOG.map((vid, index) => {
                const isSelected = vid.id === selectedVideo.id;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => setSelectedVideo(vid)}
                    className={`flex flex-col items-start border p-3.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#C6A56B] bg-[#050505]'
                        : 'border-white/10 bg-[#050505]/40 hover:border-white/25'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between text-xs">
                      <span className="font-mono-tabular text-[#C6A56B]">
                        0{index + 1} · {vid.resolutionLabel}
                      </span>
                      <span className="text-[11px] text-[#92908C]">{vid.loopQuality}</span>
                    </div>
                    <p className="mt-1 font-serif-editorial text-lg text-[#F5F3EF]">{vid.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#92908C]">{vid.AssignedSection}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Inspection Pane */}
            <div className="flex flex-col justify-between border border-white/12 bg-[#050505] p-6 lg:col-span-7">
              <div>
                <div className="relative aspect-video w-full overflow-hidden border border-white/12 bg-[#101010]">
                  <SmartVideo
                    key={selectedVideo.src}
                    src={selectedVideo.src}
                    isHero={true}
                    posterAccent={selectedVideo.posterSvgAccent}
                    fallbackGradient={selectedVideo.fallbackGradient}
                    className="h-full w-full"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif-editorial text-2xl text-[#F5F3EF]">
                      {selectedVideo.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {selectedVideo.dominantColors.map((hex) => (
                        <span
                          key={hex}
                          className="inline-flex items-center gap-1.5 border border-white/15 px-2 py-0.5 font-mono-tabular text-[11px] text-[#F5F3EF]"
                        >
                          <span
                            className="h-2.5 w-2.5 border border-white/20"
                            style={{ backgroundColor: hex }}
                          />
                          {hex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-white/12 pt-4 text-xs sm:grid-cols-2">
                    <div>
                      <dt className="text-[#92908C]">Object &amp; Environment</dt>
                      <dd className="mt-1 leading-relaxed text-[#F5F3EF]">
                        {selectedVideo.subjectAndEnvironment}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#92908C]">Camera Movement</dt>
                      <dd className="mt-1 leading-relaxed text-[#F5F3EF]">
                        {selectedVideo.cameraMovement}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#92908C]">Lighting &amp; Specularity</dt>
                      <dd className="mt-1 leading-relaxed text-[#F5F3EF]">
                        {selectedVideo.lighting}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#92908C]">Visual Composition</dt>
                      <dd className="mt-1 leading-relaxed text-[#F5F3EF]">
                        {selectedVideo.composition}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-[#92908C]">
                <span className="font-mono-tabular truncate max-w-[70%]">
                  Asset: {selectedVideo.src}
                </span>
                <span className="text-[#C6A56B]">{selectedVideo.backgroundSuitability}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6 flex flex-col justify-between border border-white/12 bg-[#050505] p-6">
              <div>
                <p className="font-mono-tabular text-xs text-[#C6A56B]">
                  DIMENSION 06 · CELESTIAL SINGULARITY
                </p>
                <h3 className="mt-2 font-serif-editorial text-3xl text-[#F5F3EF]">
                  Request Private Exhibition Credentials
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#92908C]">
                  Reserve an uncompressed 4K spatial viewing session or request the AETHER
                  architectural monograph for your studio or collection.
                </p>
              </div>

              <div className="mt-6 relative aspect-video w-full overflow-hidden border border-white/12">
                <SmartVideo
                  src="/assets/aistudio/4K_The_King_s_Golden_Ring_Motion_Background_2160p_Animation_8c9c7426.mp4"
                  isHero={true}
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-6 border border-white/12 bg-[#050505] p-6 md:p-8">
              {reservationConfirmed ? (
                <div className="flex h-full flex-col items-start justify-center py-8">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#C6A56B] text-[#C6A56B]">
                    <Check className="h-6 w-6" />
                  </div>
                  <p className="mt-6 font-mono-tabular text-xs text-[#C6A56B]">
                    CREDENTIAL ISSUED · AETHER-2026
                  </p>
                  <h4 className="mt-2 font-serif-editorial text-3xl text-[#F5F3EF]">
                    Welcome to the Continuum, {visitorName}.
                  </h4>
                  <p className="mt-3 text-sm text-[#92908C]">
                    Your private viewing key for <span className="text-[#F5F3EF]">{preferredRealm}</span>{' '}
                    has been registered to <span className="text-[#F5F3EF]">{visitorEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setReservationConfirmed(false);
                      onClose();
                    }}
                    className="mt-8 border border-[#C6A56B] bg-[#C6A56B] px-6 py-3 text-xs font-semibold tracking-widest text-[#050505] hover:bg-transparent hover:text-[#F5F3EF] transition-colors cursor-pointer"
                  >
                    Return to Installation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="visitor-name"
                      className="block text-xs tracking-wider text-[#92908C]"
                    >
                      Full Name or Studio
                    </label>
                    <input
                      id="visitor-name"
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Elena Rostova"
                      className="mt-2 w-full border border-white/15 bg-[#101010] px-4 py-3 text-sm text-[#F5F3EF] placeholder:text-[#92908C]/50 focus:border-[#C6A56B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="visitor-email"
                      className="block text-xs tracking-wider text-[#92908C]"
                    >
                      Curatorial Dispatch Email
                    </label>
                    <input
                      id="visitor-email"
                      type="email"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="elena@atelier-aether.art"
                      className="mt-2 w-full border border-white/15 bg-[#101010] px-4 py-3 text-sm text-[#F5F3EF] placeholder:text-[#92908C]/50 focus:border-[#C6A56B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-realm"
                      className="block text-xs tracking-wider text-[#92908C]"
                    >
                      Primary Dimensional Study
                    </label>
                    <select
                      id="preferred-realm"
                      value={preferredRealm}
                      onChange={(e) => setPreferredRealm(e.target.value)}
                      className="mt-2 w-full border border-white/15 bg-[#101010] px-4 py-3 text-sm text-[#F5F3EF] focus:border-[#C6A56B] focus:outline-none"
                    >
                      <option value="Aureate Continuum">01. Aureate Continuum (4K Corridor)</option>
                      <option value="Cellular Monolith">02. Cellular Monolith (4K Chrome Sphere)</option>
                      <option value="Smoked Quartz Caustics">03. Smoked Quartz Caustics (Crystal)</option>
                      <option value="Liquid Chrome Waves">04. Liquid Chrome Continuum (4K Motion)</option>
                    </select>
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs text-[#E57373]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full border border-[#C6A56B] bg-[#C6A56B] px-6 py-3.5 text-xs font-semibold tracking-[0.16em] text-[#050505] hover:bg-transparent hover:text-[#F5F3EF] transition-colors cursor-pointer"
                  >
                    ISSUE PRIVATE EXHIBITION PASS
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
