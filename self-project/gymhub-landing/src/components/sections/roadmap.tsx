import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Sparkles, Rocket, Zap } from "lucide-react";

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "MVP 개발",
    status: "completed",
    icon: CheckCircle2,
    color: "green",
    timeline: "완료",
    features: [
      "회원가입/로그인",
      "회원/트레이너/운영자 대시보드",
      "PT 예약 시스템",
      "출결 관리",
      "재고 및 매출 관리",
    ],
  },
  {
    phase: "Phase 2",
    title: "기능 고도화",
    status: "in-progress",
    icon: Clock,
    color: "blue",
    timeline: "4-6개월",
    features: [
      "아이디/비밀번호 찾기 (이메일 인증)",
      "카카오맵 API 연동",
      "거리 기반 헬스장 필터링",
      "온라인 결제 연동",
      "인바디 기록 그래프 시각화",
    ],
  },
  {
    phase: "Phase 3",
    title: "실시간 기능",
    status: "planned",
    icon: Zap,
    color: "purple",
    timeline: "6-9개월",
    features: [
      "WebSocket 실시간 알림",
      "PT 예약 승인 알림",
      "회원권 만료 예정 알림",
      "실시간 혼잡도 업데이트",
      "채팅 기능 (회원 ↔ 트레이너)",
    ],
  },
  {
    phase: "Phase 4",
    title: "외부 서비스 연동",
    status: "planned",
    icon: Rocket,
    color: "orange",
    timeline: "9-12개월",
    features: [
      "네이버 예약 API 연동",
      "카카오페이/네이버페이 결제",
      "카카오톡 알림톡",
      "구글 캘린더 동기화",
    ],
  },
  {
    phase: "Phase 5",
    title: "AI 기능 도입",
    status: "planned",
    icon: Sparkles,
    color: "pink",
    timeline: "12-18개월",
    features: [
      "AI 기반 운동 추천 시스템",
      "인바디 데이터 분석",
      "PT 자동 스케줄링",
      "회원 이탈 예측",
    ],
  },
];

const statusStyles = {
  completed: {
    badge: "bg-green-100 text-green-700",
    border: "border-green-500",
    icon: "text-green-600",
  },
  "in-progress": {
    badge: "bg-blue-100 text-blue-700",
    border: "border-blue-500",
    icon: "text-blue-600",
  },
  planned: {
    badge: "bg-gray-100 text-gray-700",
    border: "border-gray-300",
    icon: "text-gray-600",
  },
};

export function Roadmap() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            제품 로드맵
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            지속적인 혁신으로 최고의 헬스장 관리 플랫폼을 만들어갑니다
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {roadmapPhases.map((phase, index) => {
            const styles = statusStyles[phase.status as keyof typeof statusStyles];
            const Icon = phase.icon;

            return (
              <Card
                key={index}
                className={`border-2 ${styles.border} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles.badge}`}>
                      <Icon className={`h-5 w-5 ${styles.icon}`} />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>
                      {phase.timeline}
                    </span>
                  </div>
                  <CardTitle className="mt-4">
                    {phase.phase}: {phase.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {phase.status === "completed" && "구현 완료"}
                    {phase.status === "in-progress" && "진행 중"}
                    {phase.status === "planned" && "계획 중"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <span className={`mt-0.5 ${styles.icon}`}>•</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Vision */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold text-white">우리의 비전</h3>
          <p className="mt-4 text-lg text-blue-50">
            &quot;대한민국의 모든 헬스장이 GymHub를 통해 효율적으로 운영되고,
            <br />
            모든 회원이 편리하게 헬스장을 이용하는 생태계 구축&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
