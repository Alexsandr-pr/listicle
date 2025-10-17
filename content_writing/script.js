"use strict";

window.addEventListener("DOMContentLoaded", () => {

    function isIOS() {
        const IS_IOS =
        /iP(hone|od|ad)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);


        const main = document.querySelector("main");

        if(IS_IOS) {
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

        new Swiper('.our-work-slider__swiper', {
            ...swiperConfig,
            pagination: {
                el: '.our-work-pagination',
                type: 'bullets',
                clickable: true,
            },
        })
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

    initSliders();

    function initRangeSlider() {
        function positionSliderLabels(containerSelector, thumbWidth = 18) {
            document.querySelectorAll(containerSelector).forEach(container => {
                const labels = container.querySelectorAll('.pricing-left-item__slider-value');
                if (!labels.length) return;

                const steps = labels.length - 1;
                const containerWidth = container.offsetWidth;
                const halfThumb = thumbWidth / 2;

                labels.forEach((el, i) => {
                    const leftPx = (i / steps) * (containerWidth - thumbWidth) + halfThumb;
                    el.style.left = `${leftPx}px`;
                });
            });
        }

        function initSliderLabelsPosition() {
            positionSliderLabels('.pricing-left-item__slider-values');
            positionSliderLabels('.pricing-left-item__slider-values-big');
        }
        initSliderLabelsPosition();

        window.addEventListener('resize', initSliderLabelsPosition);

        function initSliderThumbPosition(containerSelector, thumbWidth = 18) {
            document.querySelectorAll(containerSelector).forEach(container => {
                const slider = container.querySelector('input[type="range"]');
                const current = container.querySelector('.pricing-left-item__slider-current');
                if (!slider || !current) return;

                const currentText = current.querySelector('.pricing-left-item__slider-current-text');

                const update = () => {
                    const sliderRect = slider.getBoundingClientRect();
                    const min = parseFloat(slider.min) || 0;
                    const max = parseFloat(slider.max) || 100;
                    const value = parseFloat(slider.value);
                    const percent = (value - min) / (max - min);

                    const leftPx = percent * (sliderRect.width - thumbWidth) + thumbWidth / 2;
                    current.style.left = `${leftPx}px`;

                    if (currentText) currentText.textContent = value;
                };

                slider.addEventListener('input', update);
                window.addEventListener('resize', update);
                update();
            });
        }

        initSliderThumbPosition('.pricing-left-item__slider');


        const sliderValueMaps = {
            articles: {
                0: '0',
                1: "2",
                2: '4',
                3: "5",
                4: '6',
                5: '7',
                6: '8',
                7: '9',
                8: "10",
                9: '11',
                10: '12',
                11: '13',
                12: '14',
                13: '15',
                14: '16',
                15: '17',
                16: '18',
                17: "19",
                18: '20'
            },
            words: {
                0: '500',
                1: '1000',
                2: '2000',
                3: '3000',
                4: '4000',
                5: '5000',
                6: '6000',
                7: '7000',
                8: '8000',
                9: '9000',
                10: '10000',
            }
        };

        function updateSliderCurrentText(mapConfig) {
            document.querySelectorAll('.pricing-left-item__slider').forEach(container => {
                const slider = container.querySelector('input[type="range"]');
                const currentText = container.querySelector('.pricing-left-item__slider-current-text');
                if (!slider || !currentText) return;


                const parent = slider.closest('.pricing-left-item');
                if (!parent) return;

                const label = parent.querySelector('.label');

                const sliderId = slider.id;
                const value = slider.value;

                const textMap = mapConfig[sliderId];
                if (textMap && textMap.hasOwnProperty(value)) {
                    currentText.textContent = textMap[value];
                    if (label) {
                        label.textContent = sliderId === 'articles' ? `${textMap[value]} article(s)` : `${textMap[value]} words`;
                    }

                    if (sliderId === 'words') {
                        const pricePerArticle = document.querySelector(".pricing-left__bottom-text");

                        if (pricePerArticle) {
                            pricePerArticle.textContent = `$${textMap[value] / 4}`;
                        }
                    }
                } else {
                    currentText.textContent = value;
                    if (label) {
                        label.textContent = '';
                    }
                }
            });
        }

        document.querySelectorAll('.pricing-left-item__slider input[type="range"]').forEach(slider => {
            slider.addEventListener('input', () => updateSliderCurrentText(sliderValueMaps));
        });

        updateSliderCurrentText(sliderValueMaps);
    }

    initRangeSlider();

})