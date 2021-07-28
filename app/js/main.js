'use strict';
document.addEventListener('DOMContentLoaded', () => {

	function addFilter() {

		const sliderCount = document.getElementById('slider-count');
		const sliderMeasure = document.getElementById('slider-measure');
		const buttonMore = document.querySelector('.filter__load-more');

		let minPrice = 2500000;
		let maxPrice = 25000000;
		let minArea = 23;
		let maxArea = 180;

		let defaultRoom = 2; //the number of rooms selected by default
		let defaultShowApartment = 4; //the number of apartments shown
		let clickShowApartment = 10;

		if (sliderCount && sliderMeasure) {

			noUiSlider.create(sliderCount, {
				start: [2500000, 20000000],
				connect: true,
				step: 1000,
				range: {
					'min': [0],
					'max': [50000000]
				}
			});

			noUiSlider.create(sliderMeasure, {
				start: [23, 123],
				connect: true,
				step: 1,
				range: {
					'min': [0],
					'max': [250]
				}
			});

			const inputCount0 = document.getElementById('input-count-0');
			const inputCount1 = document.getElementById('input-count-1');

			const inputMeasure0 = document.getElementById('input-measure-0');
			const inputMeasure1 = document.getElementById('input-measure-1');

			setValue(sliderCount, sliderMeasure, inputCount0, inputCount1, inputMeasure0, inputMeasure1);
		}

		function setValue(sliderCount, sliderMeasure, inputCount0, inputCount1, inputMeasure0, inputMeasure1) {

			let req = new XMLHttpRequest();
			req.open("GET", "https://api.jsonbin.io/v3/b/61012bda99892a4ae9abb90a", true);
			req.setRequestHeader("X-Master-Key", "$2b$10$QT4xyUip1KQv7a2gLxyqdeZmekxLVtbuh/Jgp/zTo13oqAnCHeaBa");
			req.send();

			req.onreadystatechange = () => {
				if (req.readyState == XMLHttpRequest.DONE) {

				const data = JSON.parse(req.response);
				let list = data.record;

				const listParent = document.getElementById('apartments-pool');
					if (listParent) {

						function listFilter(apartRoom, show, minPrice, maxPrice, minArea, maxArea) {

							listParent.innerHTML = '';

							const roomsArr = [];//the main array from which the list of apartments is formed

							list.forEach((item, i)=> {

								let price = +item.price.replace(/ /g, "");
								let area = item.area;

								if (item.room == apartRoom && price >= minPrice && price <= maxPrice && area >= minArea && area <= maxArea) {
									roomsArr.push(item);
								}
							});

							roomsArr.slice(0, show).forEach((item, i)=> {
								listParent.innerHTML += `
									<a href="#" class="apartments__body">
										<div class="apartments__design column-1">
											<img class="apartments__image" src='images/flat_plan_gor.jpg' alt="Планировка трехкомнатной квартиры">
										</div>
										<div class="apartments__box">
											<div class="apartments__flat column-2">
												<span class="apartments__flat-ordinal-num">${item.apartmentId}</span>
											</div>
											<span class="apartments__space column-count">
												<span class="apartments__space-num">${item.area}</span>
												<span class="apartments__space-metrica calculus">м</span>
											</span>
											<span class="apartments__floor column-count">
												<span class="apartments__floor-lavel">${item.floor}</span>
												<span class="apartments__floor-text">из</span>
												<span class="apartments__floor-total">${item.height}</span>
												<span class="apartments__floor-metrica">этаж</span>
											</span>
											<span class="apartments__price column-count">
												<span class="apartments__price-count">${item.price} <span class="apartments__price-currency">₽</span></span>
											</span>
										</div>
									</a>
								`;
							});

						}
						listFilter(defaultRoom, defaultShowApartment, minPrice, maxPrice, minArea, maxArea);

						const roomsButtonsParent = document.querySelector('.filter__inner');
						if (roomsButtonsParent) {

							const setDefault = document.getElementById('set-default');

							const roomBtn = document.querySelectorAll('.filter__room-btn');

							const btnLenght = []; //array of the number of room filtering buttons

							const apartmentsRooms = [];//the number of rooms available in the list

							roomBtn.forEach((button, i)=> {
								btnLenght.push(i + 1);
							});

							list.forEach((apartment, i)=> {
								apartmentsRooms.push(apartment.room);
							});

							const apartmentsRoomsFilter = [...new Set(apartmentsRooms)];//deleting duplicate values

							let notActiveButton = btnLenght.filter(num => !apartmentsRoomsFilter.includes(num));

							function buttonDisable() {
								roomBtn.forEach(btn => {

									let room = +btn.getAttribute('data-room');

									console.log();
									notActiveButton.forEach(item => {

										if (room == item) {
											btn.disabled = true;
										}
									});
								});
							}
							buttonDisable();////if there are no apartments with certain rooms in the list, then the button / buttons dynamically become inactive

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
											listFilter(i + 1, defaultShowApartment, minPrice, maxPrice, minArea, maxArea);
										}
									});
									buttonMore.disabled = false;
								}
								//resetting all indicators to their original values
								if (target && target.classList.contains('filter__reset-btn')) {
									roomBtn.forEach((item, i) => {
										hideButtons();
										showButton(defaultRoom - 1);

										sliderMeasure.noUiSlider.set([23, 123]);
										sliderCount.noUiSlider.set([2500000, 20000000]);
										listFilter(defaultRoom, defaultShowApartment, minPrice, maxPrice, minArea, maxArea);
										buttonMore.disabled = false;
									});
								}
								//follow the button "show more"/"Показать еще"
								if (target && target.classList.contains('filter__load-more')) {

									let activeRoom = document.querySelectorAll('.filter__room-btn').forEach(item=> {
										if (item.classList.contains('active')) {
											//we get the number of the active button
											const roomNum = item.getAttribute('data-room');

											listFilter(roomNum, 10, minPrice, maxPrice, minArea, maxArea);
										}
									});
								}
							});
						}

						//start renge slider
						const inputsCount = [inputCount0, inputCount1];
						const inputsMeasure = [inputMeasure0, inputMeasure1];

						let activeRoomNum = [];

						const totalAllrooms = [];//all numbers of rooms

						list.forEach((item, i)=> {

							totalAllrooms.push(item.room);
						});

						let count = {};
						totalAllrooms.forEach(function(i) { count[i] = (count[i]||0) + 1;});//a list of rooms and the number of apartments with these rooms

						function showActiveButton() {
							activeRoomNum.length = 0;
							let activeRoom = document.querySelectorAll('.filter__room-btn').forEach(item=> {
								if (item.classList.contains('active')) {
									activeRoomNum.push(item.getAttribute('data-room'));
								}
							});
						}

						sliderMeasure.noUiSlider.on('update', function (values, handle) {
							inputsMeasure[handle].value = Math.ceil(values[handle]);

							minArea = inputsMeasure[0].value;
							maxArea = inputsMeasure[1].value;

							showActiveButton();

							listFilter(+activeRoomNum[0], defaultShowApartment, minPrice, maxPrice, minArea, maxArea);
						});

						sliderCount.noUiSlider.on('update', function (values, handle) {
							inputsCount[handle].value = Math.ceil(values[handle]);

							minPrice = inputsCount[0].value;
							maxPrice = inputsCount[1].value;

							showActiveButton();

							listFilter(+activeRoomNum[0], defaultShowApartment, minPrice, maxPrice, minArea, maxArea);

						});

						function setMeasureRangeSlider(i , value) {
							const arr = [null, null];

							arr[i] = value;

							sliderMeasure.noUiSlider.set(arr);
						}

						function setCountRangeSlider(i , value) {
							const arr = [null, null];

							arr[i] = value;

							sliderCount.noUiSlider.set(arr);
						}

						inputsMeasure.forEach((el, index)=> {
							el.addEventListener('change', (e)=> {
								setMeasureRangeSlider(index, e.currentTarget.value);
							});
						});

						inputsCount.forEach((el, index)=> {
							el.addEventListener('change', (e)=> {
								setCountRangeSlider(index, e.currentTarget.value);
							});
						});
						//end renge slider
					}
				}
			};
		}
	}
	addFilter();

	//start scroll to top button
	const buttonScrollTop = document.querySelector('.scroll-up');

	if (buttonScrollTop) {
		window.addEventListener('scroll', function(e) {
		const position = window.scrollY;

			if (position > 0) {
				buttonScrollTop.classList.add('active');
			}

			if (position <= 0) {
				buttonScrollTop.classList.remove('active');
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
