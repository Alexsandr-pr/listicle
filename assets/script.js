window.addEventListener("DOMContentLoaded", () => {

    function tabsInit() {
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
        };

        const addActiveClass = (index) => {
            pricingButtons[index].classList.add("active");
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
            monthly: 400,
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
});