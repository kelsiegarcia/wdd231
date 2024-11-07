const mainnav = document.querySelector('.navigation')
const closeButton = document.querySelector('#menu');

closeButton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	closeButton.classList.toggle('show');
});
