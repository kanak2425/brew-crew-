import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Import photographic assets directly for guaranteed bundling & zero broken paths
import openingBottleImg from '../assets/images/brew_crew_opening_bottle_1790980093310.jpg';
import beansSpillImg from '../assets/images/beans_spill_highspeed_1790980322148.jpg';
import macroBeanImg from '../assets/images/macro_coffee_bean_1790980336815.jpg';

interface IntroAnimationProps {
  onComplete: () => void;
}

interface RealBeanParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotZ: number;
  vRotZ: number;
  pitch: number;
  vPitch: number;
  bounceCount: number;
  groundY: number;
  aspect: number;
  opacity: number;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'resting' | 'popping' | 'spilling' | 'wiping'>('resting');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const beansRef = useRef<RealBeanParticle[]>([]);
  const beanImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Preload the real macro roasted coffee bean photo for photorealistic canvas rendering
    const img = new Image();
    img.src = macroBeanImg;
    img.onload = () => {
      beanImgRef.current = img;
    };

    // Stage 1: Resting horizontally (0s - 1.4s)
    const popTimer = setTimeout(() => {
      setPhase('popping');

      // Subtle pop sparkles around bottle mouth
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: 0.65, y: 0.38 },
        colors: ['#F4D06F', '#C9A27E', '#FFF8F0', '#8B5E3C'],
        disableForReducedMotion: true,
      });
    }, 1400);

    // Stage 2: Real coffee beans cascade & pour out (1.7s)
    const spillTimer = setTimeout(() => {
      setPhase('spilling');
      initRealisticBeanPhysics();
    }, 1700);

    // Stage 3: Smooth camera zoom / wipe to site (4.3s)
    const wipeTimer = setTimeout(() => {
      setPhase('wiping');
    }, 4300);

    // Stage 4: Finish (4.9s)
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 4900);

    return () => {
      clearTimeout(popTimer);
      clearTimeout(spillTimer);
      clearTimeout(wipeTimer);
      clearTimeout(doneTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onComplete]);

  // Setup realistic physical simulation of real roasted coffee beans spilling from horizontal bottle
  const initRealisticBeanPhysics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Origin near bottle neck/mouth (approx 65% x, 38% y on 16:9 layout)
    const originX = canvas.width * 0.64;
    const originY = canvas.height * 0.40;
    const tableGround = canvas.height * 0.72; // table ground plane

    const totalBeans = 75;
    const beans: RealBeanParticle[] = [];

    for (let i = 0; i < totalBeans; i++) {
      // Pouring vector to the right and downward across the table
      const angle = (Math.random() - 0.25) * 1.4;
      const speed = Math.random() * 15 + 7;
      const size = Math.random() * 20 + 20; // prominent, realistic macro beans

      beans.push({
        x: originX + (Math.random() - 0.5) * 20,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed + (Math.random() * 4 + 2),
        vy: Math.sin(angle) * speed * 0.9 - Math.random() * 5 - 2,
        size,
        rotZ: Math.random() * Math.PI * 2,
        vRotZ: (Math.random() - 0.5) * 0.22,
        pitch: Math.random() * Math.PI,
        vPitch: (Math.random() - 0.5) * 0.18,
        bounceCount: 0,
        groundY: tableGround + (Math.random() - 0.5) * 80,
        aspect: 1.35 + (Math.random() - 0.5) * 0.2, // bean ratio
        opacity: 1,
      });
    }

    beansRef.current = beans;
    const gravity = 0.50;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const beanImg = beanImgRef.current;

      beansRef.current.forEach((bean) => {
        // Physics update
        bean.x += bean.vx;
        bean.y += bean.vy;
        bean.vy += gravity;
        bean.rotZ += bean.vRotZ;
        bean.pitch += bean.vPitch;

        // Bounce on table surface
        if (bean.y >= bean.groundY) {
          bean.y = bean.groundY;
          if (bean.bounceCount < 3) {
            bean.vy = -bean.vy * 0.38; // bounce restitution
            bean.vx *= 0.80; // surface friction
            bean.bounceCount++;
          } else {
            bean.vy = 0;
            bean.vx *= 0.93; // rolling smoothly
          }
        }

        // Draw realistic contact shadow on the surface plane
        const heightAboveGround = Math.max(0, bean.groundY - bean.y);
        const shadowScale = Math.max(0.2, 1 - heightAboveGround / 220);
        const shadowAlpha = Math.max(0, 0.42 * (1 - heightAboveGround / 260));

        if (shadowAlpha > 0.02) {
          ctx.save();
          ctx.translate(bean.x, bean.groundY);
          ctx.scale(shadowScale * 1.4, shadowScale * 0.4);
          ctx.beginPath();
          ctx.arc(0, 0, bean.size * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(50, 30, 18, ${shadowAlpha})`;
          ctx.filter = `blur(${Math.min(10, 2 + heightAboveGround * 0.08)}px)`;
          ctx.fill();
          ctx.restore();
        }

        // Render the realistic coffee bean with 3D tumble
        ctx.save();
        ctx.translate(bean.x, bean.y);
        ctx.rotate(bean.rotZ);

        const scaleX = Math.cos(bean.pitch);
        const scaleY = 1;

        if (beanImg && beanImg.complete) {
          ctx.save();
          ctx.scale(scaleX, scaleY);

          // Soft drop shadow directly behind bean
          ctx.shadowColor = 'rgba(40, 22, 12, 0.35)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 3;

          // Clip to organic rounded coffee bean path
          ctx.beginPath();
          const w = bean.size * bean.aspect;
          const h = bean.size;
          ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.clip();

          // Draw the real photo of the roasted coffee bean
          ctx.drawImage(beanImg, -w / 2, -h / 2, w, h);

          // Specular oily roast sheen highlight
          const grad = ctx.createRadialGradient(-w * 0.2, -h * 0.2, 1, 0, 0, w * 0.6);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
          grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.restore();
        } else {
          // Canvas fallback with rich roast gradient
          ctx.scale(scaleX, scaleY);
          const w = bean.size * bean.aspect;
          const h = bean.size;

          const roastGrad = ctx.createRadialGradient(-w * 0.2, -h * 0.2, 2, 0, 0, w * 0.7);
          roastGrad.addColorStop(0, '#5C3820');
          roastGrad.addColorStop(0.6, '#3B2417');
          roastGrad.addColorStop(1, '#24140B');

          ctx.fillStyle = roastGrad;
          ctx.beginPath();
          ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.fill();

          // Center groove
          ctx.strokeStyle = '#140A05';
          ctx.lineWidth = bean.size * 0.12;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-w * 0.35, 0);
          ctx.quadraticCurveTo(0, h * 0.16, w * 0.35, 0);
          ctx.stroke();
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  return (
    <AnimatePresence>
      {phase !== 'wiping' && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF1E6]"
        >
          {/* Top Skip Button */}
          <div className="absolute top-6 right-6 z-40">
            <button
              onClick={onComplete}
              className="group flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-[#3B2417] text-sm font-semibold rounded-full border border-[#C9A27E]/40 shadow-md backdrop-blur transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Skip Intro</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#F1E3D3] text-[#8B5E3C] font-mono group-hover:bg-[#C9A27E] group-hover:text-white transition-colors">
                ESC
              </span>
            </button>
          </div>

          {/* Full Realistic Scene: Bottle Laying Horizontally on the Surface */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* The Real Studio Photograph of the Bottle Laying on the Surface */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={
                phase === 'resting'
                  ? { scale: [1, 1.03, 1] }
                  : phase === 'popping'
                  ? { scale: 1.04 }
                  : { scale: 1.06 }
              }
              transition={{
                duration: phase === 'resting' ? 3.5 : 0.8,
                ease: 'easeInOut',
                repeat: phase === 'resting' ? Infinity : 0,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={openingBottleImg}
                alt="Brew Crew Glass Bottle packed with whole roasted coffee beans laying horizontally on smooth surface"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Natural subtle warm vignette on borders */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
            </motion.div>

            {/* In Spilling Phase: High-speed real beans bursting photograph layer */}
            {phase === 'spilling' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 0.85, scale: 1.02 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 pointer-events-none mix-blend-multiply"
              >
                <img
                  src={beansSpillImg}
                  alt="Real coffee beans pouring across surface"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center opacity-75"
                />
              </motion.div>
            )}

            {/* Cap popping off animation */}
            {phase !== 'resting' && (
              <>
                {/* Pop burst ring around bottle neck */}
                <motion.div
                  initial={{ scale: 0.2, opacity: 1 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute top-[36%] right-[32%] w-36 h-36 rounded-full border-4 border-[#F4D06F]/80 pointer-events-none z-30"
                />

                {/* Flying Cap & Ribbon Bow */}
                <motion.div
                  initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  animate={{
                    opacity: [1, 1, 0],
                    x: [0, 160, 280],
                    y: [0, -110, -160],
                    rotate: [0, 90, 360],
                    scale: [1, 1.2, 0.7],
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[34%] right-[34%] z-30 pointer-events-none flex flex-col items-center"
                >
                  <div className="w-14 h-8 bg-[#FFF8EE] rounded-md border-2 border-[#C9A27E] shadow-2xl flex items-center justify-center">
                    <div className="w-10 h-1 bg-[#C9A27E]/70 rounded-full" />
                  </div>
                  <div className="mt-0.5 px-2 py-0.5 bg-[#6B4226] text-[#FFF8F0] text-[9px] font-bold rounded-full border border-white shadow-md">
                    🎀 BREW CREW
                  </div>
                </motion.div>
              </>
            )}

            {/* Canvas for 75+ Real 3D Roasted Coffee Beans Pouring & Bouncing Across Table */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-30"
            />

            {/* Bottom Real Roast Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 flex flex-col items-center text-center gap-1.5 z-40 select-none px-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E8D2BA] shadow-lg text-xs font-semibold text-[#8B5E3C]">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-ping" />
                <span className="uppercase tracking-widest font-mono text-[11px] font-bold">
                  {phase === 'resting'
                    ? '100% Roasted Arabica Beans In Glass'
                    : 'Uncapping Fresh Roast...'}
                </span>
              </div>
              <p className="text-base sm:text-lg font-hand text-xl text-[#3B2417] drop-shadow-xs">
                "Brewed from single-origin beans, steeped slow for 18 hours."
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
