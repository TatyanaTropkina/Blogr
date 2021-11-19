$(function(){

let drdMenu = $('.menu__dropdown');
let drdTitle =  $('.menu__dropdown-title');
let menuList =  $('.header-menu__list');
let drdLink = $('.menu__dropdown-link');
let menuBtn = $('.header-menu__btn');

	$(document).mouseup(function (e) {
		if (!drdMenu.is(e.target) && drdMenu.has(e.target).length === 0
		) {
			drdMenu.addClass('show').children(drdTitle).removeClass('open').siblings('.menu__dropdown-list').hide('medium');
		}
	});
	$(window).scroll(function () {
		let scrollTop = $(window).scrollTop();
		if (scrollTop > 500) {

			drdMenu.addClass('show').children(drdTitle).removeClass('open').siblings('.menu__dropdown-list').hide('medium');
        }
    });
	$(menuBtn).on('click', function () {
		drdMenu.addClass('show').children(drdTitle).removeClass('open').siblings('.menu__dropdown-list').hide('medium');
		$(this).toggleClass('open');
		menuList.toggleClass('open');

	});
	$(drdLink).on('click', function(){
		menuBtn.removeClass('open');
		menuList.removeClass('open')
	});


$(".closed").toggleClass("show").children(drdTitle).removeClass('open');
	if ("ontouchstart" in window || navigator.msMaxTouchPoints) {

		isTouch = true;
		$(drdTitle).click(function(){
			if ($(this).parent(drdMenu).hasClass("show")) {
				$(drdMenu).addClass("show").children('.menu__dropdown-list').hide("medium");
				$(drdMenu).children(drdTitle).removeClass('open');
				$(this).parent().toggleClass("show").children(".menu__dropdown-list").slideToggle("medium");
				$(this).addClass('open');
				} else {
				$(this).parent().toggleClass("show").children(".menu__dropdown-list").slideToggle("medium");
				$(this).removeClass('open');
				}
			});
	
	} else {
		isTouch = false;
		if($(window).width() > 769) {
			$(drdMenu).hover(function(){
				$(this).children(".menu__dropdown-list").slideToggle('medium').siblings(drdTitle).toggleClass('open');	
				});
		} else {
			$(drdTitle).click(function(){
				if ($(this).parent(drdMenu).hasClass("show")) {
					$(drdMenu).addClass("show").children('.menu__dropdown-list').hide("medium");
					$(drdMenu).children(drdTitle).removeClass('open');
					$(this).parent().toggleClass("show").children(".menu__dropdown-list").slideToggle("medium");
					$(this).addClass('open');
					} else {
					$(this).parent().toggleClass("show").children(".menu__dropdown-list").slideToggle("medium");
					$(this).removeClass('open');
					}
				});
		}
		

		
	};
	
})

$(function(){
	$(window).ready(function () {
		if ($(window).width() < 769) {
		$('.header__actions').appendTo('.header-menu__list');
		let heightMenu = $(window).height();
		$(":root").css("--height-menu", heightMenu + 'px');
	
		} else {
			let body = $('body');
			body.addClass('anim');
			if(body.hasClass('anim')) {
				$('.header, .header__title, .header__suptitle, .header__links').addClass('anim');
				
			}	
		}
	});

})