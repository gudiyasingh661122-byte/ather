import React, { useEffect, useRef, useState } from 'react';
import { createLuxuryPosterDataUri, shouldVideoPlay } from '../utils/videoCatalog';

interface SmartVideoProps {
  src: string;
  isHero?: boolean;
  posterAccent?: string;
  fallbackGradient?: string;
  filterStyle?: string;
  playbackRate?: number;
  isUserPaused?: boolean;
  className?: string;
  onStatusChange?: (status: { isPlaying: boolean; isLoaded: boolean }) => void;
}

export const SmartVideo: React.FC<SmartVideoProps> = ({
  src,
  isHero = false,
  posterAccent = '#C6A56B',
  fallbackGradient = 'radial-gradient(circle at 50% 50%, rgba(198,165,107,0.16), #050505 75%)',
  filterStyle,
  playbackRate = 1,
  isUserPaused = false,
  className = '',
  onStatusChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadSource, setShouldLoadSource] = useState<boolean>(isHero);
  const [isInViewport, setIsInViewport] = useState<boolean>(isHero);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const posterUri = React.useMemo(
    () => createLuxuryPosterDataUri(posterAccent),
    [posterAccent]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Observer 1: Lazy-load video source slightly before entering viewport
    const loadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadSource(true);
          }
        });
      },
      { rootMargin: '320px 0px', threshold: 0.01 }
    );

    // Observer 2: Play/pause strictly when in or out of viewport
    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { rootMargin: '40px 0px', threshold: 0.1 }
    );

    loadObserver.observe(el);
    playObserver.observe(el);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadSource) return;
    video.playbackRate = playbackRate;
  }, [playbackRate, shouldLoadSource]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadSource || hasError) return;

    const canPlay = shouldVideoPlay({
      isInViewport,
      prefersReducedMotion,
      isUserPaused,
    });

    if (canPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            onStatusChange?.({ isPlaying: true, isLoaded });
          })
          .catch(() => {
            // Autoplay fallback or interrupted load
            onStatusChange?.({ isPlaying: false, isLoaded });
          });
      }
    } else {
      video.pause();
      onStatusChange?.({ isPlaying: false, isLoaded });
    }
  }, [isInViewport, prefersReducedMotion, isUserPaused, shouldLoadSource, isLoaded, hasError]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#050505] ${className}`}
      style={{ backgroundImage: fallbackGradient }}
    >
      {!hasError && (
        <video
          ref={videoRef}
          src={shouldLoadSource ? src : undefined}
          poster={posterUri}
          preload={isHero ? 'auto' : 'none'}
          muted
          playsInline
          loop
          autoPlay={isHero && !prefersReducedMotion}
          onLoadedData={() => {
            setIsLoaded(true);
            onStatusChange?.({ isPlaying: !videoRef.current?.paused, isLoaded: true });
          }}
          onError={() => setHasError(true)}
          style={filterStyle ? { filter: filterStyle } : undefined}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-85'
          }`}
        />
      )}
    </div>
  );
};
