'use client';

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient opacity-90" />

      {/* Overlay Pattern */}
      <div className="absolute inset-0 retro-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main CTA Content */}
        <div className="mb-16">
          <div className="inline-block mb-8">
            <div className="px-8 py-3 bg-black/30 backdrop-blur-sm border-2 border-white/50">
              <span className="text-white font-bold uppercase tracking-widest text-sm">지금 시작하세요</span>
            </div>
          </div>

          <h2 className="font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-8xl mb-8 leading-none">
            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              READY TO
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white drop-shadow-2xl">
              TRANSFORM
            </span>
            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              YOUR GYM?
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            GymHub와 함께 헬스장 운영을 혁신하고,
            <br />
            회원들에게 더 나은 경험을 제공하세요.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="neon-button rounded-none">
              <span className="relative z-10">무료 체험 시작하기</span>
            </button>
            <button className="px-8 py-4 bg-white text-purple-900 font-bold text-lg uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300 border-4 border-white relative group overflow-hidden">
              <span className="relative z-10">상담 신청하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="group">
            <div className="p-8 bg-black/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/60 transition-all duration-300 card-3d">
              <div className="relative">
                <div className="font-['Bebas_Neue'] text-6xl text-white mb-2 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
                  30%
                </div>
                <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                  운영 시간 절감
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="group">
            <div className="p-8 bg-black/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/60 transition-all duration-300 card-3d">
              <div className="relative">
                <div className="font-['Bebas_Neue'] text-6xl text-white mb-2 drop-shadow-[0_0_20px_rgba(125,0,255,0.8)]">
                  20%
                </div>
                <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                  매출 증대
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="group">
            <div className="p-8 bg-black/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/60 transition-all duration-300 card-3d">
              <div className="relative">
                <div className="font-['Bebas_Neue'] text-6xl text-white mb-2 drop-shadow-[0_0_20px_rgba(255,0,128,0.8)]">
                  99%
                </div>
                <div className="text-sm text-white/80 uppercase tracking-wider font-semibold">
                  서비스 가용성
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
    </section>
  );
}
