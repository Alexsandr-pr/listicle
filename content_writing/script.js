"use strict";

window.addEventListener("DOMContentLoaded", () => {

    function initButtonsWrapper(selector, parentSelector) {
        const buttons = document.querySelectorAll(selector);

        if (buttons.length > 0) {
            function init() {

                for (let index = 0; index < buttons.length; index++) {
                    const button = buttons[index];
                    const buttonWidth = button.offsetWidth;
                    const parentWrapper = button.closest(parentSelector);

                    parentWrapper.setAttribute("data-width", buttonWidth)
                    parentWrapper.style.width = `${buttonWidth}px`;
                }
            }

            init();
            window.addEventListener("resize", init);
        }
    }

    initButtonsWrapper("a", ".button-wrapper");
    initButtonsWrapper("button", ".button-wrapper");



    new Swiper('.our-work-slider__swiper', {
  
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
        breakpoints: {
            240: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            563: {
                slidesPerView: "auto",
                spaceBetween: 24,
            }
        },
        pagination: {
            el: '.our-work-pagination', 
            type: 'bullets', 
            clickable: true, 
        },
    })

    function positionSliderLabels(containerSelector, thumbWidth = 18) {
        document.querySelectorAll(containerSelector).forEach(container => {
            const labels = container.querySelectorAll('.pricing-left-item__slider-value');
            if (!labels.length) return;

            const steps = labels.length - 1; // автоматом: 9 для 10 меток, 10 для 11
            const containerWidth = container.offsetWidth;
            const halfThumb = thumbWidth / 2;

            labels.forEach((el, i) => {
                const leftPx = (i / steps) * (containerWidth - thumbWidth) + halfThumb;
                el.style.left = `${leftPx}px`;
            });
        });
    }

    // ✅ Вызов для обоих блоков
    positionSliderLabels('.pricing-left-item__slider-values');
    positionSliderLabels('.pricing-left-item__slider-values-big');

    window.addEventListener('resize', () => {
        positionSliderLabels('.pricing-left-item__slider-values');  
        positionSliderLabels('.pricing-left-item__slider-values-big');
    }   );
})