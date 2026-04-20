# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성 (형식: `제목\n\n상세 설명`)
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

HTML, CSS, JavaScript, Tailwind CSS로 구성된 **정적 단일 페이지 개발자 웹 이력서** 프로젝트입니다. 빌드 도구 없이 브라우저에서 직접 실행되는 순수 정적 사이트입니다.

## 프로젝트 구조

```
resume/
├── index.html       # 메인 이력서 페이지 (모든 섹션 포함)
├── css/
│   └── style.css    # Tailwind 유틸리티로 커버되지 않는 커스텀 스타일, 애니메이션
├── js/
│   └── main.js      # 인터랙션: 스크롤 애니메이션, 다크모드 토글, 부드러운 스크롤
└── assets/
    └── images/      # 프로필 이미지 등 정적 에셋
```

## 기술 스택 및 설정

- **Tailwind CSS**: CDN 방식으로 로드 (`<script src="https://cdn.tailwindcss.com">`)
  - `darkMode: 'class'`, 커스텀 색상 `primary` (blue 계열), 폰트 `Noto Sans KR` 인라인 config로 설정
- **폰트**: Noto Sans KR (Google Fonts CDN)
- **아이콘**: Font Awesome 6.5.0 (CDN)
- **빌드 도구 없음**: `npm install` 불필요, `index.html`을 브라우저에서 직접 열어 개발
- **다크모드 FOUC 방지**: `<head>` 최상단 인라인 스크립트로 렌더링 전 `dark` 클래스 즉시 적용

## 개발 방법

```bash
# 로컬 미리보기
npx serve resume/
# 또는 Python 기본 서버 사용
python -m http.server 8080 --directory resume/
```

## 아키텍처 및 설계 원칙

- **단일 HTML 파일**: 모든 섹션(Hero, About, Skills, Experience, Projects, Education, Contact)은 `index.html` 내 `<section>` 태그로 구성
- **스타일 우선순위**: Tailwind 유틸리티 클래스 → 필요시 `style.css`에 커스텀 클래스 추가
- **JS 역할 최소화**: DOM 조작은 `main.js`에 집중. IIFE 패턴(`(function(){ ... })()`)으로 전역 스코프 오염 방지
  - `initDarkMode()`: 다크모드 토글 + localStorage 동기화
  - `initMobileMenu()`: 햄버거 메뉴 open/close + aria-expanded 처리
  - `initNavScroll()`: 스크롤 시 navbar 그림자 + 활성 링크 하이라이트
  - `initScrollAnimation()`: IntersectionObserver로 `.animate-target` → `.visible` 전환
  - `initSmoothScroll()`: 앵커 클릭 시 navbar 높이 offset 보정
- **반응형**: 모바일 퍼스트 (`sm:` → `md:` → `lg:` 순서로 Tailwind 브레이크포인트 적용)
- **다크모드**: Tailwind `darkMode: 'class'` 전략 사용, `localStorage`로 상태 유지. 시스템 설정(`prefers-color-scheme`) 자동 감지
- **접근성**: `prefers-reduced-motion` 미디어 쿼리로 애니메이션 비활성화, aria 속성 적용

## 섹션 구성

| 섹션 | 역할 |
|------|------|
| Hero | 이름, 직함, 한 줄 소개, 프로필 이미지, 외부 링크 버튼 |
| About | 자기소개 텍스트, 개인 정보 요약 |
| Skills | 기술 카테고리별 배지 (Language & Framework / Database & Infra / Tools & DevOps) |
| Experience | 타임라인 형태의 경력 목록 |
| Projects | 카드 그리드 (모바일 1열 → 데스크톱 3열) |
| Education | 학력 및 자격증 |
| Contact | 이메일, GitHub, LinkedIn 링크 |

## 주요 CSS 클래스 규칙

`style.css`에 정의된 커스텀 클래스 목록:

| 클래스 | 역할 |
|--------|------|
| `.animate-target` / `.visible` | 스크롤 진입 fade-in 애니메이션 |
| `.nav-link` / `.nav-link.active` | 데스크톱 네비게이션 링크 + 활성 상태 밑줄 |
| `.mobile-nav-link` | 모바일 드롭다운 메뉴 링크 |
| `.section-title` | 섹션 제목 (하단 파란색 밑줄 장식 포함) |
| `.btn-primary` / `.btn-outline` | Hero 섹션 CTA 버튼 |
| `.skill-badge` / `--green` / `--purple` | Skills 섹션 기술 배지 (색상 변형) |
| `.project-tag` | Projects 섹션 기술 태그 |
| `.project-link` / `.project-link--demo` | 프로젝트 카드 GitHub/Demo 링크 |
| `.contact-link` | Contact 섹션 연락처 링크 |

## 배포

GitHub Pages 또는 Netlify에 `resume/` 디렉토리를 루트로 정적 배포합니다.
