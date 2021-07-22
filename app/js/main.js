'use strict';
document.addEventListener('DOMContentLoaded', () => {
	//start menu burger//////////
	const body = document.querySelector('body');
	const burgerIcon = document.querySelector('.menu-burger__icon');

	const burgerMenuList = document.querySelector('.menu-burger__container'),
		burgerMenuLink = burgerMenuList.querySelectorAll('.menu-burger__link');

	burgerIcon.addEventListener('click', (event) => {
		burgerIcon.classList.toggle('active');
		if (burgerIcon.classList.contains('active')) {
			body.classList.add('lock');
			burgerMenuList.classList.add('active');
		} else {
			body.classList.remove('lock');
			burgerMenuList.classList.remove('active');
		}
	});

	burgerMenuList.addEventListener('click', (event) =>{
		const target = event.target;
		if (target && target.classList.contains('menu-burger__link')){
			burgerIcon.classList.remove('active');
			burgerMenuList.classList.remove('active');
			body.classList.remove('lock');
		}
	});
	//end menu burger//////////

	//start scroll header
	const header = document.querySelector('.header__inner');

	window.addEventListener('scroll', function(e) {
	const position = window.scrollY;

		if (position > 0) {
			header.classList.add('active');
		}

		if (position <= 0) {
			header.classList.remove('active');
		}
	});
	//end scroll header
	//start smooth scroll
	document.querySelectorAll('a.scroll-to-js').forEach(link => {

		link.addEventListener('click', function(e) {
			e.preventDefault();

			let href = this.getAttribute('href').substring(1);

			const scrollTarget = document.getElementById(href);

			const topOffset = 0;

			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
	});
	//end smooth scroll

	//start dinamic inn social
	const social = document.querySelector('.header__social-media').innerHTML;
	const menuBurger = document.querySelector('.menu-burger__container');

	const socElem = document.createElement('div');
	socElem.classList.add('menu-burger__dinamic');
	socElem.innerHTML = social;

	menuBurger.append(socElem);
	//end dinamic inn social

	//start main screen tabs
	const tabBtn = document.querySelectorAll('.about__tab-title');
	const tabList = document.querySelectorAll('.about__tab-list');
	const tabParent = document.querySelector('.about__questions-wrapper');

	function hideTab() {
		tabBtn.forEach(item => {
			item.classList.remove('active');
		});
		tabList.forEach(item => {
			item.classList.remove('active');
		});
	}

	function showTabs (i = 1){
		tabList[i].classList.add('active');
	}

	hideTab();
	showTabs();

	tabParent.addEventListener('click', (event) => {
		const target = event.target;
		event.preventDefault();
		if (target && target.classList.contains('about__tab-title')) {
			tabBtn.forEach((item, i) => {
				if (target == item) {
					hideTab();
					showTabs(i);
				}
			});
		}
	});
	//end main screen tabs
	//start slider Swiper////////////////////
	let mySwipeRealIndex;
		let mySwiper = new Swiper('.feedback__container', {
			containerModifierClass: 'feedback__container', 
			wrapperClass: 'feedback__wrapper',
			slideClass: 'feedback__item',
			parallax: false,
			loop: false,
			slidesPerView: 'auto',
			spaceBetween: 30,
			freeMode: false,
			centeredSlides: true,
			simulateTouch: true,
			autoHeight: false,
			navigation: {
				nextEl: '.feedback__button-next',
				prevEl: '.feedback__button-prev',
			},
		});
	//end slider Swiper////////////////////

});
