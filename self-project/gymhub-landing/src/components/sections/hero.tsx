import { Button } from "@/components/ui/button";
import { Dumbbell, Users, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              헬스장 운영의 새로운 기준{" "}
              <span className="font-semibold text-blue-600">
                <span className="absolute inset-0" aria-hidden="true" />
                GymHub <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            헬스장 통합 관리
            <br />
            <span className="text-blue-600">플랫폼 GymHub</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            회원, 트레이너, 헬스장 운영자를 위한 올인원 솔루션.
            <br />
            운영 효율을 극대화하고 회원 만족도를 향상시키세요.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="text-base">
              무료 체험 시작하기
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              데모 보기 <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Dumbbell className="h-8 w-8 text-blue-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">100+</p>
              <p className="mt-2 text-sm text-gray-600">제휴 헬스장</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">10,000+</p>
              <p className="mt-2 text-sm text-gray-600">활성 사용자</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">99%</p>
              <p className="mt-2 text-sm text-gray-600">고객 만족도</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
