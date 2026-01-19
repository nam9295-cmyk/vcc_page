import { useEffect, useRef, useState } from 'react';
import './HeroSection.css';

// 비디오 소스 URL 정의
const MOBILE_VIDEO_URL = "https://github.com/nam9295-cmyk/asset/raw/refs/heads/main/freepik__-__95730.mp4";
const DESKTOP_VIDEO_URL = "https://github.com/nam9295-cmyk/asset/raw/refs/heads/main/0_Ai_generated_Winter_1920x1080.mp4";

function HeroSection() {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(() => {
        // SSR-safe check
        if (typeof window === 'undefined') return true;
        return window.innerWidth >= 1024;
    });

    // Handle resize to switch between desktop and mobile
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Setup video based on desktop/mobile
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const videoUrl = isDesktop ? DESKTOP_VIDEO_URL : MOBILE_VIDEO_URL;

        // Update video source if different
        if (video.src !== videoUrl) {
            video.src = videoUrl;
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
    }, [isDesktop]);

    // Mobile: scroll-based video progress
    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;

        if (!video || !container || isDesktop) return;

        let targetTime = 0;
        let animationId = null;

        const updateTargetTime = () => {
            const maxScroll = container.offsetHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            let scrollProgress = currentScroll / maxScroll;

            if (scrollProgress < 0) scrollProgress = 0;
            if (scrollProgress > 1) scrollProgress = 1;

            if (video.duration) {
                targetTime = scrollProgress * video.duration;
            }

            // Update badges
            const badges = container.querySelectorAll('.choco-badge');
            badges.forEach(badge => {
                const appearAt = parseFloat(badge.dataset.appear) || 0;
                const fadeOutAt = appearAt + 0.25;

                if (scrollProgress >= appearAt && scrollProgress < fadeOutAt) {
                    badge.style.opacity = '1';
                    const localProgress = (scrollProgress - appearAt) / 0.25;
                    const yPos = 70 - (localProgress * 40);
                    badge.style.transform = `translateX(-50%) translateY(${yPos}vh)`;
                } else if (scrollProgress >= fadeOutAt) {
                    const fadeProgress = (scrollProgress - fadeOutAt) / 0.15;
                    badge.style.opacity = Math.max(0, 1 - fadeProgress);
                    const yPos = 30 - (fadeProgress * 30);
                    badge.style.transform = `translateX(-50%) translateY(${yPos}vh)`;
                } else {
                    badge.style.opacity = '0';
                    badge.style.transform = 'translateX(-50%) translateY(100vh)';
                }
            });
        };

        const renderLoop = () => {
            if (video.readyState >= 2 && !video.seeking) {
                const diff = targetTime - video.currentTime;
                if (Math.abs(diff) > 0.01) {
                    video.currentTime += diff * 0.1;
                }
            }
            animationId = requestAnimationFrame(renderLoop);
        };

        const handleScroll = () => {
            updateTargetTime();
        };

        window.addEventListener('scroll', handleScroll);
        animationId = requestAnimationFrame(renderLoop);
        updateTargetTime();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isDesktop]);

    return (
        <main id="main-content" role="main">
            <div className="scroll-container" ref={containerRef}>
                <div className="sticky-wrapper">
                    <video ref={videoRef} id="hero-video" muted playsInline preload="auto">
                        <source
                            src={isDesktop ? DESKTOP_VIDEO_URL : MOBILE_VIDEO_URL}
                            type="video/mp4"
                        />
                    </video>

                    {/* 중앙 로고 */}
                    <div className="hero-logo">
                        <img src="/logo.png" alt="베리굿초콜릿 VCC 로고" />
                    </div>

                    {/* 스크롤 텍스트 배지들 (모바일 전용) */}
                    <div className="scroll-badges">
                        <div className="choco-badge" data-appear="0.1">
                            <span>Cacao 100%</span>
                        </div>
                        <div className="choco-badge" data-appear="0.3">
                            <span>Cacao 70.5%</span>
                        </div>
                        <div className="choco-badge" data-appear="0.5">
                            <span>Cacao 57.9%</span>
                        </div>
                        <div className="choco-badge" data-appear="0.7">
                            <span>Milk Chocolate</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HeroSection;
