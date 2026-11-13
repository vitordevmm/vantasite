'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface NeonAvatarProps {
  src: string;
  alt: string;
  status?: 'loading' | 'joining' | 'completed' | 'idle';
  size?: number;
}

export function NeonAvatar({
  src,
  alt,
  status = 'loading',
  size = 120,
}: NeonAvatarProps) {
  const isCompleted = status === 'completed';

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer Rotating Neon Ring */}
      <div
        className={`absolute rounded-full transition-all duration-700 ${
          isCompleted ? 'neon-ring-success scale-105' : 'neon-ring-gold'
        }`}
        style={{
          width: size + 14,
          height: size + 14,
          padding: 2.5,
        }}
      >
        <div
          className={`w-full h-full rounded-full ${
            isCompleted ? '' : 'animate-spin-neon'
          }`}
          style={{
            background: isCompleted
              ? 'conic-gradient(from 0deg, #22c55e, #4ade80, #15803d, #22c55e)'
              : 'conic-gradient(from 0deg, #E5A93C, #F5BE58, #6B490E, #FDE68A, #E5A93C)',
          }}
        />
      </div>

      {/* Dark spacer */}
      <div
        className="relative z-10 rounded-full bg-vanta p-1 transition-all duration-500"
        style={{ width: size + 6, height: size + 6 }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden bg-vanta-dark border border-white/10">
          <Image
            src={src || '/logo.svg'}
            alt={alt || 'Avatar'}
            fill
            sizes={`${size}px`}
            className="object-cover"
            priority
            unoptimized={src?.includes('cdn.discordapp.com') || src?.endsWith('.svg')}
          />
        </div>
      </div>

      {/* Completion checkmark */}
      {isCompleted && (
        <div className="absolute -bottom-1 -right-1 z-20 w-8 h-8 rounded-full bg-success flex items-center justify-center text-black font-bold shadow-lg shadow-success/40 animate-in zoom-in-75 duration-300">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      )}
    </div>
  );
}
