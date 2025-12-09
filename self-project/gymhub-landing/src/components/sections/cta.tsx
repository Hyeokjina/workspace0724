import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            GymHub와 함께 헬스장 운영을 혁신하고,
            <br />
            회원들에게 더 나은 경험을 제공하세요.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-base"
            >
              무료 체험 시작하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-base"
            >
              상담 신청하기
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">30%</p>
              <p className="mt-2 text-sm text-blue-100">운영 시간 절감</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">20%</p>
              <p className="mt-2 text-sm text-blue-100">매출 증대</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">99%</p>
              <p className="mt-2 text-sm text-blue-100">서비스 가용성</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
