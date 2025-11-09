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