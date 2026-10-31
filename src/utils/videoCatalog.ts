export interface VideoAssetAnalysis {
  id: string;
  filename: string;
  src: string;
  title: string;
  AssignedSection: string;
  subjectAndEnvironment: string;
  cameraMovement: string;
  dominantColors: string[];
  lighting: string;
  composition: string;
  backgroundSuitability: 'Primary Full-Bleed' | 'Editorial Panel & Backdrop' | 'Portal & Showcase';
  loopQuality: 'Seamless Continuous' | 'Organic Cycle' | 'Hypnotic Pulse';
  resolutionLabel: string;
  aspectRatio: string;
  scrimStyle: string;
  fallbackGradient: string;
  posterSvgAccent: string;
}

export interface DimensionalWorld {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  description: string;
  videoId: string;
  src: string;
  architecturalNotes: string;
  acousticsLabel: string;
  lightIndex: string;
  filterPreset: string;
}

export interface MaterialStudy {
  id: string;
  indexLabel: string;
  name: string;
  category: 'Chrome' | 'Glass' | 'Metallic Reflections' | 'Architecture' | 'Light and Shadow';
  headline: string;
  description: string;
  videoId: string;
  videoSrc: string;
  pbrConfig: {
    color: string;
    metalness: number;
    roughness: number;
    clearcoat: number;
    transmission: number;
    ior: number;
    anisotropy: number;
    emissive: string;
  };
  opticalReadout: {
    refractiveIndex: string;
    specularReflectance: string;
    surfaceMicroRoughness: string;
  };
}

export function createLuxuryPosterDataUri(accentHex: string, primaryHex = '#050505', secondaryHex = '#101010'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${accentHex}" stop-opacity="0.18"/>
        <stop offset="55%" stop-color="${secondaryHex}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${primaryHex}" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentHex}" stop-opacity="0"/>
        <stop offset="50%" stop-color="${accentHex}" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="${accentHex}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="${primaryHex}"/>
    <rect width="1600" height="900" fill="url(#g)"/>
    <line x1="180" y1="0" x2="1420" y2="900" stroke="url(#line)" stroke-width="1"/>
    <circle cx="800" cy="450" r="240" fill="none" stroke="${accentHex}" stroke-opacity="0.12" stroke-width="1"/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const UPLOADED_VIDEO_CATALOG: VideoAssetAnalysis[] = [
  {
    id: 'obsidian-gold-geometry',
    filename: 'Abstract_gold_stripe_geometric_black_gold_background_a823be56.mp4',
    src: '/assets/aistudio/Abstract_gold_stripe_geometric_black_gold_background_a823be56.mp4',
    title: 'Tectonic Obsidian & Gold Planes',
    AssignedSection: 'Section 01 — Cinematic Hero & Section 05 — Metallic Reflections',
    subjectAndEnvironment: 'Intersecting matte-black architectural monolith plates with razor-thin champagne-gold specular seams in a dark studio void.',
    cameraMovement: 'Poised diagonal orthographic glide following tectonic plate intersections.',
    dominantColors: ['#050505', '#101010', '#C6A56B'],
    lighting: 'Grazing rim highlights along beveled metallic edges against deep matte shadow planes.',
    composition: 'Diagonal V-axis convergence framing a tranquil dark center ideal for monumental editorial typography.',
    backgroundSuitability: 'Primary Full-Bleed',
    loopQuality: 'Seamless Continuous',
    resolutionLabel: '4K UHD · 2160p',
    aspectRatio: '16:9',
    scrimStyle: 'bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/50',
    fallbackGradient: 'radial-gradient(circle at 60% 40%, rgba(198,165,107,0.16), #050505 75%)',
    posterSvgAccent: '#C6A56B',
  },
  {
    id: 'liquid-chrome-waves',
    filename: 'Liquid_Chrome_Waves___Metallic_Motion_Background___Free_to_Use__1__0e54a6c4.mp4',
    src: '/assets/aistudio/Liquid_Chrome_Waves___Metallic_Motion_Background___Free_to_Use__1__0e54a6c4.mp4',
    title: 'Liquid Mercury Ribbon Continuum',
    AssignedSection: 'Section 03 — The Art of Motion & Section 05 — Chrome',
    subjectAndEnvironment: 'Undulating ribbons of mirror-polished liquid chrome and translucent metallic waves suspended in a zero-gravity black void.',
    cameraMovement: 'Fixed wide anamorphic lens capturing lateral fluid wave propagation and folding laminar crests.',
    dominantColors: ['#050505', '#D8D8D8', '#C6A56B'],
    lighting: 'High-contrast studio softbox reflections with warm champagne-gold and cool silver grazing speculars.',
    composition: 'Horizontal sinusoidal flow occupying the full frame width with deep black negative space above and below.',
    backgroundSuitability: 'Primary Full-Bleed',
    loopQuality: 'Organic Cycle',
    resolutionLabel: '4K UHD · 2160p',
    aspectRatio: '16:9',
    scrimStyle: 'bg-gradient-to-b from-[#050505]/80 via-[#050505]/25 to-[#050505]/85',
    fallbackGradient: 'radial-gradient(circle at 50% 50%, rgba(245,243,239,0.15), #050505 75%)',
    posterSvgAccent: '#E2E0DC',
  },
  {
    id: 'monochrome-chrome-sphere',
    filename: '3D_Monochrome_Abstract_Art___Surreal_Chrome_Sphere_Animation_in_4K_e62845ac.mp4',
    src: '/assets/aistudio/3D_Monochrome_Abstract_Art___Surreal_Chrome_Sphere_Animation_in_4K_e62845ac.mp4',
    title: 'Eroding Cellular Monolith Sphere',
    AssignedSection: 'Section 02 — Introduction, Section 04 — World 02 & Section 05 — Light and Shadow',
    subjectAndEnvironment: 'Surreal monochrome sphere undergoing continuous internal cellular erosion and topological reformation in pure pitch darkness.',
    cameraMovement: 'Locked centered study allowing the sculptural internal excavation and rotation of the sphere to command attention.',
    dominantColors: ['#050505', '#F5F3EF', '#5A5955'],
    lighting: 'Dramatic top-left directional chiaroscuro key light casting deep internal cavity shadows.',
    composition: 'Strict central planetary framing surrounded by expansive obsidian negative space.',
    backgroundSuitability: 'Editorial Panel & Backdrop',
    loopQuality: 'Organic Cycle',
    resolutionLabel: '4K UHD · 2160p',
    aspectRatio: '16:9',
    scrimStyle: 'bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60',
    fallbackGradient: 'radial-gradient(circle at 50% 45%, rgba(245,243,239,0.18), #050505 65%)',
    posterSvgAccent: '#92908C',
  },
  {
    id: 'golden-futuristic-corridor',
    filename: 'Golden_Futuristic_Corridor_No_Copyright_Loop_4K_8cac9632.mp4',
    src: '/assets/aistudio/Golden_Futuristic_Corridor_No_Copyright_Loop_4K_8cac9632.mp4',
    title: 'Aureate Architectural Continuum',
    AssignedSection: 'Section 04 — Dimensional Worlds (01) & Section 05 — Architecture',
    subjectAndEnvironment: 'Monumental brutalist-luxury corridor of vertical bronze-gold monoliths with suspended luminous spheres and dark reflective flooring.',
    cameraMovement: 'Continuous stabilized forward dolly toward a vanishing-point horizon.',
    dominantColors: ['#101010', '#C6A56B', '#6E532B'],
    lighting: 'Volumetric golden shafts and warm architectural uplighting reflecting off polished dark obsidian stone.',
    composition: 'One-point architectural perspective with strong vertical colonnade rhythm.',
    backgroundSuitability: 'Editorial Panel & Backdrop',
    loopQuality: 'Seamless Continuous',
    resolutionLabel: '4K UHD · 2160p',
    aspectRatio: '16:9',
    scrimStyle: 'bg-gradient-to-t from-[#050505]/90 via-[#050505]/35 to-[#050505]/50',
    fallbackGradient: 'radial-gradient(circle at 50% 50%, rgba(198,165,107,0.22), #050505 75%)',
    posterSvgAccent: '#C6A56B',
  },
  {
    id: 'reflective-ice-crystal',
    filename: 'Moving_Reflective_Multicolored_Ice_Glass_Crystal_Background_Animation_Loop1080p_cd7e26e8.mp4',
    src: '/assets/aistudio/Moving_Reflective_Multicolored_Ice_Glass_Crystal_Background_Animation_Loop1080p_cd7e26e8.mp4',
    title: 'Dichroic Smoked Quartz Refraction',
    AssignedSection: 'Section 04 — Dimensional Worlds (03) & Section 05 — Glass',
    subjectAndEnvironment: 'Macro internal view of cut crystalline glass facets refracting spectral caustics across internal cleavage planes.',
    cameraMovement: 'Slow internal angular drift shifting refractive index paths and light dispersion.',
    dominantColors: ['#101010', '#9B6B9E', '#C6A56B'],
    lighting: 'Internal transmitted light dispersing through multi-layered optical crystal facets, toned down with a smoked obsidian filter.',
    composition: 'Abstract all-over geometric facet field with layered depth planes.',
    backgroundSuitability: 'Editorial Panel & Backdrop',
    loopQuality: 'Seamless Continuous',
    resolutionLabel: 'FHD · 1080p',
    aspectRatio: '16:9',
    scrimStyle: 'bg-gradient-to-t from-[#050505]/95 via-[#050505]/55 to-[#050505]/70',
    fallbackGradient: 'radial-gradient(circle at 50% 50%, rgba(155,107,158,0.18), #050505 75%)',
    posterSvgAccent: '#A38DA8',
  },
  {
    id: 'golden-ring-portal',
    filename: '4K_The_King_s_Golden_Ring_Motion_Background_2160p_Animation_8c9c7426.mp4',
    src: '/assets/aistudio/4K_The_King_s_Golden_Ring_Motion_Background_2160p_Animation_8c9c7426.mp4',
    title: 'Celestial Aureate Singularity',
    AssignedSection: 'Section 06 — Final Experience ("Enter The Unknown")',
    subjectAndEnvironment: 'Concentric golden orbital rings and fine ember particles suspended in deep cosmos around a dark event horizon.',
    cameraMovement: 'Axial portal traversal zooming through rotating golden rings into the central void.',
    dominantColors: ['#050505', '#C6A56B', '#E5C17B'],
    lighting: 'Self-luminous golden ring filaments and subtle starlight dust against pure black space.',
    composition: 'Radial symmetry with a deep dark central eye that naturally frames centered finale typography.',
    backgroundSuitability: 'Portal & Showcase',
    loopQuality: 'Hypnotic Pulse',
    resolutionLabel: '4K UHD · 2160p',
    aspectRatio: '16:9',
    scrimStyle: 'bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/80',
    fallbackGradient: 'radial-gradient(circle at 50% 50%, rgba(198,165,107,0.24), #050505 70%)',
    posterSvgAccent: '#C6A56B',
  },
];

export const DIMENSIONAL_WORLDS: DimensionalWorld[] = [
  {
    id: 'world-corridor',
    indexLabel: '01',
    title: 'Aureate Continuum',
    subtitle: 'Infinite Architectural Perspective',
    description: 'A monumental colonnade of brushed bronze monoliths and volumetric light shafts receding into an endless horizon of quiet symmetry.',
    videoId: 'golden-futuristic-corridor',
    src: '/assets/aistudio/Golden_Futuristic_Corridor_No_Copyright_Loop_4K_8cac9632.mp4',
    architecturalNotes: 'One-point linear perspective with 14-meter vertical monoliths and mirror-polished obsidian flooring.',
    acousticsLabel: 'Cathedral Sub-Bass · 38 Hz',
    lightIndex: 'Volumetric 2700K Warm Gold',
    filterPreset: 'brightness(0.88) contrast(1.12) saturate(0.82)',
  },
  {
    id: 'world-sphere',
    indexLabel: '02',
    title: 'Cellular Monolith',
    subtitle: 'Morphogenetic Matter in Vacuum',
    description: 'An autonomous monochrome planetoid continuously excavating and rebuilding its porous metallic lattice under stark chiaroscuro illumination.',
    videoId: 'monochrome-chrome-sphere',
    src: '/assets/aistudio/3D_Monochrome_Abstract_Art___Surreal_Chrome_Sphere_Animation_in_4K_e62845ac.mp4',
    architecturalNotes: 'Procedural reaction-diffusion erosion suspended in a zero-gravity acoustic chamber.',
    acousticsLabel: 'Anechoic Chamber · 0 dB Floor',
    lightIndex: 'Directional Rim 5600K Pure White',
    filterPreset: 'brightness(0.95) contrast(1.18) grayscale(1)',
  },
  {
    id: 'world-crystal',
    indexLabel: '03',
    title: 'Smoked Quartz Caustics',
    subtitle: 'Internal Crystalline Dispersion',
    description: 'Sub-surface optical traversal through dark faceted quartz where internal reflections split ambient light into muted spectral bands.',
    videoId: 'reflective-ice-crystal',
    src: '/assets/aistudio/Moving_Reflective_Multicolored_Ice_Glass_Crystal_Background_Animation_Loop1080p_cd7e26e8.mp4',
    architecturalNotes: 'Multi-axis cleavage planes with high index of refraction (IOR 2.14) and smoked obsidian attenuation.',
    acousticsLabel: 'Harmonic Glass Resonance · 432 Hz',
    lightIndex: 'Prismatic Internal Dispersion',
    filterPreset: 'brightness(0.68) contrast(1.22) saturate(0.45) hue-rotate(-15deg)',
  },
];

export const MATERIAL_UNIVERSE_STUDIES: MaterialStudy[] = [
  {
    id: 'mat-chrome',
    indexLabel: '01',
    name: 'Liquid Chrome',
    category: 'Chrome',
    headline: 'Zero-porosity mirror metal in laminar motion.',
    description: 'Derived from the undulating ribbons of our 4K Liquid Chrome footage, this surface pairs near-unity specular reflectance with fluid surface tension.',
    videoId: 'liquid-chrome-waves',
    videoSrc: '/assets/aistudio/Liquid_Chrome_Waves___Metallic_Motion_Background___Free_to_Use__1__0e54a6c4.mp4',
    pbrConfig: {
      color: '#EAE8E3',
      metalness: 1.0,
      roughness: 0.06,
      clearcoat: 1.0,
      transmission: 0,
      ior: 1.5,
      anisotropy: 0.35,
      emissive: '#000000',
    },
    opticalReadout: {
      refractiveIndex: '2.92 (Complex Cr)',
      specularReflectance: '98.4%',
      surfaceMicroRoughness: '0.06 Ra',
    },
  },
  {
    id: 'mat-glass',
    indexLabel: '02',
    name: 'Obsidian & Smoked Glass',
    category: 'Glass',
    headline: 'High-index refraction veiled in dark mineral tint.',
    description: 'Inspired by the internal cleavage planes of our Crystalline Glass footage, attenuated through smoked carbon glass to preserve nocturnal contrast.',
    videoId: 'reflective-ice-crystal',
    videoSrc: '/assets/aistudio/Moving_Reflective_Multicolored_Ice_Glass_Crystal_Background_Animation_Loop1080p_cd7e26e8.mp4',
    pbrConfig: {
      color: '#232126',
      metalness: 0.1,
      roughness: 0.08,
      clearcoat: 1.0,
      transmission: 0.92,
      ior: 2.1,
      anisotropy: 0.1,
      emissive: '#0a080c',
    },
    opticalReadout: {
      refractiveIndex: '2.14 IOR',
      specularReflectance: '64.0%',
      surfaceMicroRoughness: '0.08 Ra',
    },
  },
  {
    id: 'mat-reflections',
    indexLabel: '03',
    name: 'Champagne Gold Anisotropy',
    category: 'Metallic Reflections',
    headline: 'Micro-brushed aureate alloy catching grazing light.',
    description: 'Echoing the razor-thin golden seams of our Geometric Black & Gold footage, calibrated to #C6A56B with directional anisotropic highlights.',
    videoId: 'obsidian-gold-geometry',
    videoSrc: '/assets/aistudio/Abstract_gold_stripe_geometric_black_gold_background_a823be56.mp4',
    pbrConfig: {
      color: '#C6A56B',
      metalness: 0.96,
      roughness: 0.16,
      clearcoat: 0.6,
      transmission: 0,
      ior: 1.5,
      anisotropy: 0.85,
      emissive: '#140f05',
    },
    opticalReadout: {
      refractiveIndex: '0.47 (Au Alloy)',
      specularReflectance: '94.2%',
      surfaceMicroRoughness: '0.16 Ra',
    },
  },
  {
    id: 'mat-architecture',
    indexLabel: '04',
    name: 'Monolithic Bronze Structure',
    category: 'Architecture',
    headline: 'Spatial permanence carved from dark anodized alloy.',
    description: 'Drawn from our Futuristic Corridor sequence, combining towering structural planes with warm atmospheric grazing reflections.',
    videoId: 'golden-futuristic-corridor',
    videoSrc: '/assets/aistudio/Golden_Futuristic_Corridor_No_Copyright_Loop_4K_8cac9632.mp4',
    pbrConfig: {
      color: '#7A6342',
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.4,
      transmission: 0,
      ior: 1.5,
      anisotropy: 0.6,
      emissive: '#080603',
    },
    opticalReadout: {
      refractiveIndex: '1.18 (Anodized)',
      specularReflectance: '81.5%',
      surfaceMicroRoughness: '0.28 Ra',
    },
  },
  {
    id: 'mat-chiaroscuro',
    indexLabel: '05',
    name: 'Chiaroscuro Matte Carbon',
    category: 'Light and Shadow',
    headline: 'Porous acoustic matter sculpted by shadow.',
    description: 'Directly informed by the Eroding Monochrome Sphere 4K study, where light defines form only at the threshold of deep cavity shadow.',
    videoId: 'monochrome-chrome-sphere',
    videoSrc: '/assets/aistudio/3D_Monochrome_Abstract_Art___Surreal_Chrome_Sphere_Animation_in_4K_e62845ac.mp4',
    pbrConfig: {
      color: '#3A3937',
      metalness: 0.45,
      roughness: 0.58,
      clearcoat: 0.15,
      transmission: 0,
      ior: 1.5,
      anisotropy: 0.2,
      emissive: '#000000',
    },
    opticalReadout: {
      refractiveIndex: '2.42 (Carbon)',
      specularReflectance: '42.0%',
      surfaceMicroRoughness: '0.58 Ra',
    },
  },
];

export function getVideoById(id: string): VideoAssetAnalysis {
  const found = UPLOADED_VIDEO_CATALOG.find((v) => v.id === id);
  return found ?? UPLOADED_VIDEO_CATALOG[0];
}

export function shouldVideoPlay(params: {
  isInViewport: boolean;
  prefersReducedMotion: boolean;
  isUserPaused: boolean;
}): boolean {
  if (params.isUserPaused) return false;
  if (params.prefersReducedMotion) return false;
  return params.isInViewport;
}
