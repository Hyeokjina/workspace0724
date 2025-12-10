'use client';

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'MVP 개발',
    status: 'completed',
    icon: '✓',
    timeline: '완료',
    color: 'cyan',
    features: [
      '회원가입/로그인',
      '대시보드 시스템',
      'PT 예약',
      '출결 관리',
      '재고/매출 관리'
    ]
  },
  {
    phase: 'Phase 2',
    title: '기능 고도화',
    status: 'in-progress',
    icon: '⚡',
    timeline: '4-6개월',
    color: 'purple',
    features: [
      '이메일 인증',
      '카카오맵 연동',
      '거리 필터링',
      '온라인 결제',
      '그래프 시각화'
    ]
  },
  {
    phase: 'Phase 3',
    title: '실시간 기능',
    status: 'planned',
    icon: '🔔',
    timeline: '6-9개월',
    color: 'pink',
    features: [
      'WebSocket 알림',
      'PT 승인 알림',
      '만료 알림',
      '실시간 혼잡도',
      '채팅 기능'
    ]
  },
  {
    phase: 'Phase 4',
    title: '외부 연동',
    status: 'planned',
    icon: '🔗',
    timeline: '9-12개월',
    color: 'cyan',
    features: [
      '네이버 예약',
      '카카오페이',
      '알림톡',
      '캘린더 동기화'
    ]
  },
  {
    phase: 'Phase 5',
    title: 'AI 기능',
    status: 'planned',
    icon: '🤖',
    timeline: '12-18개월',
    color: 'purple',
    features: [
      'AI 운동 추천',
      '데이터 분석',
      '자동 스케줄링',
      '이탈 예측'
    ]
  }
];

const statusStyles = {
  completed: {
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500',
    indicator: 'bg-cyan-500'
  },
  'in-progress': {
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500',
    indicator: 'bg-purple-500 pulse-glow'
  },
  planned: {
    badge: 'bg-pink-500/20 text-pink-400 border-pink-500',
    indicator: 'bg-pink-500/50'
  }
};

const colorMap = {
  cyan: 'from-cyan-500/20 to-cyan-900/20 border-cyan-500/50 group-hover:border-cyan-400',
  purple: 'from-purple-500/20 to-purple-900/20 border-purple-500/50 group-hover:border-purple-400',
  pink: 'from-pink-500/20 to-pink-900/20 border-pink-500/50 group-hover:border-pink-400'
};

export function RoadmapSection() {
  return (
    <section className="relative py-32 overflow-hidden slash-separator">
      {/* Background Grid */}
      <div className="absolute inset-0 retro-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="px-6 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 backdrop-blur-sm">
              <span className="text-pink-400 font-bold uppercase tracking-widest text-sm">Roadmap</span>
            </div>
          </div>
          <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              제품 로드맵
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            지속적인 혁신으로 최고의 플랫폼을 만들어갑니다
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {roadmap.map((item, i) => {
            const status = statusStyles[item.status as keyof typeof statusStyles];
            return (
              <div key={i} className="group relative">
                <div className={`relative p-6 bg-gradient-to-br ${colorMap[item.color as keyof typeof colorMap]} border-2 backdrop-blur-sm transition-all duration-300 card-3d h-full`}>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 ${status.badge} border rounded-full text-xs font-bold uppercase tracking-wider`}>
                      {item.timeline}
                    </div>
                    <div className="text-4xl">{item.icon}</div>
                  </div>

                  {/* Phase Info */}
                  <div className="mb-4">
                    <div className="text-gray-500 text-sm uppercase tracking-wider mb-1">{item.phase}</div>
                    <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">{item.title}</h3>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {item.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-1">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Status Indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${status.indicator}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision Statement */}
        <div className="relative max-w-4xl mx-auto">
          <div className="p-12 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-cyan-900/40 border-2 border-purple-500/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="font-['Bebas_Neue'] text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                우리의 비전
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                &quot;대한민국의 모든 헬스장이 GymHub를 통해 효율적으로 운영되고,
                <br />
                모든 회원이 편리하게 헬스장을 이용하는 생태계 구축&quot;
              </p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pink-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
