$(document).ready(function(){new Swiper(".promo-swiper",{loop:!0,autoplay:{delay:5e3,disableOnInteraction:!1},effect:"fade",fadeEffect:{crossFade:!0},pagination:{el:".promo-pagination",clickable:!0}});var e=new Swiper(".services-swiper",{noSwiping:!1,slidesPerView:"auto",spaceBetween:13,loop:!0,navigation:{nextEl:".services-button-next",prevEl:".services-button-prev"},breakpoints:{768:{noSwiping:!0}}});function n(){var n=0,o=$(".services-swiper").parent().parent().width(),i=$(".services-slide").width(),t=e.params.spaceBetween,a=o-i-t;for(let e=1;n<=a;e++)n=i*e+t*(e-1);return n}$(window).resize(function(){$(".services-swiper").parent().width(n())}),$(".services-swiper").parent().width(n());new Swiper(".gallery-swiper",{loop:!0,noSwiping:!1,navigation:{nextEl:".gallery-button-next",prevEl:".gallery-button-prev"},pagination:{el:".gallery-pagination",clickable:!0},breakpoints:{768:{noSwiping:!0}}});const o=$(".popup"),i=$(".popup-callback"),t=$(".popup-visit"),a=$(".popup-send"),s=$("[data-toggle=callback]"),l=$("[data-toggle=visit]"),r=$(".popup__close");function c(e){e.toggleClass("popup--visible")}function p(e){(function(e){return e.hasClass("popup--visible")})(e)&&c(e)}s.on("click",function(){c(i)}),l.on("click",function(){c(t)}),r.on("click",function(){p(i),p(t),p(a)}),$(document).keydown(function(e){var n=e.key||e.keyCode;"Escape"!==n&&"Esc"!==n&&27!==n||(p(i),p(t),p(a))}),$(".popup").click(function(e){$(e.target).hasClass("popup")&&$(e.target).removeClass("popup--visible")}),$("[type=tel]").mask("+7 (000) 000-00-00"),$.validator.messages.required="Заполните поле",$("form").each(function(){$(this).validate({errorElement:"div",errorClass:"invalid",errorPlacement:function(e,n){if("checkbox"===n.attr("type"))return n.next("label").append(e);e.insertAfter($(n))},rules:{userName:{required:!0},userPhone:{required:!0,minlength:18},policyCheckbox:{required:!0}},messages:{userPhone:{minlength:"Заполните поле"}},submitHandler:function(e){$.ajax({type:"POST",url:"send.php",data:$(e).serialize(),success:function(n){var i=$(e);return i[0].reset(),console.log(i),o.removeClass("popup--visible"),c(a),i.hasClass("visit-form")?(ym(61633705,"reachGoal","goal_visit"),!0):i.hasClass("callback-form")?(ym(61633705,"reachGoal","goal_callback"),!0):i.hasClass("card-form")?(ym(61633705,"reachGoal","goal_card"),!0):void 0}})}})}),$("nav").on("click","a",function(e){var n=$(this).attr("href");if("#"!==n&&!n.includes("html")){e.preventDefault();var o=$(n).offset().top;$("body,html").animate({scrollTop:o},1500)}}),$("body").append('<button class="scroll-up"></button>');const u=$(".scroll-up");function d(){var e=new ymaps.Map("map",{center:[55.709961,37.673855],zoom:17},{searchControlProvider:"yandex#search"}),n=new ymaps.Placemark(e.getCenter(),{hintContent:"Лето Мозаика",balloonContent:"Торговый центр Мозаика"});e.behaviors.disable("scrollZoom"),e.geoObjects.add(n)}$(document).scroll(function(){var e=$(window).height();$(this).scrollTop()>1.5*e?u.fadeIn():u.fadeOut()}),u.click(function(){$("html, body").animate({scrollTop:0},1500)});let f=!1;const v=$("#gallery").offset().top;$(window).scroll(function(){$(window).scrollTop()>v&&!f&&($("body").append('<script src="https://api-maps.yandex.ru/2.1/?apikey=0270f6eb-6b95-4e8d-814c-d0ac51ccb2f9&lang=ru_RU"><\/script>'),f=!0,function e(n){n>=60||("undefined"!=typeof ymaps?ymaps.ready(d):setTimeout(function(){e(n+1)},1e3))}(1))});const h=$("[data-toggle=club-choise]"),m=$(".drop-down");h.on("click",function(){$(this).is(".active")?($(this).removeClass("active"),m.slideUp(300)):($(this).addClass("active"),m.slideDown(300))});const g=$("[data-toggle=menu]"),w=$(".header-nav"),b=$(".header-nav__item");function y(){w.slideUp(300),b.unbind("click",y),w.delay(500).queue(function(){$(this).css("display",""),$(this).dequeue()})}g.on("click",function(){w.is(":hidden")?(w.slideDown(300),b.on("click",y)):y()})});