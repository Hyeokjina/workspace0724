# GymHub 랜딩 페이지

GymHub 제품 요구사항 문서(PRD)를 기반으로 제작된 랜딩 페이지입니다.

## 기술 스택

- **Next.js** 15.1.4
- **React** 19.0.0
- **TypeScript** 5.x
- **Tailwind CSS** 3.4.1
- **shadcn/ui** (Radix UI 기반)
- **Lucide Icons**

## 주요 섹션

1. **Hero Section** - 제품 소개 및 주요 통계
2. **Features Section** - 역할별 맞춤 기능 (회원, 트레이너, 운영자)
3. **Tech Stack Section** - 검증된 기술 스택 및 시스템 아키텍처
4. **Roadmap Section** - 5단계 제품 로드맵
5. **CTA Section** - Call to Action 및 주요 지표
6. **Footer** - 브랜드 정보 및 링크

## 설치 방법

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 빌드

프로덕션 빌드:
```bash
npm run build
npm start
```

## 프로젝트 구조

```
gymhub-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 레이아웃
│   │   ├── page.tsx            # 메인 페이지
│   │   └── globals.css         # 글로벌 스타일
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   └── sections/           # 랜딩 페이지 섹션
│   │       ├── hero.tsx
│   │       ├── features.tsx
│   │       ├── tech-stack.tsx
│   │       ├── roadmap.tsx
│   │       ├── cta.tsx
│   │       └── footer.tsx
│   └── lib/
│       └── utils.ts            # 유틸리티 함수
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 주요 기능

- ✅ 반응형 디자인
- ✅ TypeScript 타입 안정성
- ✅ Tailwind CSS 스타일링
- ✅ shadcn/ui 컴포넌트
- ✅ Lucide 아이콘
- ✅ 최적화된 Next.js App Router

## 라이선스

이 프로젝트는 GymHub 제품의 일부로 제작되었습니다.

---

**제작**: GymHub 개발팀
**버전**: 1.0.0
**마지막 업데이트**: 2025-01-15
