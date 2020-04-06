/* eslint-disable handle-callback-err */
$(document).ready(function () {
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

  // Promo Slider
  var promoSwiper = new Swiper('.promo-swiper', {
    loop: true,
    autoplay: {
      delay: 5000
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.promo-pagination'
    }
  })

  // Services Slider
  var servicesSwiper = new Swiper('.services-swiper', {
    noSwiping: false,
    slidesPerView: 'auto',
    spaceBetween: 13,
    // slidesPerGroup: 1,
    loop: true,
    // loopedSlides: 5,

    navigation: {
      nextEl: '.services-button-next',
      prevEl: '.services-button-prev'
    },
    // Responsive breakpoints
    breakpoints: {
    // when window width is >= 768px
      768: {
        noSwiping: true
      }
    }
  })

  // Services Slider Resize
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

  // Gallery Slider
  var gallerySwiper = new Swiper('.gallery-swiper', {
    loop: true,
    noSwiping: false,
    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev'
    },
    pagination: {
      el: '.gallery-pagination',
      clickable: true
    },
    // Responsive breakpoints
    breakpoints: {
    // when window width is >= 768px
      768: {
        noSwiping: true
      }
    }
  })

  // Popup с формой
  const popup = $('.popup')
  const popupCallback = $('.popup-callback')
  const popupVisit = $('.popup-visit')
  const popupSend = $('.popup-send')
  const callbackBtn = $('[data-toggle=callback]')
  const visitBtn = $('[data-toggle=visit]')
  const closeBtn = $('.popup__close')

  function switchPopup (popup) {
    popup.toggleClass('popup--visible')
  }

  function isPopup (popup) {
    return popup.hasClass('popup--visible')
  }

  function closePopup (popup) {
    if (isPopup(popup)) switchPopup(popup)
  }

  callbackBtn.on('click', function () { switchPopup(popupCallback) })
  visitBtn.on('click', function () { switchPopup(popupVisit) })

  closeBtn.on('click', function () {
    closePopup(popupCallback)
    closePopup(popupVisit)
    closePopup(popupSend)
  })

  $(document).keydown(function (e) {
    var key = e.key || e.keyCode

    if ((key === 'Escape' || key === 'Esc' || key === 27)) {
      closePopup(popupCallback)
      closePopup(popupVisit)
      closePopup(popupSend)
    }
  })

  $('.popup').click(function (e) { if ($(e.target).hasClass('popup')) { $(e.target).removeClass('popup--visible') } })

  // Конец Popup с формой

  // Маски полей
  $('[type=tel]').mask('+7 (000) 000-00-00')

  // Валидация формы

  $('form').each(function () {
    $(this).validate({
      errorElement: 'div',
      errorClass: 'invalid',
      errorPlacement: function (error, element) {
        return true
      },
      rules: {
        userName: {
          required: true
        },
        userPhone: {
          required: true,
          minlength: 18
        },
        policyCheckbox: { required: true }
      },

      submitHandler: function (form) {
        $.ajax({
          type: 'POST',
          url: 'send.php',
          data: $(form).serialize(),
          success: function (response) {
            var currentForm = $(form)
            currentForm[0].reset()
            console.log(currentForm)
            popup.removeClass('popup--visible')
            switchPopup(popupSend)
            if (currentForm.hasClass('visit-form')) {
              ym(61633705, 'reachGoal', 'goal_visit'); return true
            }
            if (currentForm.hasClass('callback-form')) {
              ym(61633705, 'reachGoal', 'goal_callback'); return true
            }
            if (currentForm.hasClass('card-form')) {
              ym(61633705, 'reachGoal', 'goal_card'); return true
            }
          }
        })
      }
    })
  })

  // Плавная прокрутка
  $('nav').on('click', 'a', function (event) {
    var id = $(this).attr('href')

    if (id === '#') {
      return
    }

    event.preventDefault()
    var top = $(id).offset().top

    $('body,html').animate({ scrollTop: top }, 1500)
  })

  // Кнопка скролл вверх
  $('body').append('<button class="scroll-up"></button>')

  const scrollUp = $('.scroll-up')

  $(document).scroll(function () {
    var windowHeight = $(window).height()
    if ($(this).scrollTop() > (windowHeight * 1.5)) {
      scrollUp.fadeIn()
    } else {
      scrollUp.fadeOut()
    }
  })

  scrollUp.click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500)
  })

  // Карта
  function init () {
    var myMap = new ymaps.Map('map', {
      center: [55.709961, 37.673855],
      zoom: 17
    }, {
      searchControlProvider: 'yandex#search'
    })

    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Лето Мозаика',
      balloonContent: 'Торговый центр Мозаика'
    })
    myMap.behaviors.disable('scrollZoom')

    myMap.geoObjects
      .add(myPlacemark)
  }

  function initYaMap (cnt) {
    if (cnt >= 60) return
    if (typeof ymaps !== 'undefined') {
      ymaps.ready(init)
    } else {
      setTimeout(function () {
        initYaMap(cnt + 1)
      }, 1000)
    }
  }

  let yaMapInit = false
  const teamTop = $('#gallery').offset().top

  $(window).scroll(function () {
    if ($(window).scrollTop() > teamTop && (!yaMapInit)) {
      $('body').append('<script src="https://api-maps.yandex.ru/2.1/?apikey=0270f6eb-6b95-4e8d-814c-d0ac51ccb2f9&lang=ru_RU"></script>')
      yaMapInit = true
      initYaMap(1)
    }
  })

  // Выбор клуба

  const clubBtn = $('[data-toggle=club-choise]')
  const dropDown = $('.drop-down')

  clubBtn.on('click', function () {
    if (!$(this).is('.active')) {
      $(this).addClass('active')
      dropDown.slideDown(300)
    } else {
      $(this).removeClass('active')
      dropDown.slideUp(300)
    }
  })

  // Кнопка мобильного меню

  const menuBtn = $('[data-toggle=menu]')
  const mobMenu = $('.header-nav')
  const menuLink = $('.header-nav__item')
  function mobMenuClose () {
    mobMenu.slideUp(300)
    menuLink.unbind('click', mobMenuClose)
    mobMenu.delay(500).queue(function () { $(this).css('display', ''); $(this).dequeue() })
  }

  menuBtn.on('click', function () {
    if (mobMenu.is(':hidden')) {
      mobMenu.slideDown(300)
      menuLink.on('click', mobMenuClose)
    } else {
      mobMenuClose()
    }
  })
})
