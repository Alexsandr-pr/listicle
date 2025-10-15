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



    // // --- Case Studies slider
    // function initCaseStudies() {
    //     if (!window.Swiper) return;
    //     try {
    //         new Swiper('#work_slider', {
    //             slidesPerView: 1,
    //             direction: 'horizontal',
    //             allowTouchMove: true,
    //             simulateTouch: true,
    //             grabCursor: true,
    //             touchAngle: 20,
    //             speed: 450,
    //             mousewheel: {
    //                 forceToAxis: true,
    //                 releaseOnEdges: true,
    //                 thresholdDelta: 60,
    //                 thresholdTime: 200,
    //                 sensitivity: 0.5,
    //             },
    //             spaceBetween: 24,
    //             noSwiping: true,
    //             noSwipingClass: 'swiper-no-swiping',
    //             updateOnWindowResize: true,
    //             pagination: {
    //                 el: '.work_slider_pagination',
    //                 clickable: true,
    //                 enabled: true
    //             },
    //             breakpoints: {
    //                 601: { slidesPerView: 1.4},
    //                 901: { slidesPerView: 1.7},
    //                 1025: { slidesPerView: 2},
    //                 1201: { slidesPerView: 2.2},
    //                 1441: { slidesPerView: 1.6},
    //                 1501: { slidesPerView: 1.8},
    //                 1601: { slidesPerView: 2.1},
    //             },
    //         });
    //     } catch { }
    // }

})