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

	// const toolsAnim = document.querySelectorAll(".tools-anim");

	// if (toolsAnim?.length > 0) {
	// 	toolsAnim.forEach((tool) => {
	// 		const cursor = tool.querySelector(".tools-anim__cursor");
	// 		const svgPath = cursor.querySelector("path");
	// 		const textarea = tool.querySelector(".tools-anim__textarea");
	// 		const imgBlock = tool.querySelector(".tools-anim__img");
	// 		const loading = tool.querySelector(".tools-anim__loading");
	// 		const loadingPath = loading.querySelector("path");
	// 		const result = tool.querySelector(".tools-anim__result");
	// 		const cursorSpan = cursor.querySelector("span");

	// 		function animateMove(element, from, to, duration, fadeTargets = []) {
	// 			return new Promise((resolve) => {
	// 				const start = performance.now();

	// 				function step(now) {
	// 					const progress = Math.min((now - start) / duration, 1);
	// 					const ease =
	// 						progress < 0.5
	// 							? 2 * progress * progress
	// 							: 1 - Math.pow(-2 * progress + 2, 2) / 2;

	// 					element.style.top = from.top + (to.top - from.top) * ease + "px";
	// 					element.style.left = from.left + (to.left - from.left) * ease + "px";

	// 					if (fadeTargets.length) fadeTargets.forEach((t) => (t.style.opacity = 1 - ease));

	// 					if (progress < 1) requestAnimationFrame(step);
	// 					else resolve();
	// 				}

	// 				requestAnimationFrame(step);
	// 			});
	// 		}

	// 		function delay(ms) {
	// 			return new Promise((resolve) => setTimeout(resolve, ms));
	// 		}

	// 		async function runSequence() {
	// 			while (true) {
	// 				// 🔹 1. перемещение к textarea
	// 				await animateMove(cursor, { top: 151, left: 271 }, { top: 33, left: 116 }, 1000);
	// 				await delay(300);

	// 				// 🔹 2. перемещение к кнопке
	// 				await animateMove(cursor, { top: 33, left: 116 }, { top: 261, left: 621 }, 1000);

	// 				svgPath.style.transition = "fill 300ms ease-in-out";
	// 				svgPath.setAttribute("fill", "var(--Main-Blue-500)");
	// 				await delay(300);
	// 				svgPath.setAttribute("fill", "var(--Main-Blue-600)");
	// 				await delay(150);

	// 				// 🔹 3. fade textarea + img
	// 				await animateMove(cursor, { top: 261, left: 621 }, { top: 168, left: 488 }, 1000, [textarea, imgBlock]);
	// 				textarea.style.display = "none";
	// 				imgBlock.style.display = "none";

	// 				await delay(200);

	// 				// 🔹 4. загрузка
	// 				loading.style.opacity = "1";
	// 				loadingPath.style.transition = "stroke-dashoffset 2s linear";
	// 				loadingPath.style.strokeDashoffset = "0";
	// 				await delay(2000);

	// 				// 🔹 5. показываем результат
	// 				loading.style.opacity = "0";
	// 				cursorSpan.style.background = "var(--Main-Blue-400, #99CAFF)";
	// 				result.style.display = "flex";
	// 				result.style.opacity = "1";

	// 				// 🔹 6. финальное перемещение
	// 				if (tool.classList.contains("option-2")) {
	// 					await animateMove(cursor, { top: 168, left: 488 }, { top: 104, left: 586 }, 800);
	// 				} else if (tool.classList.contains("option-1")) {
	// 					await animateMove(cursor, { top: 168, left: 488 }, { top: 87, left: 588 }, 800);
	// 				} else if (tool.classList.contains("option-3")) {
	// 					await animateMove(cursor, { top: 168, left: 488 }, { top: 97, left: 593 }, 800);
	// 				}

	// 				await delay(150);

	// 				svgPath.setAttribute("fill", "var(--Main-Blue-500)");
	// 				await delay(300);
	// 				svgPath.setAttribute("fill", "var(--Main-Blue-600)");
	// 				await delay(2000);

	// 				// 🔹 7. возврат состояния и пауза перед новым циклом
	// 				result.style.display = "none";
	// 				result.style.opacity = "0";
	// 				textarea.style.display = "";
	// 				textarea.style.opacity = "1";
	// 				imgBlock.style.display = "";
	// 				imgBlock.style.opacity = "1";
	// 				cursorSpan.style.background = "";
	// 				loadingPath.style.strokeDashoffset = "";
	// 				await delay(2000);

	// 				if (tool.classList.contains("option-2")) {
	// 					await animateMove(cursor, { top: 104, left: 586 }, { top: 151, left: 271 }, 500);
	// 				} else if (tool.classList.contains("option-1")) {
	// 					await animateMove(cursor, { top: 87, left: 588 }, { top: 151, left: 271 }, 500);
	// 				} else if (tool.classList.contains("option-3")) {
	// 					await animateMove(cursor, { top: 97, left: 593 }, { top: 151, left: 271 }, 500);
	// 				}

	// 			}
	// 		}

	// 		runSequence();
	// 	});
	// }
	const toolsAnim = document.querySelectorAll(".tools-anim");

	if (toolsAnim?.length > 0) {
		toolsAnim.forEach((tool) => {
			const wrapper =  tool.querySelector(".tools-anim__wrapper");
			const cursor = tool.querySelector(".tools-anim__cursor");
			const svgPath = cursor.querySelector("path");
			const textarea = tool.querySelector(".tools-anim__textarea");
			const imgBlock = tool.querySelector(".tools-anim__img");
			const loading = tool.querySelector(".tools-anim__loading");
			const loadingPath = loading.querySelector("path");
			const result = tool.querySelector(".tools-anim__result");
			const cursorSpan = cursor.querySelector("span");

			function animateMove(element, from, to, duration, fadeTargets = []) {
				return new Promise((resolve) => {
					const start = performance.now();

					// размеры контейнера и курсора
					const rect = wrapper.getBoundingClientRect();
					const w = rect.width;
					const h = rect.height;
					const cursorH = element.offsetHeight;
					console.log(w, h)
					// пересчитываем пиксели в проценты ОДИН РАЗ
					

					const fromPercent = {
						bottom: ((from.bottom ) / h) * 100,
						right: (from.right / w) * 100,
					};
					
					const toPercent = {
						bottom: ((to.bottom) / h) * 100,
						right: (to.right / w) * 100,
					};

					function step(now) {
						const progress = Math.min((now - start) / duration, 1);
						const ease =
							progress < 0.5
								? 2 * progress * progress
								: 1 - Math.pow(-2 * progress + 2, 2) / 2;

						const bottom =
							(fromPercent.bottom +
								(toPercent.bottom - fromPercent.bottom) * ease);
						const right =
							(fromPercent.right +
								(toPercent.right - fromPercent.right) * ease);

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
				while (true) {
					// ✅ теперь координаты в пикселях, как ты мерял
					await animateMove(cursor, { bottom: 97, right: 349 }, { bottom: 215, right: 504 }, 1000);
					await delay(300);

					await animateMove(cursor, { bottom: 215, right: 504 }, { bottom: -13, right: 1 }, 1000);

					svgPath.style.transition = "fill 300ms ease-in-out";
					svgPath.setAttribute("fill", "var(--Main-Blue-500)");
					await delay(300);
					svgPath.setAttribute("fill", "var(--Main-Blue-600)");
					await delay(150);

					await animateMove(cursor, { bottom: -13, right: 1 }, { bottom: 80, right: 132 }, 1000, [textarea, imgBlock]);
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

					if (tool.classList.contains("option-2")) {
						await animateMove(cursor, { bottom: 80, right: 132 }, { bottom: 144, right: 34 }, 800);
					} else if (tool.classList.contains("option-1")) {
						await animateMove(cursor, { bottom: 80, right: 132 }, { bottom: 164, right: 32 }, 800);
					} else if (tool.classList.contains("option-3")) {
						await animateMove(cursor, { bottom: 80, right: 132 }, { bottom: 155, right: 28 }, 800);
					}

					await delay(150);

					svgPath.setAttribute("fill", "var(--Main-Blue-500)");
					await delay(300);
					svgPath.setAttribute("fill", "var(--Main-Blue-600)");
					await delay(2000);

					result.style.display = "none";
					result.style.opacity = "0";
					textarea.style.display = "";
					textarea.style.opacity = "1";
					imgBlock.style.display = "";
					imgBlock.style.opacity = "1";
					cursorSpan.style.background = "";
					loadingPath.style.strokeDashoffset = "";
					

					if (tool.classList.contains("option-2")) {
						await animateMove(cursor, { bottom: 144, right: 34 }, { bottom: 97, right: 349 }, 500);
					} else if (tool.classList.contains("option-1")) {
						await animateMove(cursor, { bottom: 164, right: 32 }, { bottom: 97, right: 349 }, 500);
					} else if (tool.classList.contains("option-3")) {
						await animateMove(cursor, { bottom: 155, right: 28 }, { bottom: 97, right: 349 }, 500);
					}
					await delay(2000);
				}
			}

			runSequence();
		});
	}

});


