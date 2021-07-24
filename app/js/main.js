'use strict';
document.addEventListener('DOMContentLoaded', () => {

	const sliderCount = document.getElementById('slider-count');
	const sliderMeasure = document.getElementById('slider-measure');

	if (sliderCount) {
		noUiSlider.create(sliderCount, {
			start: [5500000, 18900000],
			connect: true,
			step: 1000,
			range: {
				'min': [0],
				'max': [50000000]
			}
		});

		const input0 = document.getElementById('input-count-0');
		const input1 = document.getElementById('input-count-1');

		setValue(sliderCount, input0, input1);
	}

	if (sliderMeasure) {
		noUiSlider.create(sliderMeasure, {
			start: [33, 123],
			connect: true,
			step: 1,
			range: {
				'min': [0],
				'max': [250]
			}
		});

		const input0 = document.getElementById('input-measure-0');
		const input1 = document.getElementById('input-measure-1');

		setValue(sliderMeasure, input0, input1);
	}

	function setValue(slider, input0, input1) {
		const inputs = [input0, input1];

		slider.noUiSlider.on('update', function (values, handle) {
			inputs[handle].value = Math.round(values[handle]);
		});

		function setRangeSlider(i , value) {
			const arr = [null, null];
			arr[i] = value;

			slider.noUiSlider.set(arr);
		}

		inputs.forEach((el, index)=> {
			el.addEventListener('change', (e)=> {
				setRangeSlider(index, e.currentTarget.value);
			});
		});
	}

	const roomsButtonsParent = document.querySelector('.filter__filter');

	if (roomsButtonsParent) {

		let defaultRoom = 1; //how many rooms is the default apartment

		const setDefault = document.getElementById('set-default');

		const roomBtn = document.querySelectorAll('.filter__room-btn');

		function hideButtons() {
			roomBtn.forEach(item => {
				item.classList.remove('active');
			});
		}

		function showButton(i = 1) {
			roomBtn[i].classList.add('active');
		}

		hideButtons();
		showButton();

		roomsButtonsParent.addEventListener('click', (event) => {
			const target = event.target;
			event.preventDefault();
			if (target && target.classList.contains('filter__room-btn')) {
				roomBtn.forEach((item, i) => {
					if (target == item) {
						hideButtons();
						showButton(i);
					}
				});
			}
			//resetting all indicators to their original values
			if (target && target.classList.contains('filter__reset-btn')) {
				roomBtn.forEach((item, i) => {
					hideButtons();
					showButton(defaultRoom);

					sliderMeasure.noUiSlider.set([33, 123]);
					sliderCount.noUiSlider.set([5500000, 18900000]);
				});
			}
		});
		////////end tabs//////////////
	}
	//start scroll to top button
	const buttonScrollTop = document.querySelector('.scroll-up');

	if (buttonScrollTop) {
		window.addEventListener('scroll', function(e) {
		const position = window.scrollY;

			if (position > 0) {
				buttonScrollTop.classList.add('active');
				// headerLogo.classList.add('active');
				// headerPopup.classList.add('active');
			}

			if (position <= 0) {
				buttonScrollTop.classList.remove('active');
				// headerLogo.classList.remove('active');
				// headerPopup.classList.remove('active');
			}
		});

		buttonScrollTop.addEventListener('click', (event)=>{
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
	//end scroll to top button

});
