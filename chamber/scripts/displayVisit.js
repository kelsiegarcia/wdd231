function storeFirstVisit() {
  const currentDate = new Date().toISOString();
  localStorage.setItem('firstVisit', currentDate);
}

function getFirstVisitDate() {
  return localStorage.getItem('firstVisit');
}

function calculateTimeDifference(firstDate) {
  const firstVisit = new Date(firstDate);
  const currentDate = new Date();
  const timeDifference = currentDate - firstVisit;

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

function showModal(message) {
  document.getElementById('visitModalMessage').textContent = message;
  document.getElementById('visitModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('visitModal').style.display = 'none';
}

window.onload = function () {
  let firstVisitDate = localStorage.getItem('firstVisit');
  console.log('First Visit Date:', firstVisitDate);

  if (!firstVisitDate) {
    storeFirstVisit();
    firstVisitDate = new Date().toISOString();
    console.log('Storing first visit date:', firstVisitDate);
  }

  const daysDifference = calculateTimeDifference(firstVisitDate);
  console.log('Days difference:', daysDifference);

  if (daysDifference === 0) {
    showModal('This is your first visit! Welcome!');
  } else if (daysDifference === 1) {
    showModal('You last visited us 1 day ago. Welcome back!');
  } else {
    showModal(`You last visited us ${daysDifference} days ago. Welcome back!`);
  }

  const modal = document.getElementById('visitModal');
  const span = document.getElementsByClassName('close')[0];

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};
