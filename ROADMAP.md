# 개발자 웹 이력서 개발 로드맵

## 프로젝트 목표

HTML, CSS, JavaScript, Tailwind CSS를 사용하여 반응형 정적 단일 페이지 개발자 웹 이력서를 제작합니다.

---

## Phase 1. 프로젝트 초기 설정 ✅

- [x] 디렉토리 구조 생성
  ```
  resume/
  ├── index.html
  ├── css/
  │   └── style.css
  ├── js/
  │   └── main.js
  └── assets/
      └── images/
  ```
- [x] `index.html` 기본 HTML5 보일러플레이트 작성
- [x] Tailwind CSS CDN 연결 (`https://cdn.tailwindcss.com`)
  - `tailwind.config` 인라인 스크립트로 커스텀 색상(`primary`) 및 폰트 설정 포함
- [x] Google Fonts (Noto Sans KR) CDN 연결
- [x] `style.css`, `main.js` 파일 연결
- [x] Font Awesome 6.5.0 CDN 연결 (아이콘)
- [x] 다크모드 FOUC 방지 인라인 스크립트 (`<head>` 최상단)

---

## Phase 2. 레이아웃 및 공통 컴포넌트 ✅

- [x] 다크모드 토글 버튼 (데스크톱 네비게이션 우측 + 모바일 헤더)
- [x] 상단 고정 네비게이션 바 (`position: fixed`, backdrop-blur 적용)
  - 로고(진승일) + 섹션 링크(About, Skills, Experience, Projects, Education, Contact)
  - 모바일 햄버거 메뉴 (드롭다운 방식)
- [x] 부드러운 스크롤(Smooth Scroll) 설정 (`html { scroll-behavior: smooth }` + JS offset 보정)
- [x] 스크롤 애니메이션 기반 클래스 정의
  - `.animate-target` (초기 상태: opacity 0, translateY 24px)
  - `.animate-target.visible` (표시 상태: opacity 1, translateY 0)
  - `prefers-reduced-motion` 미디어 쿼리로 접근성 처리

---

## Phase 3. 섹션별 UI 개발 ✅

### 3-1. Hero 섹션
- [x] 이름(진승일), 직함(Back-End Developer) 표시
- [x] 한 줄 소개 문구 (3년차 백엔드 개발자)
- [x] GitHub / LinkedIn 링크 버튼 (`.btn-primary` / `.btn-outline`)
- [x] 프로필 이미지 (원형, `ring-4` 테두리, 이미지 로드 실패 시 플레이스홀더 fallback)
- [x] 그라디언트 배경 (라이트: blue→indigo→purple / 다크: gray-900)

### 3-2. About 섹션
- [x] 자기소개 텍스트 3문단 (백엔드 아키텍처, DB/캐싱/보안 경험, 클린 코드 지향)
- [x] 개인 정보 카드 (거주지: 서울특별시, 이메일: hong@example.com, 경력: 3년차, 상태: 프리랜서 가능)

### 3-3. Skills 섹션
- [x] 기술 카테고리별 분류 3개 카드 그리드
  - **Language & Framework**: Java, Spring Boot, Spring Security, Node.js, Express, Python
  - **Database & Infra**: MySQL, PostgreSQL, MongoDB, Redis, AWS, Docker
  - **Tools & DevOps**: Git, GitHub Actions, Nginx, Linux, Postman, IntelliJ
- [x] 기술 태그 배지 (`.skill-badge`, `.skill-badge--green`, `.skill-badge--purple`)

### 3-4. Experience 섹션
- [x] 타임라인 형태의 경력 목록 (좌측 세로선 + 원형 마커)
- [x] 경력 1: 백엔드 개발자 / 프리랜서 (2022.03 ~ 현재) — REST API, 쿼리 최적화, Redis, CI/CD
- [x] 경력 2: 주니어 백엔드 개발자 / (주)테크솔루션즈 (2020.07 ~ 2022.02) — Node.js/Express, MySQL, 테스트

### 3-5. Projects 섹션
- [x] 카드 그리드 레이아웃 (모바일 1열 → 태블릿 2열 → 데스크톱 3열)
- [x] 호버 시 카드 상승 + 그림자 강화 트랜지션
- [x] 프로젝트 1: 커머스 API 서버 (Spring Boot, MySQL, Redis)
- [x] 프로젝트 2: 실시간 채팅 서버 (Node.js, Socket.IO, MongoDB)
- [x] 프로젝트 3: DevOps 배포 자동화 (Docker, GitHub Actions, AWS EC2)

### 3-6. Education 섹션
- [x] 학력: OO대학교 컴퓨터공학과 (2016.03 ~ 2022.02 졸업)
- [x] 자격증: 정보처리기사 (2021.11), 백엔드 부트캠프 수료 (코드스쿨, 2020.06), AWS Cloud Practitioner (2023.04)

### 3-7. Contact 섹션
- [x] 이메일, GitHub, LinkedIn 아이콘 + 링크 (`.contact-link`)
- [x] 연락 안내 문구
- [x] 푸터 (© 2024 진승일)

---

## Phase 4. 스타일 및 인터랙션 ✅

- [x] Tailwind `darkMode: 'class'` 설정 및 다크모드 색상 적용 전반
- [x] 다크모드 토글: `<html>` 태그 `dark` 클래스 토글 + `localStorage` 저장
  - 시스템 다크모드(`prefers-color-scheme`) 자동 감지
- [x] Intersection Observer로 섹션 진입 시 fade-in 애니메이션 (threshold: 0.12)
  - 한 번 표시 후 `unobserve`로 관찰 해제
  - IntersectionObserver 미지원 브라우저 폴백 처리
- [x] 네비게이션 활성 링크 하이라이트 (스크롤 위치 기반, `.nav-link.active`)
- [x] 스크롤 시 navbar 그림자 효과 (`#navbar.scrolled`)
- [x] 호버 효과, 버튼 트랜지션 통일 (`transition-colors`, `transition-all duration-300`)
- [x] 커스텀 스크롤바 스타일 (웹킷 계열, 라이트/다크 모드 대응)

---

## Phase 5. 반응형 대응 ✅

- [x] 모바일 퍼스트 (`sm:` → `md:` → `lg:` 순서로 Tailwind 브레이크포인트 적용)
- [x] 네비게이션: 모바일 햄버거 메뉴 (`md:hidden` / `hidden md:flex` 분기)
  - 메뉴 링크 클릭 시 자동 닫힘, aria-expanded 접근성 속성 처리
- [x] Hero: 모바일 세로 스택 (`flex-col-reverse`) → 데스크톱 가로 배치 (`md:flex-row`)
- [x] 프로젝트 카드: 모바일 1열 → 태블릿 2열 (`md:grid-cols-2`) → 데스크톱 3열 (`lg:grid-cols-3`)
- [x] 이미지 크기 반응형 (`w-48 sm:w-64`), 폰트 크기 반응형 (`text-5xl sm:text-6xl lg:text-7xl`)
- [x] About 그리드: 모바일 1열 → 데스크톱 3열 (`md:grid-cols-3`)
- [x] Education 그리드: 모바일 1열 → 데스크톱 2열 (`md:grid-cols-2`)

---

## Phase 6. 마무리 및 배포

- [ ] 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)
- [ ] 모바일 기기 실사용 테스트
- [ ] Lighthouse 성능/접근성 점수 확인 (목표: 90점 이상)
- [ ] GitHub Pages 또는 Netlify 배포
  ```bash
  npx serve resume/
  # 또는
  python -m http.server 8080 --directory resume/
  ```
- [ ] 커스텀 도메인 연결 (선택)

---

## 이력서 콘텐츠 현황

| 항목 | 내용 |
|------|------|
| 이름 | 진승일 |
| 직함 | Back-End Developer |
| 소개 | 안정적이고 확장 가능한 서버를 설계하는 3년차 백엔드 개발자 |
| 거주지 | 서울특별시 |
| 이메일 | hong@example.com |
| 경력 | 프리랜서 백엔드 개발자 (2022.03~현재), (주)테크솔루션즈 주니어 백엔드 (2020.07~2022.02) |
| 학력 | OO대학교 컴퓨터공학과 졸업 (2022.02) |
| 자격증 | 정보처리기사, AWS Cloud Practitioner, 백엔드 부트캠프 수료 |
| 연락처 | hong@example.com / github.com/honggildong / LinkedIn |

---

## 참고 기술 스택

| 역할 | 기술 |
|------|------|
| 마크업 | HTML5 |
| 스타일 | CSS3, Tailwind CSS (CDN) |
| 인터랙션 | Vanilla JavaScript (ES6+, IIFE 패턴) |
| 폰트 | Google Fonts - Noto Sans KR |
| 아이콘 | Font Awesome 6.5.0 (CDN) |
| 배포 | GitHub Pages / Netlify |
