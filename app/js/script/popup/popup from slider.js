	//start srtificate popup
	const parent = document.querySelector('.sertificate__wrap');
	const popupImage = document.querySelector('.popup__image');
	const popupBtn = document.querySelectorAll('.sertificate__picture-box');

	parent.addEventListener('click', (event) => {
		const target = event.target;
		event.preventDefault();
		if (target && target.classList.contains('sertificate__picture-box')) {
			popupBtn.forEach((item, i) => {
				if (target == item) {
					popupImage.src = item.firstElementChild.getAttribute('src');
					console.log(item.firstElementChild);
				}
			});
		}
	});
	//end srtificate popup