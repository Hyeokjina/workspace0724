'use client';

const memberFeatures = [
  {
    icon: '📅',
    title: 'PT 예약',
    description: '트레이너별 PT 예약 및 일정 관리',
    color: 'cyan'
  },
  {
    icon: '✓',
    title: '출결 관리',
    description: '입실/퇴실 기록 및 출석 이력',
    color: 'purple'
  },
  {
    icon: '📊',
    title: '인바디 기록',
    description: '체성분 분석 기록 관리',
    color: 'pink'
  },
  {
    icon: '🎯',
    title: '운동 목표',
    description: '개인 목표 설정 및 달성 추적',
    color: 'cyan'
  }
];

const trainerFeatures = [
  {
    icon: '🗓️',
    title: 'PT 일정',
    description: 'PT 예약 승인 및 일정 조회',
    color: 'purple'
  },
  {
    icon: '👥',
    title: '회원 관리',
    description: '담당 회원 조회 및 관리',
    color: 'pink'
  }
];

const gymFeatures = [
  {
    icon: '👤',
    title: '회원 관리',
    description: '등록, 조회, 수정, 삭제',
    color: 'cyan'
  },
  {
    icon: '🏋️',
    title: '기구 관리',
    description: '운동 기구 등록 및 상태',
    color: 'purple'
  },
  {
    icon: '📦',
    title: '재고 관리',
    description: '입출고 관리 및 내역',
    color: 'pink'
  },
  {
    icon: '💰',
    title: '매출 관리',
    description: '통계 및 그래프 시각화',
    color: 'cyan'
  }
];

const colorClasses = {
  cyan: 'from-cyan-500/20 to-cyan-900/20 border-cyan-500/50 group-hover:border-cyan-400',
  purple: 'from-purple-500/20 to-purple-900/20 border-purple-500/50 group-hover:border-purple-400',
  pink: 'from-pink-500/20 to-pink-900/20 border-pink-500/50 group-hover:border-pink-400'
};

function FeatureCard({ icon, title, description, color }: any) {
  return (
    <div className="group relative">
      <div className={`relative p-6 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border-2 backdrop-blur-sm transition-all duration-300 card-3d overflow-hidden`}>
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <div className="text-5xl mb-4 filter drop-shadow-lg">{icon}</div>
          <h3 className="font-['Bebas_Neue'] text-2xl text-white mb-2 tracking-wide">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent transform rotate-45 translate-x-10 -translate-y-10" />
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative py-32 overflow-hidden slash-separator">
      {/* Background Elements */}
      <div className="absolute inset-0 retro-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="px-6 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/50 backdrop-blur-sm">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">Features</span>
            </div>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              역할별 맞춤 기능
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            회원, 트레이너, 운영자 각각을 위한 최적화된 솔루션
          </p>
        </div>

        {/* Member Features */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent" />
            <h3 className="font-['Bebas_Neue'] text-4xl text-cyan-400 tracking-wider">일반 회원</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>

        {/* Trainer Features */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-transparent" />
            <h3 className="font-['Bebas_Neue'] text-4xl text-purple-400 tracking-wider">트레이너</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {trainerFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>

        {/* Gym Features */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-transparent" />
            <h3 className="font-['Bebas_Neue'] text-4xl text-pink-400 tracking-wider">헬스장 운영자</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
