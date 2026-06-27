import React, { useEffect, useRef } from 'react';

export default function CursorBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const followCursor = () => {
      if (blobRef.current) {
        // Smooth easing interpolation (0.1 = slower/smoother, 0.4 = faster)
        blobX += (mouseX - blobX) * 0.15;
        blobY += (mouseY - blobY) * 0.15;

        // Uses hardware acceleration via translate3d
        blobRef.current.style.transform = `translate3d(${blobX - 45 }px, ${blobY - 45 }px, 0)`;
      }
      animationFrameId = requestAnimationFrame(followCursor);
    };

    followCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-blob {
          background: radial-gradient(circle at 40% 40%, 
            rgba(0, 207, 255, 0.45) 15%, 
            rgba(0, 255, 163, 0.35) 35%, 
            rgba(255, 30, 158, 0.3) 60%, 
            rgba(107, 71, 255, 0.25) 85%
          );
          border-radius: 50%;
        }
      `}</style>
      <div
        ref={blobRef}
        className="cursor-blob pointer-events-none fixed top-0 left-0 h-[100px] w-[100px] filter blur-[10px] mix-blend-screen will-change-transform"
      />
    </>
  );
}