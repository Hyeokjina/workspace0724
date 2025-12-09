'use client';

import { useEffect, useState } from 'react';

function CountUpNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(target * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <span>{count}</span>;
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden retro-grid">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Overline */}
        <div className="fade-in-up stagger-1 mb-8">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-sm uppercase tracking-widest rounded-full border-2 border-cyan-400">
            헬스장 운영의 미래
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="fade-in-up stagger-2 font-['Bebas_Neue'] text-7xl sm:text-8xl lg:text-9xl leading-none mb-6">
          <span className="neon-text block">GYMHUB</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            NEXT LEVEL
          </span>
          <span className="neon-text-pink block">MANAGEMENT</span>
        </h1>

        {/* Subtitle */}
        <p className="fade-in-up stagger-3 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light">
          회원, 트레이너, 운영자를 위한 올인원 플랫폼.
          <br />
          <span className="text-cyan-400 font-semibold">운영 효율을 극대화</span>하고{' '}
          <span className="text-pink-400 font-semibold">회원 만족도를 향상</span>시키세요.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in-up stagger-4 flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <button className="neon-button rounded-none relative z-10">
            <span className="relative z-10">무료 체험 시작</span>
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-navy-900 transition-all duration-300 relative group overflow-hidden">
            <span className="relative z-10">데모 보기</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        {/* Stats with Counter Animation */}
        <div className="fade-in-up stagger-5 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="group">
            <div className="relative p-8 bg-gradient-to-br from-purple-900/40 to-transparent border-2 border-purple-500/30 backdrop-blur-sm hover:border-purple-400 transition-all duration-300 card-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-['Bebas_Neue'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                  <CountUpNumber target={100} />+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">제휴 헬스장</div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="relative p-8 bg-gradient-to-br from-cyan-900/40 to-transparent border-2 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 card-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-['Bebas_Neue'] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  <CountUpNumber target={10000} />+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">활성 사용자</div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="relative p-8 bg-gradient-to-br from-pink-900/40 to-transparent border-2 border-pink-500/30 backdrop-blur-sm hover:border-pink-400 transition-all duration-300 card-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-['Bebas_Neue'] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
                  <CountUpNumber target={99} />%
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0e27]" />
    </section>
  );
}
