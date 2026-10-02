import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Star, Sparkles, MapPin, Clock, Coffee, ChevronRight } from 'lucide-react';
import {
  CuteBeanSticker,
  SmilingCoffeeCup,
  SteamHeart,
  RetroStampBadge,
} from './Stickers';

// Import photorealistic edge-to-edge vintage café assets
import exteriorImg from '../assets/images/vintage_cafe_exterior_1790980976280.jpg';
import counterImg from '../assets/images/vintage_cafe_interior_counter_1790980990542.jpg';
import boothImg from '../assets/images/vintage_cafe_table_nook_1790981005606.jpg';
import coffeeImg from '../assets/images/vintage_cafe_table_coffee_1790981017756.jpg';

gsap.registerPlugin(ScrollTrigger);

interface WalkthroughScene {
  id: string;
  step: string;
  chapter: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  alt: string;
  sticker: React.ReactNode;
}

const SCENES: WalkthroughScene[] = [
  {
    id: 'exterior',
    step: '01 / 04',
    chapter: 'THE STREET',
    title: 'Sip Happy. Step Into Yesterday.',
    subtitle: 'A vintage sanctuary in the heart of the Arts District.',
    tagline: 'Single-origin beans, 18-hour cold steeps, and warm wooden tables.',
    image: exteriorImg,
    alt: 'Vintage European style café exterior with gold leaf lettering on dark wood facade',
    sticker: <RetroStampBadge text="EST. 2018 · LA" className="scale-90" />,
  },
  {
    id: 'counter',
    step: '02 / 04',
    chapter: 'THE HERITAGE BAR',
    title: 'Steam, Oak & Polished Brass',
    subtitle: 'Every shot pulled on manual lever machines.',
    tagline: 'Listen to the gentle hiss of espresso and the jazz playing from the turntable.',
    image: counterImg,
    alt: 'First-person walk-in view of vintage café counter with copper espresso machine and Edison lamps',
    sticker: <SmilingCoffeeCup className="w-12 h-12" />,
  },
  {
    id: 'booth',
    step: '03 / 04',
    chapter: 'THE SUNLIT NOOK',
    title: 'Find Your Corner. Take a Breath.',
    subtitle: 'Cognac leather booths and marble bistro tables.',
    tagline: 'Where unhurried conversations meet slow-crafted specialty drinks.',
    image: boothImg,
    alt: 'Walking towards a cozy vintage leather corner booth with marble table and green banker lamp',
    sticker: <CuteBeanSticker className="w-12 h-12" />,
  },
  {
    id: 'table',
    step: '04 / 04',
    chapter: 'YOUR TABLE IS READY',
    title: 'Poured Cold. Served With Love.',
    subtitle: 'Fluted glass of 18h cold brew with velvety oat milk.',
    tagline: 'The ice is crunchy, the froth is cloud-soft, and your table is waiting.',
    image: coffeeImg,
    alt: 'Close-up of iced cold brew with swirling oat milk and espresso cup on vintage marble table',
    sticker: <SteamHeart className="w-12 h-12" />,
  },
];

export const VintageHeroWalkthrough: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isPouringToMenu, setIsPouringToMenu] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!section || !pinWrapper) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=400%', // 4 viewport heights of buttery-smooth edge-to-edge walkthrough
        pin: pinWrapper,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollPercent(p);

          // 4 scenes mapped across scroll progress
          if (p < 0.26) {
            setActiveIdx(0);
            setIsPouringToMenu(false);
          } else if (p < 0.52) {
            setActiveIdx(1);
            setIsPouringToMenu(false);
          } else if (p < 0.78) {
            setActiveIdx(2);
            setIsPouringToMenu(false);
          } else if (p < 0.92) {
            setActiveIdx(3);
            setIsPouringToMenu(false);
          } else {
            // Final transition: dive directly into the menu
            setActiveIdx(3);
            setIsPouringToMenu(true);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const currentScene = SCENES[activeIdx];

  const handleSkipToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero-walkthrough"
      className="relative w-full bg-[#1A120B] text-white overflow-hidden"
    >
      {/* PINNED FULLSCREEN VIEWPORT CONTAINER (100vw x 100vh) */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden select-none"
      >
        {/* FULL BLEED BACKGROUND WALKTHROUGH IMAGES WITH CAMERA PUSH-IN */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {SCENES.map((scene, idx) => {
            const isCurrent = activeIdx === idx;
            // Progressive camera zoom as user scrolls through each scene
            const scaleAmount = 1 + (scrollPercent * 0.2);

            return (
              <div
                key={scene.id}
                style={{
                  opacity: isCurrent ? 1 : 0,
                  transform: `scale(${isCurrent ? (isPouringToMenu ? 1.15 : scaleAmount) : 1.05})`,
                  transition: 'opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s ease-out',
                }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <img
                  src={scene.image}
                  alt={scene.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Film grain and realistic warm vintage grade vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
              </div>
            );
          })}
        </div>

        {/* TOP STATUS BAR (OVERLAY) */}
        <div className="absolute top-0 inset-x-0 z-30 pt-6 px-6 sm:px-12 flex items-center justify-between">
          {/* Brand & Location */}
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#FFF8F0] drop-shadow-md">
              BREW CREW
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F4D06F]">
              <MapPin className="w-3 h-3 text-[#E07A5F]" />
              <span>Arts District · 742 S Santa Fe Ave</span>
            </div>
          </div>

          {/* Progress Tracker & Quick Jump to Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
              <span className="font-mono text-xs font-bold text-[#F4D06F]">
                {currentScene.step}
              </span>
              <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F4D06F] transition-all duration-150"
                  style={{ width: `${Math.round(scrollPercent * 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleSkipToMenu}
              className="px-4 py-1.5 bg-white/15 hover:bg-white text-white hover:text-[#3B2417] text-xs font-semibold rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              Skip to Menu
            </button>
          </div>
        </div>

        {/* CENTER / LOWER MAIN CONTENT OVERLAY */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 sm:pb-20 px-6 sm:px-16 max-w-5xl">
          <div className="space-y-4 max-w-2xl">
            {/* Scene Kicker Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold tracking-widest uppercase text-[#F4D06F] shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-ping" />
              <span>{currentScene.chapter}</span>
            </div>

            {/* Giant Cinematic Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.08] drop-shadow-xl [text-wrap:balance]">
              {currentScene.title}
            </h1>

            {/* Handwritten Mood Subtitle */}
            <p className="text-lg sm:text-2xl font-hand text-[#F4D06F] text-3xl leading-snug drop-shadow-md">
              "{currentScene.subtitle}"
            </p>

            {/* Atmospheric Tagline */}
            <p className="text-sm sm:text-base text-[#FAF1E6]/90 max-w-xl leading-relaxed drop-shadow-sm font-sans">
              {currentScene.tagline}
            </p>

            {/* Interactive Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="px-7 py-3.5 bg-[#8B5E3C] hover:bg-[#F4D06F] text-white hover:text-[#3B2417] text-sm font-display font-bold rounded-2xl shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border border-white/20"
              >
                <span>View Today’s Menu</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Social Proof Pill */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-white">
                <div className="flex text-[#F4D06F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#F4D06F]">4.9</span>
                <span className="text-white/60">· 1,200+ local regulars</span>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING CUTE STICKER IN TOP-RIGHT OR MID-RIGHT */}
        <div className="absolute right-8 sm:right-16 bottom-24 sm:bottom-28 z-20 hidden md:block">
          <div className="transform hover:rotate-12 transition-transform duration-300">
            {currentScene.sticker}
          </div>
        </div>

        {/* BOTTOM WALKTHROUGH CONTROLS & SCROLL PROMPT */}
        <div className="absolute bottom-6 inset-x-0 z-30 px-6 sm:px-12 flex items-center justify-between text-xs text-white/80">
          {/* Scene selector tabs */}
          <div className="flex items-center gap-2">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  const targetScroll = sectionRef.current?.offsetTop || 0;
                  const stepOffset = (idx / 4) * (sectionRef.current?.offsetHeight || 0) * 0.85;
                  window.scrollTo({
                    top: targetScroll + stepOffset,
                    behavior: 'smooth',
                  });
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-[#F4D06F] text-[#3B2417] font-bold shadow-md'
                    : 'bg-black/35 hover:bg-black/60 text-white/80'
                }`}
              >
                <span>{scene.step.split(' ')[0]}</span>
                <span className="hidden sm:inline ml-1.5">{scene.chapter}</span>
              </button>
            ))}
          </div>

          {/* Down Scroll Indicator */}
          <a
            href="#menu"
            className="flex items-center gap-2 hover:text-[#F4D06F] transition-colors cursor-pointer group"
          >
            <span className="font-hand text-base text-[#F4D06F]">
              {isPouringToMenu ? 'Entering Menu' : 'Scroll down to walk through'}
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#F4D06F]" />
          </a>
        </div>

        {/* FINAL TRANSITION SPLASH OVERLAY: Dissolves into the Menu */}
        {isPouringToMenu && (
          <div className="absolute inset-0 z-40 bg-gradient-to-b from-[#3B2417]/95 via-[#2E1A0F]/95 to-[#1A0D07]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 text-white space-y-5 animate-fadeIn">
            <div className="relative">
              <SmilingCoffeeCup className="w-20 h-20 animate-bounce" />
              <div className="absolute -top-2 -right-3">
                <SteamHeart className="w-8 h-8" />
              </div>
            </div>

            <RetroStampBadge text="TABLE SERVED · ARTISANAL ROAST" />

            <h2 className="text-3xl sm:text-6xl font-bold font-display tracking-tight text-[#FFF8F0] [text-wrap:balance]">
              Your seat is saved. <br />
              <span className="text-[#F4D06F]">Here’s what’s brewing today.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#E8D2BA] max-w-lg font-hand text-2xl">
              "Single-origin cold brews, velvety espresso flat whites, and fresh flaky pastries."
            </p>

            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-9 py-4 bg-[#F4D06F] hover:bg-white text-[#3B2417] text-base font-bold font-display rounded-2xl shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Step Up to the Menu</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
