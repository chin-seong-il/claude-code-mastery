// main.js — 개발자 웹 이력서 인터랙션
(function () {
  'use strict';

  initDarkMode();
  initMobileMenu();
  initNavScroll();
  initScrollAnimation();
  initSmoothScroll();

  // ===================================
  // 1. 다크모드
  // ===================================
  function initDarkMode() {
    const html = document.documentElement;
    const toggleBtns = [
      document.getElementById('darkToggle'),
      document.getElementById('darkToggleMobile'),
    ].filter(Boolean);

    // localStorage 저장값 또는 시스템 설정으로 초기 테마 적용
    // (FOUC 방지 인라인 스크립트가 <head>에서 이미 처리했지만, 버튼 상태 동기화를 위해 재확인)
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      html.classList.add('dark');
    }

    // 토글 버튼 클릭 이벤트
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    });
  }

  // ===================================
  // 2. 모바일 햄버거 메뉴
  // ===================================
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function () {
      const isHidden = mobileMenu.classList.toggle('hidden');
      const icon = menuToggle.querySelector('i');

      if (isHidden) {
        icon.className = 'fa-solid fa-bars text-base';
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        icon.className = 'fa-solid fa-xmark text-base';
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        const icon = menuToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars text-base';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===================================
  // 3. 네비게이션 스크롤 동작
  //    - 스크롤 시 navbar 그림자 추가
  //    - 현재 섹션에 해당하는 nav 링크 활성화
  // ===================================
  function initNavScroll() {
    var navbar = document.getElementById('navbar');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('main > section[id]');

    function onScroll() {
      // navbar 그림자
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // 활성 링크 업데이트
      updateActiveLink();
    }

    function updateActiveLink() {
      var currentId = '';
      var navbarHeight = navbar ? navbar.offsetHeight : 64;
      // 뷰포트 중간 지점 기준으로 현재 섹션 판별
      var scrollMid = window.scrollY + navbarHeight + 20;

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollMid) {
          currentId = section.id;
        }
      });

      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === '#' + currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // 페이지 로드 시 초기 상태 적용
    updateActiveLink();
  }

  // ===================================
  // 4. 스크롤 애니메이션 (Intersection Observer)
  // ===================================
  function initScrollAnimation() {
    var targets = document.querySelectorAll('.animate-target');

    // IntersectionObserver 미지원 브라우저 폴백: 즉시 표시
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 한 번 실행 후 관찰 해제
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===================================
  // 5. 부드러운 스크롤 (navbar 높이 offset 보정)
  // ===================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var navbar = document.getElementById('navbar');
        var navbarHeight = navbar ? navbar.offsetHeight : 64;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

})();
