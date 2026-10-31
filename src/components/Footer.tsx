import React from 'react';
import { NavSectionId } from './Navbar';

interface FooterProps {
  onNavigate: (sectionId: NavSectionId) => void;
  onOpenArchiveModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenArchiveModal }) => {
  return (
    <footer className="w-full border-t border-white/12 bg-[#050505] py-16 text-xs text-[#92908C]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <div className="flex flex-col gap-2">
          <span className="font-serif-editorial text-xl tracking-[0.26em] text-[#F5F3EF]">
            AETHER
          </span>
          <p className="text-xs text-[#92908C]">
            Beyond Reality · Digital Dimensions, Materials &amp; Spatial Motion
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap"
          >
            Home
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('experience');
            }}
            className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap"
          >
            Experience
          </a>
          <a
            href="#worlds"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('worlds');
            }}
            className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap"
          >
            Worlds
          </a>
          <a
            href="#materials"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('materials');
            }}
            className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap"
          >
            Materials
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('about');
            }}
            className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap"
          >
            About
          </a>
          <button
            type="button"
            onClick={onOpenArchiveModal}
            className="text-[#C6A56B] hover:underline whitespace-nowrap cursor-pointer"
          >
            Curatorial Index
          </button>
        </nav>

        <div className="text-xs text-[#92908C]">
          © {new Date().getFullYear()} AETHER Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
