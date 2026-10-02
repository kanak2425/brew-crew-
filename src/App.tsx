/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { IntroAnimation } from './components/IntroAnimation';
import { Navbar } from './components/Navbar';
import { VintageHeroWalkthrough } from './components/VintageHeroWalkthrough';
import { MenuSection } from './components/MenuSection';
import { BottledSection } from './components/BottledSection';
import { WhyBrewCrew } from './components/WhyBrewCrew';
import { CraftShowcase } from './components/CraftShowcase';
import { CafeSection } from './components/CafeSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Allow ESC key to skip intro anytime
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showIntro) {
        setShowIntro(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FFF8F0] text-[#3B2417] flex flex-col font-sans selection:bg-[#E8D2BA] selection:text-[#3B2417]">
        {/* Full-screen Opening Animation (~5 seconds, skippable) */}
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}

        {/* Global Navigation */}
        <Navbar onReplayIntro={() => setShowIntro(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Full-space Vintage Café Scroll Walkthrough Hero */}
          <VintageHeroWalkthrough />

          {/* 2. Menu Section (Iced, Classics, Hot, Bottled with Tabs & Quick-Add) */}
          <MenuSection />

          {/* 3. Why Brew Crew (3 Core Pillars with Proof Metrics) */}
          <WhyBrewCrew />

          {/* 4. Alternating Craft & Photo Showcase (Latte Art + Extraction Science) */}
          <CraftShowcase />

          {/* 5. Bottled 18h Cold Brew (Special 3D Tilt Showcase) */}
          <BottledSection />

          {/* 6. Our Café (Cozy Story, Gallery, Map, Visit Reservation) */}
          <CafeSection />
        </main>

        {/* 7. Footer */}
        <Footer />

        {/* Slide-over Cart & Checkout Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
