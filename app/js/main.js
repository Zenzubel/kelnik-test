'use strict';
document.addEventListener('DOMContentLoaded', () => {

	function addFilter() {

		const contentWrapper = document.querySelector('.filter__inner');
		if (contentWrapper) {

			const sliderCount = document.getElementById('slider-count');
			const sliderMeasure = document.getElementById('slider-measure');
			const buttonMore = document.querySelector('.filter__load-more');
			const setDefault = document.getElementById('set-default');
			const roomBtn = document.querySelectorAll('.filter__room-btn');
			const listParent = document.getElementById('apartments-pool');

			let minPrice = 2500000;
			let maxPrice = 25000000;
			let minArea = 23;
			let maxArea = 180;
			let show = 4;

			// let defaultRoom = 2; //the number of rooms selected by default
			let defaultShowApartment = 4; //the number of apartments shown
			let clickShowApartment = 10;

			let roomsArr = [];//the main array from which the list of apartments is formed
			let activeRoomNum = [];

			let totalAllrooms = [];//all numbers of rooms (for count)
			let count = {};//a list of rooms and the number of apartments with these rooms
			// console.log(count);

			let btnLenght = []; //array of the number of room filtering buttons

			let apartmentsRooms = [];//the number of rooms available in the list

			function listFilter() {
				let myRequest = new Promise((resolve, reject) => {
					const req = new XMLHttpRequest();
					// req.open("GET", url);
					req.open("GET", "https://api.jsonbin.io/v3/b/6102707a046287097ea2cfc1", true);
					req.setRequestHeader("X-Master-Key", "$2b$10$QT4xyUip1KQv7a2gLxyqdeZmekxLVtbuh/Jgp/zTo13oqAnCHeaBa");
					req.onload = () => resolve(req.responseText);
					req.onerror = () => reject(req.statusText);

					req.onreadystatechange = () => {
						if (req.readyState == XMLHttpRequest.DONE) {
							const data = JSON.parse(req.response);
							let list = data.record;

							list.forEach((item, i)=> {
								roomsArr.push(item);
								totalAllrooms.push(item.room);//for "count" obj
							});

							showButton();
						}
					};
					req.send();
				});

				myRequest.then((successMessage) => {

					totalAllrooms.forEach(function(i) { count[i] = (count[i]||0) + 1;});//for count array

					roomsArr.forEach((apartment, i)=> {
						apartmentsRooms.push(apartment.room);
					});

					buttonDisabled();
				});
			}

			listFilter();

			console.log(roomsArr);

			function showList(apartRoom, show, minPrice, maxPrice, minArea, maxArea) {
				listParent.innerHTML = '';

				let howMuchIsAvailable = [];
				let howMuchIsOpened = [];

				roomsArr.forEach((item, i)=> {

					let price = +item.price.replace(/ /g, "");
					let area = item.area;

					if (item.room == apartRoom && price >= minPrice && price <= maxPrice && area >= minArea && area <= maxArea) {
						howMuchIsAvailable.push(item);
					}
				});
				function cutList() {
					listParent.innerHTML = '';
					howMuchIsAvailable.slice(0, show).forEach((item, i)=> {
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
						howMuchIsOpened.push(item);
					});
				}
				cutList();

				buttonMore.addEventListener('click', ()=> {
					show = howMuchIsOpened.length + 10;
					cutList();
					showHideButton();
				});


				function showHideButton() {
					if (howMuchIsOpened.length >= howMuchIsAvailable.length) {
						buttonMore.disabled = true;
					} else {
						buttonMore.disabled = false;
					}
				}

			}

			function buttonDisabled() {
				if (!apartmentsRooms.length == 0) {

					//start we calculate the rooms that are not in the main list
					roomBtn.forEach((button, i)=> {
						btnLenght.push(i + 1);
					});

					//deleting duplicate values
					const apartmentsRoomsFilter = [...new Set(apartmentsRooms)];

					//apartments that are not in the general list
					//if there are no apartments with certain rooms in the list, then the button / buttons dynamically become inactive
					let notActiveButton = btnLenght.filter(num => !apartmentsRoomsFilter.includes(num));

					//end we calculate the rooms that are not in the main list
					roomBtn.forEach(btn => {
						let room = +btn.getAttribute('data-room');
						notActiveButton.forEach(item => {
							if (room === item) {
								btn.disabled = true;
							} else {
								btn.disabled = false;
							}
						});
					});

					showActiveButtonNum();
				}
			}

			console.log();

			function showActiveButtonNum() {
				activeRoomNum.length = 0;
				roomBtn.forEach(item=> {
					if (item.classList.contains('active')) {
						activeRoomNum.push(item.getAttribute('data-room'));
					}
				});
			}
			


			function hideButtons() {
				roomBtn.forEach(item => {
					item.classList.remove('active');
				});
			}

			function showButton(i = 1) {
				roomBtn[i].classList.add('active');
				showList(i + 1, show, minPrice, maxPrice, minArea, maxArea);
			}

			hideButtons();
			showButton();

			contentWrapper.addEventListener('click', (event) => {
			const target = event.target;
			event.preventDefault();
			if (target && target.classList.contains('filter__room-btn')) {
				roomBtn.forEach((item, i) => {
					if (target == item) {
						hideButtons();
						showButton(i);
						buttonMore.disabled = false;
						showList(i + 1, show, minPrice, maxPrice, minArea, maxArea);
					}
				});
				
			}
			//resetting all indicators to their original values
			if (target && target.classList.contains('filter__reset-btn')) {
				roomBtn.forEach((item, i) => {
					hideButtons();
					showButton(i);

					// sliderMeasure.noUiSlider.set([23, 123]);
					// sliderCount.noUiSlider.set([2500000, 20000000]);
					// listFilter(defaultRoom, defaultShowApartment, minPrice, maxPrice, minArea, maxArea);
					// buttonMore.disabled = false;
				});
			}
			//follow the button "show more"/"Показать еще"
			// if (target && target.classList.contains('filter__load-more')) {
			// }

		});
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
