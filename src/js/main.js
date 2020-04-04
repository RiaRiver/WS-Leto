/* eslint-disable handle-callback-err */
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

    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev'
    },
    pagination: {
      el: '.gallery-pagination',
      clickable: true
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
})
