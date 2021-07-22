'use strict';
document.addEventListener('DOMContentLoaded', () => {

	const allCardParent = document.querySelectorAll('.services__card-body');

	allCardParent.forEach((item, i) => {

		const cardsItem = document.querySelectorAll('.services__item');
		const cardsLink = document.querySelectorAll('.services__link');

		item.addEventListener('mouseover', (event) => {
			const target = event.target;
			event.preventDefault();
			if (target && target.classList.contains('services__item') || target.classList.contains('services__link')) {
				item.classList.add('hover');
			}
		});

		item.addEventListener('mouseout', (event) => {
			const target = event.target;
			event.preventDefault();
			if (target && target.classList.contains('services__item') || target.classList.contains('services__link')) {
				item.classList.remove('hover');
			}
		});
	});

});
