const modal = document.querySelector('#modal');
const openModal = document.querySelector('#benefits');
const closeModal = document.querySelector('.close-button');

openModal.addEventListener('click', () => {
  modal.showModal();
});

closeModal.addEventListener('click', () => {
  modal.close();
});
