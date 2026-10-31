import React, { useEffect, useRef, useState } from 'react';
import { shouldRenderFrameAtFps, TARGET_FPS } from '../utils/videoCatalog';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [hasMoved, setHasMoved] = useState<boolean>(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || isReducedMotion) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let initialized = false;
    let rafId = 0;
    let lastFrameMs = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!initialized) {
        ringX = mouseX;
        ringY = mouseY;
        initialized = true;
        setHasMoved(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('button, a, [data-cursor-label]') as HTMLElement | null;
      if (interactiveEl) {
        setIsHoveringInteractive(true);
        const customText = interactiveEl.getAttribute('data-cursor-label') || '';
        setCursorLabel(customText);
      } else {
        setIsHoveringInteractive(false);
        setCursorLabel('');
      }
    };

    const animateRing = (nowMs: number) => {
      if (initialized && shouldRenderFrameAtFps(lastFrameMs, nowMs, TARGET_FPS)) {
        lastFrameMs = nowMs;
        ringX += (mouseX - ringX) * 0.28;
        ringY += (mouseY - ringY) * 0.28;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isEnabled || !hasMoved) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block overflow-hidden" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[#C6A56B] transition-opacity duration-150"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color] duration-200 ${
          cursorLabel
            ? 'h-20 w-20 border-[#C6A56B]/80 bg-[#050505]/85'
            : isHoveringInteractive
            ? 'h-12 w-12 border-[#C6A56B]/70 bg-[#C6A56B]/10'
            : 'h-8 w-8 border-white/25 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="font-mono-tabular text-[10px] tracking-widest text-[#F5F3EF] uppercase">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
};
