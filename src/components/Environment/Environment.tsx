import React, { useRef, useEffect } from 'react';

const Environment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (isReducedMotion || isMobile) return;
      targetX = (e.clientX / width - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Stars generation
    const starCount = isMobile ? 400 : 1200;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(), // 0 (back) to 1 (front)
      s: Math.random() * (isMobile ? 1.5 : 2),
      alpha: Math.random(),
      blinkSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Dust particles
    const dustCount = isMobile ? 10 : 30;
    const dust = Array.from({ length: dustCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      s: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5,
    }));

    let animationFrameId: number;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = '#03050A';
      ctx.fillRect(0, 0, width, height);

      // Lerp mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Draw subtle nebula clouds (using radial gradients)
      if (!isMobile) {
        const createNebula = (cx: number, cy: number, r: number, color1: string, color2: string) => {
          const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          grd.addColorStop(0, color1);
          grd.addColorStop(1, color2);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        };
        
        ctx.globalCompositeOperation = 'screen';
        createNebula(width * 0.3 - mouseX * 50, height * 0.3 - mouseY * 50, width * 0.5, 'rgba(12, 24, 68, 0.15)', 'rgba(3, 5, 10, 0)');
        createNebula(width * 0.7 - mouseX * 30, height * 0.7 - mouseY * 30, width * 0.6, 'rgba(30, 10, 40, 0.1)', 'rgba(3, 5, 10, 0)');
        ctx.globalCompositeOperation = 'source-over';
      }

      // Draw Stars
      stars.forEach(star => {
        star.alpha += star.blinkSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) star.blinkSpeed *= -1;

        const px = star.x - (mouseX * 40 * star.z);
        const py = star.y - (mouseY * 40 * star.z);

        // Wrap around
        let drawX = px;
        let drawY = py;
        if (drawX < 0) drawX = width - (-drawX % width);
        else drawX = drawX % width;
        if (drawY < 0) drawY = height - (-drawY % height);
        else drawY = drawY % height;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * (0.3 + star.z * 0.7)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Dust
      dust.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        const px = d.x - (mouseX * 80);
        const py = d.y - (mouseY * 80);

        ctx.fillStyle = `rgba(150, 200, 255, ${d.alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, d.s, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(3,5,10,0.8)_100%)]"></div>
    </div>
  );
};

export default Environment;
