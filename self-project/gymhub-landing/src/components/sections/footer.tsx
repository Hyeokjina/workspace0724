import { Dumbbell } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">GymHub</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              헬스장 운영에 필요한 모든 기능을 통합 관리할 수 있는
              <br />
              웹 기반 종합 관리 플랫폼
            </p>
            <p className="mt-4 text-sm text-gray-400">
              © 2025 GymHub. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">제품</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  기능 소개
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  가격 정책
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  로드맵
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  업데이트
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">회사</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  소개
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  블로그
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  고객 지원
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-xs text-gray-400">
            Version 1.0.0 | 제작: GymHub 개발팀 | 기술 스택: Spring Boot + MyBatis + Oracle + Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
