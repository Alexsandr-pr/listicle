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

	// Первичная инициализация
	handleResize();

	window.addEventListener("resize", () => {
	
		handleResize();
	});
});
