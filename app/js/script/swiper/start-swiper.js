////////////////////start slider Swiper////////////////////

	let loss__thumbs = new Swiper('.loss__thumbs', {
		containerModifierClass: 'loss__cont', 
		wrapperClass: 'loss__wrap',
		slideClass: 'loss__item',
		loop: false,
		slidesPerView: 4,
		spaceBetween: 15,
		freeMode: false,
		centeredSlides: false,
		simulateTouch: true,
	});

new Swiper ('.loss__container', {
	containerModifierClass: 'loss__container', 
	wrapperClass: 'loss__wrapper',
	slideClass: 'loss__item',
	// direction: 'vertical',
	loop: false,
	watchOverflow: false,
	observeParents: false,
	observeSlideChildren: false,
	observer: false,
	spaceBetween: 12,
	autoHeight: false,
	slidesPerView: 1,
	centerSlides: false,
	simulateTouch: true,
	navigation: {
		nextEl: '.loss__button-next',
		prevEl: '.loss__button-prev',
	},
	breakpoints: {
		660: {
			slidesPerView: 2,
		},
		900: {
			slidesPerView: 3,
		},
	},
	autoplay: {
		delay: 2500,
	},
	pagination: {
		el: '.about__slider-paginations',
		clickable: true,
		type: 'fraction',
		renderFraction: function (currentClass, totalClass, index, total) {
			return '<span class="' + currentClass + '">0 '+ index +' </span>' +
			'  ' + '<span class="' + totalClass + '">0 '+ total +' </span>';
		},
	},
	thumbs: {
		swiper: loss__thumbs
	},
	zoom: {
		maxRatio: 2,
		minRatio: 1,
	}
});

	//start custom-auto-height
	const getContainerHeight = document.querySelector('.feedback__cont'),
		getSlideActive = getContainerHeight.querySelector('.swiper-slide-active'),
		getContentHeight = getContainerHeight.querySelectorAll('.feedback__inn');

	getContainerHeight.style.cssText = `height: ${getSlideActive.firstElementChild.offsetHeight}px;`;

	function autoHeight(item, i) {
		let height = item[i].offsetHeight + 'px';
		getContainerHeight.style.cssText = `height: ${height};`;
	}
	// autoHeight(getContentHeight, 0);

	myFeedback.on('slideChange', function () {
		let realIndex = myFeedback.activeIndex;
		autoHeight(getContentHeight, realIndex);
	});

	//start custom-auto-height
////////////////////end slider Swiper////////////////////