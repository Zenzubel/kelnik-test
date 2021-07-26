'use strict';
document.addEventListener('DOMContentLoaded', () => {

	

	function addFilter() {

		const sliderCount = document.getElementById('slider-count');
		const sliderMeasure = document.getElementById('slider-measure');
		const buttonMore = document.querySelector('.filter__load-more');
		let roomsArrLength;

		let defaultRoom = 2; //the number of rooms selected by default
		let defaultShowApartment = 4; //the number of apartments shown
		let clickShowApartment = 10;

			if (sliderCount) {
			noUiSlider.create(sliderCount, {
				start: [2500000, 18900000],
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

		function response(rooms, area, floor, price) {
			let req = new XMLHttpRequest();
			req.open("GET", "https://api.jsonbin.io/v3/b/60fd73a199892a4ae9aa2e87/latest", true);
			req.setRequestHeader("X-Master-Key", "$2b$10$eErMsMskdKRoI.qlgQnsnu/Fa6HnHBNizx7t0KgVA3LLe74Inr2nu");
			req.send();

			req.onreadystatechange = () => {
				if (req.readyState == XMLHttpRequest.DONE) {

				const data = JSON.parse(req.response);
				// console.log(data.record);
				let list = data.record;
				
				const listParent = document.getElementById('apartments-pool');
					if (listParent) {

						console.log(list);

						function listFilter(apartRoom, show) {

							listParent.innerHTML = '';

							const roomsArr = [];

							list.forEach((item, i)=> {

								if (item.room == apartRoom) {
									roomsArr.push(item);
								}
							});

							roomsArrLength = roomsArr.length;

							// console.log(roomsArr.length);

							roomsArr.slice(0, show).forEach((item, i)=> {

								console.log();

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
						listFilter(defaultRoom, defaultShowApartment);

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
											listFilter(i + 1, defaultShowApartment);
										}
									});
									buttonMore.disabled = false;
								}
								//resetting all indicators to their original values
								if (target && target.classList.contains('filter__reset-btn')) {
									roomBtn.forEach((item, i) => {
										hideButtons();
										showButton(defaultRoom - 1);

										sliderMeasure.noUiSlider.set([33, 123]);
										sliderCount.noUiSlider.set([2500000, 18900000]);
										listFilter(defaultRoom, defaultShowApartment);
										buttonMore.disabled = false;
									});
								}
								//follow the button "show more"/"Показать еще"
								if (target && target.classList.contains('filter__load-more')) {

									let activeRoom = document.querySelectorAll('.filter__room-btn').forEach(item=> {
										if (item.classList.contains('active')) {
											//we get the number of the active button
											const roomNum = item.getAttribute('data-room');
											//we get the number of visible apartments in real time

											const realRoomCount = Array.from(document.getElementsByClassName('apartments__body'));
											//showing hidden elements to the visible list
											listFilter(roomNum, (realRoomCount.length - 1) + clickShowApartment);

											const newRealRoomCounts = Array.from(document.getElementsByClassName('apartments__body'));

											if (roomsArrLength <= newRealRoomCounts.length - 1) {
												target.disabled = true;
											}
										}
									});
									
								}
							});
						}
					}
				}
			};
		}
		response();
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
