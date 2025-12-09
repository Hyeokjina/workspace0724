import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  UserCheck,
  Building2,
  Calendar,
  ClipboardCheck,
  Dumbbell,
  Package,
  TrendingUp,
  Bell
} from "lucide-react";

const memberFeatures = [
  {
    icon: Calendar,
    title: "PT 예약 시스템",
    description: "트레이너별 PT 예약 및 일정 관리를 간편하게",
  },
  {
    icon: ClipboardCheck,
    title: "출결 관리",
    description: "입실/퇴실 기록 및 출석 이력 자동 조회",
  },
  {
    icon: User,
    title: "인바디 기록",
    description: "체성분 분석 기록 관리 및 시각화",
  },
  {
    icon: Bell,
    title: "운동 목표 관리",
    description: "개인 운동 목표 설정 및 달성 여부 추적",
  },
];

const trainerFeatures = [
  {
    icon: Calendar,
    title: "PT 일정 관리",
    description: "PT 예약 승인 및 일정 조회",
  },
  {
    icon: UserCheck,
    title: "담당 회원 관리",
    description: "담당 회원 조회 및 출결 현황 확인",
  },
];

const gymFeatures = [
  {
    icon: User,
    title: "회원 관리",
    description: "회원 등록, 조회, 수정, 삭제 및 검색",
  },
  {
    icon: Dumbbell,
    title: "기구 관리",
    description: "운동 기구 등록 및 상태 관리",
  },
  {
    icon: Package,
    title: "재고 관리",
    description: "재고 물품 입출고 관리 및 내역 조회",
  },
  {
    icon: TrendingUp,
    title: "매출 관리",
    description: "일별/월별 매출 통계 및 그래프 시각화",
  },
];

export function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            역할별 맞춤 기능
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            회원, 트레이너, 헬스장 운영자 각각의 역할에 최적화된 기능을 제공합니다
          </p>
        </div>

        {/* Member Features */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="mb-8 flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">일반 회원</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {memberFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trainer Features */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="mb-8 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">트레이너</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {trainerFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-green-500 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gym Features */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="mb-8 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">헬스장 운영자</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gymFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-purple-500 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <feature.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
