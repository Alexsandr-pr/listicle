window.addEventListener("DOMContentLoaded", () => {
    let swiper = null;

    const swiperContainer = document.querySelector(".tools__swiper");
    const swiperWrapper = swiperContainer?.querySelector(".tools__swiper-wrapper");
    const swiperSlides = swiperContainer?.querySelectorAll(".tools__slide");

    function initSwiper() {
        swiperContainer.classList.add("swiper");
        swiperWrapper.classList.add("swiper-wrapper");
        swiperSlides.forEach(slide => slide.classList.add("swiper-slide"));

        return new Swiper(".tools__swiper", {
            slidesPerView: "auto",
            spaceBetween: 24,
            navigation: {
                nextEl: ".tools__swiper-button-next",
                prevEl: ".tools__swiper-button-prev",
            },
            grabCursor: true,
            allowTouchMove: true,
            simulateTouch: true,
            touchAngle: 20,
            speed: 450,
            mousewheel: {
                forceToAxis: true,
                releaseOnEdges: true,
                thresholdDelta: 60,
                thresholdTime: 200,
                sensitivity: 0.5,
            },
        });
    }

    function destroySwiper() {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }

        swiperContainer.classList.remove("swiper");
        swiperWrapper.classList.remove("swiper-wrapper");
        swiperSlides.forEach(slide => slide.classList.remove("swiper-slide"));
    }

    function handleResize() {
        const isDesktop = window.innerWidth > 1280.98;

        if (isDesktop && !swiper) {
            swiper = initSwiper();
        } else if (!isDesktop && swiper) {
            destroySwiper();
        }
    }


    handleResize();

    window.addEventListener("resize", () => {
        handleResize();
    });

    const ANIM_CONFIG = {
        default: {
            container: { w: 700, h: 285 },
            steps: [
                { from: { bottom: 97, right: 349 }, to: { bottom: 215, right: 504 }, duration: 1000 },
                { from: { bottom: 215, right: 504 }, to: { bottom: -13, right: 1 }, duration: 1000 },
                { from: { bottom: -13, right: 1 }, to: { bottom: 80, right: 132 }, duration: 1000 },
                {
                    options: {
                        option1: { from: { bottom: 80, right: 132 }, to: { bottom: 164, right: 32 }, duration: 800 },
                        option2: { from: { bottom: 80, right: 132 }, to: { bottom: 144, right: 34 }, duration: 800 },
                        option3: { from: { bottom: 80, right: 132 }, to: { bottom: 155, right: 28 }, duration: 800 },
                    },
                },
                {
                    options: {
                        option1: { from: { bottom: 164, right: 32 }, to: { bottom: 97, right: 349 }, duration: 500 },
                        option2: { from: { bottom: 144, right: 34 }, to: { bottom: 97, right: 349 }, duration: 500 },
                        option3: { from: { bottom: 155, right: 28 }, to: { bottom: 97, right: 349 }, duration: 500 },
                    },
                },
            ],
        },
        mobile: {
            container: { w: 292, h: 289 },
            steps: [
                { from: { bottom: 99, right: 115 }, to: { bottom: 219, right: 125 }, duration: 1000 },
                { from: { bottom: 219, right: 125 }, to: { bottom: -10, right: 22 }, duration: 1000 },
                { from: { bottom: -10, right: 22 }, to: { bottom: 108, right: 6 }, duration: 1000 },
                {
                    options: {
                        option1: { from: { bottom: 108, right: 6 }, to: { bottom: 176, right: 6 }, duration: 800 },
                        option2: { from: { bottom: 108, right: 6 }, to: { bottom: 176, right: 6 }, duration: 800 },
                        option3: { from: { bottom: 108, right: 6 }, to: { bottom: 176, right: 6 }, duration: 800 },
                    },
                },
                {
                    options: {
                        option1: { from: { bottom: 176, right: 6 }, to: { bottom: 99, right: 115 }, duration: 500 },
                        option2: { from: { bottom: 176, right: 6 }, to: { bottom: 99, right: 115 }, duration: 500 },
                        option3: { from: { bottom: 176, right: 6 }, to: { bottom: 99, right: 115 }, duration: 500 },
                    },
                },
            ],
        },
    };

    const toolsAnim = document.querySelectorAll(".tools-anim");

    if (toolsAnim?.length > 0) {
        toolsAnim.forEach((tool) => {
            const cursor = tool.querySelector(".tools-anim__cursor");
            const svgPath = cursor.querySelector("path");
            const textarea = tool.querySelector(".tools-anim__textarea");
            const imgBlock = tool.querySelector(".tools-anim__img");
            const loading = tool.querySelector(".tools-anim__loading");
            const loadingPath = loading.querySelector("path");
            const result = tool.querySelector(".tools-anim__result");
            const cursorSpan = cursor.querySelector("span");

            const mediaQuery = 510.98
            let isRunning = false;
            let currentMode = null;

            function getConfig() {
                return window.innerWidth <= mediaQuery ? ANIM_CONFIG.mobile : ANIM_CONFIG.default;
            }

            function animateMove(element, from, to, duration, fadeTargets = []) {
                return new Promise((resolve) => {
                    const start = performance.now();
                    const { w, h } = getConfig().container;

                    const fromPercent = {
                        bottom: (from.bottom / h) * 100,
                        right: (from.right / w) * 100,
                    };
                    const toPercent = {
                        bottom: (to.bottom / h) * 100,
                        right: (to.right / w) * 100,
                    };

                    function step(now) {
                        if (!isRunning) return;
                        const progress = Math.min((now - start) / duration, 1);
                        const ease =
                            progress < 0.5
                                ? 2 * progress * progress
                                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                        const bottom =
                            fromPercent.bottom + (toPercent.bottom - fromPercent.bottom) * ease;
                        const right =
                            fromPercent.right + (toPercent.right - fromPercent.right) * ease;

                        element.style.bottom = `${bottom}%`;
                        element.style.right = `${right}%`;

                        if (fadeTargets.length)
                            fadeTargets.forEach((t) => (t.style.opacity = 1 - ease));

                        if (progress < 1) requestAnimationFrame(step);
                        else resolve();
                    }

                    requestAnimationFrame(step);
                });
            }

            function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }

            async function runSequence() {
                isRunning = true;
                currentMode = window.innerWidth <= mediaQuery ? "mobile" : "default";

                while (isRunning) {
                    const cfg = getConfig();
                    const opt = tool.classList.contains("option-2")
                        ? "option2"
                        : tool.classList.contains("option-3")
                            ? "option3"
                            : "option1";

                    await animateMove(cursor, cfg.steps[0].from, cfg.steps[0].to, cfg.steps[0].duration);
                    svgPath.style.transition = "fill 300ms ease-in-out";
                    await delay(300);
                    svgPath.setAttribute("fill", "var(--Main-Blue-500)");
                    await delay(300);
                    svgPath.setAttribute("fill", "var(--Main-Blue-600)");
                    await delay(300);
                    if (!isRunning) break;

                    await delay(300);
                    await animateMove(cursor, cfg.steps[1].from, cfg.steps[1].to, cfg.steps[1].duration);
                    if (!isRunning) break;

                    await delay(300);
                    svgPath.setAttribute("fill", "var(--Main-Blue-500)");
                    await delay(300);
                    svgPath.setAttribute("fill", "var(--Main-Blue-600)");
                    await delay(300);

                    await animateMove(cursor, cfg.steps[2].from, cfg.steps[2].to, cfg.steps[2].duration, [textarea, imgBlock]);
                    if (!isRunning) break;

                    textarea.style.display = "none";
                    imgBlock.style.display = "none";
                    await delay(200);

                    loading.style.opacity = "1";
                    loadingPath.style.transition = "stroke-dashoffset 2s linear";
                    loadingPath.style.strokeDashoffset = "0";
                    await delay(2000);

                    loading.style.opacity = "0";
                    cursorSpan.style.background = "var(--Main-Blue-400, #99CAFF)";
                    result.style.display = "flex";
                    result.style.opacity = "1";

                    await animateMove(
                        cursor,
                        cfg.steps[3].options[opt].from,
                        cfg.steps[3].options[opt].to,
                        cfg.steps[3].options[opt].duration
                    );
                    if (!isRunning) break;

                    await delay(300);
                    svgPath.setAttribute("fill", "var(--Main-Blue-500)");
                    await delay(300);
                    svgPath.setAttribute("fill", "var(--Main-Blue-600)");
                    await delay(800);


                    const fadeDuration = 800;
                    const moveCfg = cfg.steps[4].options[opt];

                    result.style.transition = `opacity 0ms ease`;
                    textarea.style.transition = `opacity ${fadeDuration}ms ease`;
                    imgBlock.style.transition = `opacity ${fadeDuration}ms ease`;

                    result.style.opacity = "0";
                    textarea.style.display = "";
                    imgBlock.style.display = "";
                    textarea.style.opacity = "1";
                    imgBlock.style.opacity = "1";


                    await Promise.all([
                        animateMove(cursor, moveCfg.from, moveCfg.to, 800),
                        new Promise((resolve) =>
                            setTimeout(resolve, fadeDuration)
                        ),
                    ]);

                    result.style.display = "none";
                    cursorSpan.style.background = "";
                    loadingPath.style.strokeDashoffset = "";

                    await delay(3000);
                }
            }

            runSequence();

            let resizeTimeout;

            window.addEventListener("resize", () => {
                clearTimeout(resizeTimeout);

                resizeTimeout = setTimeout(() => {
                    const newMode = window.innerWidth <= mediaQuery ? "mobile" : "default";
                    if (newMode !== currentMode) {
                        location.reload();
                    }
                }, 200);
            });
        });
    }

    function activateGenerate() {
        const hero = document.querySelector(".hero");
        const parent = document.querySelector(".hero-content");
        const generateButton = parent?.querySelector(".hero-content__button-generate");
        const result = parent?.querySelector(".hero-content-result");

        if (!parent || !generateButton || !result) return;

        let isAnimating = false;

        function getMarginValues() {
            const width = window.innerWidth;
            let marginTop = 25;
            let marginBottom = 0;

            if (width < 767.98) {
                marginTop = 12;
            } else if (width < 1280.98) {
                marginTop = 27;
            }

            if (width >= 1280.98) {
                marginBottom = 51;
            }

            return { marginTop, marginBottom };
        }

        function getFullHeight() {
            const { marginTop, marginBottom } = getMarginValues();
            return result.scrollHeight + marginTop + marginBottom;
        }

        function openResult() {
            if (isAnimating) return;
            isAnimating = true;
            parent.classList.add("_active");

            const fullHeight = getFullHeight();

            result.style.visibility = "visible";
            result.style.transition = "max-height 0.4s ease, opacity 0.4s ease";
            result.style.maxHeight = fullHeight + "px";
            result.style.opacity = "1";
            hero.classList.add("_active");

            setTimeout(() => {
                result.style.maxHeight = fullHeight + "px";
                isAnimating = false;
            }, 400);
        }

        function closeResult() {
            if (isAnimating) return;
            isAnimating = true;

            result.style.transition = "max-height 0.4s ease, opacity 0.4s ease";
            result.style.maxHeight = "0px";
            result.style.opacity = "0";

            hero.classList.remove("_active");
            setTimeout(() => {
                result.style.visibility = "hidden";
                parent.classList.remove("_active");
                isAnimating = false;
            }, 400);
        }

        generateButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openResult();
        });

        parent.addEventListener("click", (e) => {
            const target = e.target;
            if (
                !(
                    target.classList.contains("hero-content__button-generate") ||
                    target.classList.contains("hero-content__textarea")
                )
            ) {
                closeResult();
            }
        });

        window.addEventListener("resize", () => {
            if (parent.classList.contains("_active")) {
                const newHeight = getFullHeight();
                result.style.maxHeight = newHeight + "px";
            }
        });
    }

    activateGenerate();
});


