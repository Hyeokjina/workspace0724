# 🏋️ GymHub Landing Page

**Retro-Futuristic Athletic Design**

80년대 피트니스 문화와 현대적 기하학이 만난 독특한 랜딩 페이지입니다.

## 🎨 Design Concept

### Aesthetic Direction
- **Retro-Futuristic Athletic**: 80년대 네온 에너지 + 현대적 체계성
- **Color Palette**: Neon Cyan (#00f0ff), Hot Pink (#ff0080), Electric Purple (#7d00ff)
- **Typography**: Bebas Neue (Display) + Public Sans (Body)
- **Motion**: 카운터 애니메이션, 그라데이션 시프트, 카드 3D 효과

### Unique Features
- 🎯 **Cursor Spotlight**: 마우스를 따라다니는 그라데이션 스팟라이트
- ✨ **Neon Glow**: 네온 사인 효과의 텍스트와 버튼
- 📊 **Counter Animation**: 숫자가 카운팅되는 애니메이션
- 🎬 **Staggered Reveals**: 순차적으로 나타나는 요소들
- 🌈 **Animated Gradients**: 움직이는 그라데이션 배경
- 🔲 **Retro Grid**: 레트로 스타일 그리드 패턴

## 🚀 Tech Stack

- **Framework**: Next.js 15.1.4 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.1 + Custom CSS
- **Icons**: Emoji (네이티브)
- **Fonts**: Google Fonts (Bebas Neue, Public Sans)

## 📦 Installation

```bash
cd gymhub-landing
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 🎯 Sections

1. **Hero Section**
   - 네온 타이포그래피
   - 카운터 애니메이션 통계
   - 대각선 그라데이션 배경

2. **Features Section**
   - 역할별 기능 카드 (회원/트레이너/운영자)
   - 3D 카드 호버 효과
   - 컬러 코딩된 섹션

3. **Tech Stack Section**
   - 기술 스택 그리드
   - 시스템 아키텍처 다이어그램
   - 펄스 인디케이터

4. **Roadmap Section**
   - 5단계 로드맵 카드
   - 상태 배지 (완료/진행중/계획)
   - 비전 스테이트먼트

5. **CTA Section**
   - 애니메이션 그라데이션 배경
   - 네온 버튼
   - 주요 지표 그리드

6. **Footer**
   - 링크 그리드
   - 소셜 미디어 아이콘
   - 기술 배지

## 🎨 Custom CSS Classes

```css
.neon-text          /* 네온 글로우 효과 */
.neon-button        /* 네온 버튼 스타일 */
.animated-gradient  /* 움직이는 그라데이션 */
.retro-grid        /* 레트로 그리드 패턴 */
.card-3d           /* 3D 카드 효과 */
.fade-in-up        /* 페이드 인 애니메이션 */
.pulse-glow        /* 펄스 글로우 */
```

## 🌟 Key Design Principles

1. **Bold Color Choices**: 강렬한 네온 컬러 팔레트
2. **Kinetic Typography**: Bebas Neue로 역동적인 헤드라인
3. **Interactive Effects**: 마우스 커서, 호버 상태, 애니메이션
4. **Retro-Modern Fusion**: 80년대 감성과 현대적 UI의 조화
5. **Spatial Hierarchy**: 대각선 레이아웃과 Z-축 효과

## 📁 Project Structure

```
gymhub-landing/
├── src/
│   ├── app/
│   │   ├── globals.css          # 커스텀 CSS + Tailwind
│   │   ├── layout.tsx
│   │   └── page.tsx             # 메인 페이지
│   └── components/
│       ├── CursorSpotlight.tsx  # 커서 스팟라이트
│       └── sections/
│           ├── HeroSection.tsx
│           ├── FeaturesSection.tsx
│           ├── TechStackSection.tsx
│           ├── RoadmapSection.tsx
│           ├── CTASection.tsx
│           └── FooterSection.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎭 Design Philosophy

이 랜딩 페이지는 **"AI slop" 미학을 피하고** 진정으로 독특한 디자인을 추구합니다:

- ❌ 흔한 Inter/Roboto 폰트 대신 → ✅ Bebas Neue + Public Sans
- ❌ 평범한 보라색 그라데이션 대신 → ✅ 네온 시안/핑크/퍼플
- ❌ 정적인 카드 레이아웃 대신 → ✅ 3D 호버, 글로우, 애니메이션
- ❌ 단조로운 백그라운드 대신 → ✅ 레트로 그리드, 애니메이션 그라데이션

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📝 License

GymHub 제품의 일부로 제작되었습니다.

---

**Created by**: GymHub Development Team
**Version**: 1.0.0
**Design Theme**: Retro-Futuristic Athletic
**Last Updated**: 2025-01-15
