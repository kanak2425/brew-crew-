import React from 'react';

// Cute hand-drawn SVG stickers with white border outlines and soft drop shadows

export function SmilingCoffeeCup({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`sticker inline-block ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_8px_rgba(59,36,23,0.15)]">
        {/* White sticker border */}
        <path
          d="M20 30 C20 22, 80 22, 80 30 L74 76 C73 84, 27 84, 26 76 Z"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinejoin="round"
          fill="#FFFDF9"
        />
        {/* Cup body */}
        <path
          d="M22 30 C22 24, 78 24, 78 30 L72 74 C71 82, 29 82, 28 74 Z"
          fill="#F1E3D3"
        />
        {/* Coffee rim */}
        <ellipse cx="50" cy="30" rx="26" ry="6" fill="#8B5E3C" />
        <ellipse cx="50" cy="29" rx="23" ry="4" fill="#3B2417" />
        {/* Cup sleeve */}
        <path
          d="M25 45 L27 63 C35 66, 65 66, 73 63 L75 45 C65 48, 35 48, 25 45 Z"
          fill="#C9A27E"
        />
        {/* Cute Face */}
        <circle cx="43" cy="53" r="2.5" fill="#3B2417" />
        <circle cx="57" cy="53" r="2.5" fill="#3B2417" />
        {/* Cheeks */}
        <circle cx="39" cy="56" r="2.5" fill="#F8B4A6" opacity="0.8" />
        <circle cx="61" cy="56" r="2.5" fill="#F8B4A6" opacity="0.8" />
        {/* Smile */}
        <path
          d="M47 56 Q50 60 53 56"
          stroke="#3B2417"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Steam */}
        <path
          d="M44 18 Q41 12 45 6"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M44 18 Q41 12 45 6"
          stroke="#C9A27E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M56 16 Q59 10 55 4"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M56 16 Q59 10 55 4"
          stroke="#C9A27E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function IcedCoffeeCup({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`sticker inline-block ${className}`}>
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_8px_rgba(59,36,23,0.15)]">
        {/* Straw */}
        <path
          d="M55 8 L65 40"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M55 8 L65 40"
          stroke="#E07A5F"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* White cup contour */}
        <path
          d="M24 38 C24 35, 76 35, 76 38 L68 104 C67 110, 33 110, 32 104 Z"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinejoin="round"
          fill="#FFFDF9"
        />
        {/* Clear Cup background */}
        <path
          d="M26 40 L34 102 C34 107, 66 107, 66 102 L74 40 Z"
          fill="#F5EFE6"
        />
        {/* Coffee Liquid */}
        <path
          d="M28 58 L34 102 C35 106, 65 106, 66 102 L72 58 Q50 62 28 58 Z"
          fill="#8B5E3C"
        />
        {/* Milk Swirl top */}
        <path
          d="M27 52 Q50 48 73 52 L72 60 Q50 64 28 60 Z"
          fill="#FFF8F0"
          opacity="0.9"
        />
        {/* Ice Cubes inside */}
        <rect x="36" y="65" width="10" height="10" rx="2" transform="rotate(12 36 65)" fill="#FFFFFF" opacity="0.6" />
        <rect x="52" y="72" width="11" height="11" rx="2.5" transform="rotate(-8 52 72)" fill="#FFFFFF" opacity="0.6" />
        {/* Smiling face on cup */}
        <circle cx="44" cy="88" r="2.2" fill="#FFFFFF" />
        <circle cx="56" cy="88" r="2.2" fill="#FFFFFF" />
        <circle cx="40" cy="91" r="2" fill="#FFAAA6" opacity="0.9" />
        <circle cx="60" cy="91" r="2" fill="#FFAAA6" opacity="0.9" />
        <path d="M47 91 Q50 94 53 91" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Lid */}
        <ellipse cx="50" cy="38" rx="28" ry="6" fill="#FFFFFF" stroke="#E8D2BA" strokeWidth="2" />
        <ellipse cx="50" cy="36" rx="22" ry="4" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

export function CuteBeanSticker({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`sticker inline-block ${className}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_6px_rgba(59,36,23,0.15)]">
        {/* Bean outline */}
        <path
          d="M25 18 C45 6, 68 22, 64 48 C60 68, 35 74, 20 60 C8 48, 10 26, 25 18 Z"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinejoin="round"
          fill="#6B4226"
        />
        {/* Bean groove */}
        <path
          d="M44 20 Q32 38 46 58"
          stroke="#3B2417"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Eyes */}
        <circle cx="28" cy="38" r="2.5" fill="#FFFFFF" />
        <circle cx="28" cy="37.5" r="1.2" fill="#3B2417" />
        <circle cx="54" cy="40" r="2.5" fill="#FFFFFF" />
        <circle cx="54" cy="39.5" r="1.2" fill="#3B2417" />
        {/* Rosy Cheeks */}
        <circle cx="24" cy="43" r="2.5" fill="#F8B4A6" opacity="0.85" />
        <circle cx="58" cy="45" r="2.5" fill="#F8B4A6" opacity="0.85" />
        {/* Smile */}
        <path d="M38 45 Q41 49 44 45" stroke="#FFF8F0" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function CuteCroissant({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`sticker inline-block ${className}`}>
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_6px_rgba(59,36,23,0.15)]">
        {/* Outer sticker border */}
        <path
          d="M15 55 C12 35, 32 15, 50 15 C68 15, 88 35, 85 55 C82 68, 70 65, 62 52 C55 42, 45 42, 38 52 C30 65, 18 68, 15 55 Z"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinejoin="round"
          fill="#E5A85A"
        />
        {/* Center roll lines */}
        <path d="M42 20 C40 38, 42 45, 40 50" stroke="#C9822B" strokeWidth="3" strokeLinecap="round" />
        <path d="M58 20 C60 38, 58 45, 60 50" stroke="#C9822B" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 16 L50 48" stroke="#FFE3A8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Cute face */}
        <circle cx="46" cy="34" r="2" fill="#3B2417" />
        <circle cx="54" cy="34" r="2" fill="#3B2417" />
        <circle cx="42" cy="38" r="2" fill="#FFA59E" opacity="0.8" />
        <circle cx="58" cy="38" r="2" fill="#FFA59E" opacity="0.8" />
        <path d="M48 39 Q50 42 52 39" stroke="#3B2417" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function SteamHeart({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`sticker inline-block ${className}`}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_3px_5px_rgba(201,162,126,0.25)]">
        <path
          d="M30 46 C28 44, 12 32, 12 20 C12 13, 17 8, 24 8 C27.5 8, 30 11, 30 11 C30 11, 32.5 8, 36 8 C43 8, 48 13, 48 20 C48 32, 32 44, 30 46 Z"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinejoin="round"
          fill="#E07A5F"
        />
        <path
          d="M20 16 Q18 20 22 22"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function SparkleSticker({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`sticker inline-block ${className}`}>
      <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M25 3 Q25 25 47 25 Q25 25 25 47 Q25 25 3 25 Q25 25 25 3 Z"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="#F4D06F"
        />
      </svg>
    </div>
  );
}

export function RetroStampBadge({ text = "100% ARABICA", className = "" }: { text?: string; className?: string }) {
  return (
    <div className={`sticker inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B5E3C] text-[#FFF8F0] rounded-full border-2 border-white shadow-md text-xs font-bold tracking-wider uppercase ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#F4D06F] animate-ping" />
      <span>{text}</span>
    </div>
  );
}
