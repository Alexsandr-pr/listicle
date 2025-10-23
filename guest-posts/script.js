window.addEventListener("DOMContentLoaded", () => {

    function tabsInit() {
        const pricingWrapper = document.querySelector(".pricing__cards-wrapper");
        const pricingButtons = document.querySelectorAll("[data-pricing-button]");
        const pricingCards = document.querySelectorAll("[data-tab]");
        const pricingButtonActiveBadge = document.querySelector(".pricing__button-active-badge");

        const indexClass = {
            0: "left",
            1: "right"
        }

        const deleteActiveClass = () => {
            pricingButtons.forEach(button => {
                button.classList.remove("active");
            });

            if (pricingWrapper.classList.contains("left")) {
                pricingWrapper.classList.remove("left")
            } else {
                pricingWrapper.classList.remove("right")
            }
        };

        const addActiveClass = (index) => {
            pricingButtons[index].classList.add("active");
            pricingWrapper.classList.add(indexClass[index]);
        };

        pricingButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                deleteActiveClass();
                addActiveClass(index);

                pricingCards.forEach(card => {
                    card.classList.remove("active");
                });
                pricingButtonActiveBadge.classList.add(indexClass[index]);
                pricingButtonActiveBadge.classList.remove(indexClass[index === 0 ? 1 : 0]);
                pricingCards[index].classList.add("active");
            });
        });

    }

    tabsInit();

    function counterInit() {
        const counters = document.querySelectorAll("[data-counter]");

        const values = {
            monthly: 350,
            yearly: 300
        }

        for (const counter of counters) {
            const input = counter.querySelector(".pricing-card-counter__value");
            const counterPriceValue = counter.querySelector("[data-counter-price-value]");
            const counterButtonPlus = counter.querySelector("[data-counter-button-plus]");
            const counterButtonMinus = counter.querySelector("[data-counter-button-minus]");

            const pricingButton = counter.closest("[data-tab]");
            const pricingButtonValue = pricingButton.dataset.tab;

            const updatePrice = () => {
                const value = parseInt(input.value) || 0;
                counterPriceValue.textContent = `$${value * values[pricingButtonValue]}`;
            };

            counterButtonPlus.addEventListener("click", () => {
                input.value = parseInt(input.value) + 1;
                updatePrice();
            });

            counterButtonMinus.addEventListener("click", () => {
                input.value = Math.max(1, parseInt(input.value) - 1);
                updatePrice();
            });

            input.addEventListener("input", updatePrice);

            input.addEventListener("blur", () => {
                if (!input.value || parseInt(input.value) < 1) {
                    input.value = 1;
                    updatePrice();
                }
            });
        }
    }

    counterInit();

    function dragInit({
        selector,
        speed
    }) {
        const slider = document.querySelector(selector);

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * speed;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    dragInit({
        selector: '.pricing__cards-wrapper',
        speed: 10
    });


    function resize() {

        function setScrollbarWidth() {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
        }

        setScrollbarWidth();


        function setPricingCardWrapperHeight() {
            const cardsContent = document.querySelector(".pricing__cards-track");
            const cardsWrapper = document.querySelectorAll(".pricing__cards-container");

            cardsWrapper.forEach(content => {
                console.log( `${cardsContent.clientHeight}px`)
                content.style.height = `${cardsContent.clientHeight}px`;
            })
        }
        setPricingCardWrapperHeight();
    }

    resize()
    window.addEventListener('resize', resize);

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
});