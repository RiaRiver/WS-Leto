$(document).ready(function () {
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

  // Promo Slider
  var promoSwiper = new Swiper('.promo-swiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.promo-pagination',
      clickable: true
    }
  })

  // Services Slider
  var servicesSwiper = new Swiper('.services-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 13,
    // slidesPerGroup: 1,
    loop: true,
    // loopedSlides: 5,

    navigation: {
      nextEl: '.services-button-next',
      prevEl: '.services-button-prev'
    }
  })

  $(window).resize(function () {
    $('.services-swiper').parent().width(swiperWidth())
  })

  $('.services-swiper').parent().width(swiperWidth())
  function swiperWidth () {
    var servicesSwiperWidth = 0
    var servicesSwiperWrapper = $('.services-swiper').parent().parent().width()
    var servicesSlideWidth = $('.services-slide').width()
    var spaceBetween = servicesSwiper.params.spaceBetween
    var maxSize = servicesSwiperWrapper - servicesSlideWidth - spaceBetween

    for (let index = 1; servicesSwiperWidth <= maxSize; index++) {
      servicesSwiperWidth = servicesSlideWidth * index + spaceBetween * (index - 1)
    }
    return servicesSwiperWidth
  }

  var gallerySwiper = new Swiper('.gallery-swiper', {
    loop: true,

    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev'
    },
    pagination: {
      el: '.gallery-pagination',
      clickable: true
    }
  })
})
