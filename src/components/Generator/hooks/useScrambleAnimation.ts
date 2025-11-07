import { useState, useRef, useEffect, useCallback } from 'react';

export function useScrambleAnimation() {
  const [displayPassword, setDisplayPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  const startScramble = useCallback((target: string, onComplete: (password: string) => void) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const duration = 450;
    const start = performance.now();
    const len = target.length;

    const revealTimes = Array.from({ length: len }).map((_, i) => {
      const base = (i / Math.max(1, len)) * duration * 0.9;
      return base + Math.random() * (duration * 0.2);
    });

    setIsAnimating(true);

    const tick = (now: number) => {
      const elapsed = now - start;
      let finished = true;
      let out = '';

      for (let i = 0; i < len; i++) {
        if (elapsed >= revealTimes[i]) {
          out += target[i];
        } else {
          finished = false;
          out += letters.charAt(Math.floor(Math.random() * letters.length));
        }
      }

      setDisplayPassword(out);

      if (!finished && elapsed < duration + 100) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayPassword(target);
        setIsAnimating(false);
        animationRef.current = null;
        onComplete(target);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return { displayPassword, isAnimating, startScramble };
}
