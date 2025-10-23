"use strict";

window.addEventListener("DOMContentLoaded", () => {

    function isIOS() {
        const IS_IOS =
            /iP(hone|od|ad)/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);


        const main = document.querySelector("main");

        if (IS_IOS) {
            main.classList.add("is-ios");
        }
    }

    isIOS()

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

    function initSliders() {
        const swiperConfig = {
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
            }
        }

        const reviewsSwiper = document.querySelector(".reviews__swiper");
        if(reviewsSwiper) {
            new Swiper('.reviews__swiper', {
                ...swiperConfig,
                pagination: {
                    el: '.reviews-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: ".reviews__buttons-right",
                    prevEl: ".reviews__buttons-left"
                }
            })
        }
    }

    initSliders();
})