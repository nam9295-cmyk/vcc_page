// 비디오 소스 URL 정의
const MOBILE_VIDEO_URL = "https://github.com/nam9295-cmyk/asset/raw/refs/heads/main/freepik__-__95730.mp4";
const DESKTOP_VIDEO_URL = "https://github.com/nam9295-cmyk/asset/raw/refs/heads/main/0_Ai_generated_Winter_1920x1080.mp4";

const video = document.getElementById('hero-video');
const container = document.querySelector('.scroll-container');

// 변수 초기화
let targetTime = 0;
let isLooping = false;
let isDesktop = window.innerWidth >= 1024;

// 초기 비디오 소스 설정 및 상태 처리
function setupVideo() {
    const currentSrc = isDesktop ? DESKTOP_VIDEO_URL : MOBILE_VIDEO_URL;

    // 소스가 다를 때만 업데이트
    if (video.src !== currentSrc) {
        video.src = currentSrc;
        video.load();
    }

    if (isDesktop) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(e => console.log("자동 재생 차단됨:", e));
    } else {
        video.autoplay = false;
        video.loop = false;
        video.pause();
    }
}

setupVideo();

// 비디오 메타데이터 로드 확인
video.addEventListener('loadedmetadata', () => {
    if (!isDesktop) {
        updateTargetTime();
    }
});

// 윈도우 리사이즈 대응
window.addEventListener('resize', () => {
    const nextIsDesktop = window.innerWidth >= 1024;
    if (isDesktop !== nextIsDesktop) {
        isDesktop = nextIsDesktop;
        setupVideo();
        if (!isDesktop) {
            updateTargetTime();
        }
    }
});

// 스크롤 이벤트 (모바일에서만 동작)
window.addEventListener('scroll', () => {
    if (isDesktop) return;

    updateTargetTime();

    if (!isLooping) {
        isLooping = true;
        requestAnimationFrame(renderLoop);
    }
});

function updateTargetTime() {
    const maxScroll = container.offsetHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    let scrollProgress = currentScroll / maxScroll;

    if (scrollProgress < 0) scrollProgress = 0;
    if (scrollProgress > 1) scrollProgress = 1;

    if (video.duration) {
        targetTime = scrollProgress * video.duration;
    }
}

// 렌더링 루프 (모바일 스크롤 애니메이션용)
function renderLoop() {
    if (isDesktop) {
        isLooping = false;
        return;
    }

    if (video.readyState >= 2) {
        if (!video.seeking) {
            let diff = targetTime - video.currentTime;
            if (Math.abs(diff) > 0.01) {
                video.currentTime += diff * 0.1;
            }
        }
    }

    requestAnimationFrame(renderLoop);
}

// ========== 초콜릿 배지 애니메이션 ==========
const badges = document.querySelectorAll('.choco-badge');

function updateBadges() {
    if (isDesktop) return;

    const maxScroll = container.offsetHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    let scrollProgress = currentScroll / maxScroll;

    if (scrollProgress < 0) scrollProgress = 0;
    if (scrollProgress > 1) scrollProgress = 1;

    badges.forEach((badge, index) => {
        const appearAt = parseFloat(badge.dataset.appear) || 0;
        const fadeOutAt = appearAt + 0.25; // 25% 후에 사라지기 시작

        // 배지가 나타나야 할 시점
        if (scrollProgress >= appearAt && scrollProgress < fadeOutAt) {
            badge.style.opacity = '1';
            // 아래에서 위로 올라오는 애니메이션
            const localProgress = (scrollProgress - appearAt) / 0.25;
            const yPos = 70 - (localProgress * 40); // 70vh에서 30vh까지 이동
            badge.style.transform = `translateX(-50%) translateY(${yPos}vh)`;
        } else if (scrollProgress >= fadeOutAt) {
            // 위로 계속 올라가며 사라짐
            const fadeProgress = (scrollProgress - fadeOutAt) / 0.15;
            badge.style.opacity = Math.max(0, 1 - fadeProgress);
            const yPos = 30 - (fadeProgress * 30); // 30vh에서 0vh까지
            badge.style.transform = `translateX(-50%) translateY(${yPos}vh)`;
        } else {
            badge.style.opacity = '0';
            badge.style.transform = 'translateX(-50%) translateY(100vh)';
        }
    });
}

// 스크롤 이벤트에 배지 업데이트 추가
window.addEventListener('scroll', updateBadges);

// 초기 상태
updateBadges();

// ========== 메뉴 탭 & 슬라이더 기능 ==========
const tabButtons = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');
const productList = document.getElementById('product-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 탭 클릭 이벤트
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 활성 탭 변경
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.dataset.tab;

        // 상품 필터링
        productCards.forEach(card => {
            if (card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // 슬라이더 위치 초기화
        if (productList) {
            productList.scrollLeft = 0;
        }
    });
});

// 슬라이더 네비게이션 (데스크탑)
if (prevBtn && nextBtn && productList) {
    const scrollAmount = 350; // 스크롤 이동량

    prevBtn.addEventListener('click', () => {
        productList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        productList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// 초기 로드 시 'Signature' 탭 활성화
document.addEventListener('DOMContentLoaded', () => {
    // 'signature' 탭을 찾아서 클릭 (없으면 첫 번째 탭 클릭)
    const signatureTab = document.querySelector('.tab-btn[data-tab="signature"]');
    if (signatureTab) {
        signatureTab.click();
    } else {
        const firstTab = document.querySelector('.tab-btn');
        if (firstTab) firstTab.click();
    }
});

// ========== 헤더 스크롤 표시 로직 ==========
const siteHeader = document.getElementById('site-header');
const scrollContainer = document.querySelector('.scroll-container');

function updateHeaderVisibility() {
    if (!siteHeader || !scrollContainer) return;

    const scrollContainerBottom = scrollContainer.offsetTop + scrollContainer.offsetHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    // 스크롤 컨테이너가 거의 끝날 때 헤더 표시
    // 모바일: 스크롤이 90% 진행되면 (거의 끝날 때)
    // 데스크탑: 스크롤 컨테이너를 지나면
    const threshold = isDesktop ? scrollContainerBottom - 100 : scrollContainer.offsetHeight * 0.9;

    if (window.scrollY > threshold) {
        siteHeader.classList.add('visible');
    } else {
        siteHeader.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateHeaderVisibility);
updateHeaderVisibility();

// ========== 모바일 사이드 메뉴 토글 ==========
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

function openMobileNav() {
    if (mobileNav) mobileNav.classList.add('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('visible');
    document.body.style.overflow = '';
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileNav);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileNav);
}

if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
}

// 사이드 메뉴 링크 클릭 시 해당 탭으로 이동
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = link.getAttribute('href').replace('#', '');
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        if (tabBtn) {
            tabBtn.click();
            // 메뉴 섹션으로 스크롤
            const menuSection = document.querySelector('.menu-section');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        closeMobileNav();
    });
});
