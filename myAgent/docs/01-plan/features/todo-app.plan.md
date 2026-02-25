# Plan: todo-app

> PDCA Phase: **Plan**
> Created: 2026-02-24
> Status: In Progress

---

## 1. Overview (개요)

### 목표
할 일(Task)을 효율적으로 관리할 수 있는 Todo 웹 애플리케이션 개발

### 배경
개인 또는 팀의 일상적인 업무 관리를 위해, 직관적이고 사용하기 쉬운 Todo 앱이 필요함.

---

## 2. Feature Scope (기능 범위)

### ✅ In Scope (포함 기능)

| # | 기능 | 설명 |
|---|------|------|
| F-01 | 할 일 추가 | 텍스트 입력으로 새 할 일 생성 |
| F-02 | 할 일 완료 처리 | 체크박스로 완료/미완료 토글 |
| F-03 | 할 일 삭제 | 개별 또는 완료된 항목 일괄 삭제 |
| F-04 | 할 일 수정 | 기존 할 일 텍스트 인라인 편집 |
| F-05 | 필터링 | 전체/진행중/완료 탭 필터 |
| F-06 | 우선순위 설정 | 높음/중간/낮음 우선순위 표시 |
| F-07 | 카테고리/태그 | 할 일에 카테고리 분류 |
| F-08 | 마감일 설정 | 날짜 기반 마감일 지정 |
| F-09 | 데이터 영속성 | LocalStorage를 통한 데이터 유지 |
| F-10 | 진행 현황 표시 | 완료율 진행 바 표시 |

### ❌ Out of Scope (제외 기능)

- 사용자 인증/로그인 (Phase 1 기준)
- 팀 협업 기능
- 모바일 앱 (웹만 지원)
- 서버 백엔드 연동

---

## 3. User Stories (사용자 스토리)

```
US-01: 사용자로서, 새로운 할 일을 빠르게 추가하고 싶다.
       → 입력창에 텍스트 입력 후 Enter 또는 버튼으로 추가

US-02: 사용자로서, 완료한 일을 표시하여 진행 상황을 확인하고 싶다.
       → 체크박스 클릭으로 완료 토글, 취소선 스타일 적용

US-03: 사용자로서, 중요한 할 일을 우선순위로 구분하고 싶다.
       → 색상 배지로 High/Medium/Low 표시

US-04: 사용자로서, 할 일 목록을 상태별로 필터링하고 싶다.
       → All / Active / Completed 탭 전환

US-05: 사용자로서, 앱을 닫아도 데이터가 유지되길 원한다.
       → LocalStorage 저장으로 새로고침 후에도 유지
```

---

## 4. Technical Stack (기술 스택)

| 영역 | 기술 | 선택 이유 |
|------|------|-----------|
| Frontend | React + Vite | 컴포넌트 기반, 빠른 개발 |
| Styling | Tailwind CSS | 유틸리티 클래스, 빠른 UI 구성 |
| State | React useState/useReducer | 별도 라이브러리 없이 간단 관리 |
| Storage | LocalStorage | 서버 불필요, 즉시 사용 |
| Language | TypeScript | 타입 안정성 |

---

## 5. Project Structure (프로젝트 구조)

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoInput.tsx       # 할 일 입력
│   │   ├── TodoList.tsx        # 목록 컨테이너
│   │   ├── TodoItem.tsx        # 개별 할 일 아이템
│   │   ├── FilterTabs.tsx      # 필터 탭
│   │   └── ProgressBar.tsx     # 진행 현황
│   ├── hooks/
│   │   └── useTodos.ts         # Todo 비즈니스 로직
│   ├── types/
│   │   └── todo.ts             # TypeScript 타입 정의
│   ├── utils/
│   │   └── storage.ts          # LocalStorage 유틸
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 6. Data Model (데이터 모델)

```typescript
type Priority = 'high' | 'medium' | 'low';
type Category = 'work' | 'personal' | 'shopping' | 'other';
type FilterType = 'all' | 'active' | 'completed';

interface Todo {
  id: string;           // UUID
  text: string;         // 할 일 텍스트
  completed: boolean;   // 완료 여부
  priority: Priority;   // 우선순위
  category: Category;   // 카테고리
  dueDate?: string;     // 마감일 (ISO 8601)
  createdAt: string;    // 생성일
  updatedAt: string;    // 수정일
}
```

---

## 7. Acceptance Criteria (완료 기준)

| # | 기준 | 확인 방법 |
|---|------|-----------|
| AC-01 | 할 일 CRUD 동작 | 추가/수정/삭제/완료 모두 정상 작동 |
| AC-02 | 필터 동작 | All/Active/Completed 전환 정상 |
| AC-03 | 데이터 영속성 | 새로고침 후 데이터 유지 |
| AC-04 | 우선순위 표시 | 색상 배지 정상 표시 |
| AC-05 | 반응형 UI | 모바일/데스크톱 모두 정상 렌더링 |
| AC-06 | 빈 상태 처리 | 할 일 없을 때 Empty State 표시 |

---

## 8. Implementation Phases (구현 단계)

```
[Phase 1] 기본 CRUD ──────→ Todo 추가/완료/삭제
[Phase 2] 필터링 ──────────→ 상태별 필터 탭
[Phase 3] 상세 기능 ───────→ 우선순위/카테고리/마감일
[Phase 4] UI 완성 ─────────→ 반응형, 애니메이션, Empty State
[Phase 5] 저장/최적화 ─────→ LocalStorage, 성능 최적화
```

---

## 9. Risks & Mitigations (위험 요소)

| 위험 | 완화 방법 |
|------|-----------|
| LocalStorage 용량 제한 | 최대 항목 수 제한 (예: 1000개) |
| 상태 관리 복잡성 증가 | useReducer 패턴으로 일관성 유지 |
| TypeScript 타입 오류 | 엄격한 타입 정의로 사전 방지 |

---

## 10. Next Step (다음 단계)

- [ ] `/pdca design todo-app` — 상세 설계 문서 작성
- [ ] 컴포넌트 구조 상세 설계
- [ ] UI 목업 작성 (Phase 3)
