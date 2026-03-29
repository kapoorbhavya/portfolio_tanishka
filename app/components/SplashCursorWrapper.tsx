'use client';
import dynamic from 'next/dynamic';

const SplashCursor = dynamic(() => import('@/app/components/SplashCursor'), { ssr: false });

export default function SplashCursorWrapper() {
  return <SplashCursor />;
}
