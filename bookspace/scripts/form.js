const currentUrl = window.location.href;
const everything = currentUrl.split('?');
let formData = everything[1] ? everything[1].split('&') : [];

function show(info) {
  let result = [];
  formData.forEach((element) => {
    if (element.startsWith(info)) {
      let value = decodeURIComponent(element.split('=')[1].replace(/\+/g, ' '));
      if (info === 'cell') {
        value = value.replace(/-/g, '');
      }
      result.push(value);
    }
  });

  return info === 'genre' ? result.join(', ') : result[0] || '';
}

const timestamp = new Date().toLocaleString();
const email = show('email') || 'Email not provided';

const showInfo = document.querySelector('#results');
if (showInfo) {
  showInfo.innerHTML = `<p>Form for ${show('first')} ${show('last')}</p>
  <p> Email: ${email}</p>
  <p> Cell: ${show('phone')}</p>
  <p> Address: ${show('address')}</p>
  <p> City: ${show('city')}</p>
  <p> State: ${show('state')}</p>
  <p> Zip: ${show('zip')}</p>
  <p> Favorite Genre: ${show('genre')}</p>
  <p> Date and time processed: ${timestamp}</p>`;
}

window.onload = () => {
  const currentUrl = window.location.href;

  if (currentUrl.includes('thankyou.html')) {
    const confettiContainer = document.querySelector('.confetti-container');

    function createConfetti() {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confettiContainer.appendChild(confetti);

      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = Math.random() * 100 + 'vh';
      confetti.style.width = Math.random() * 10 + 'px';
      confetti.style.height = Math.random() * 10 + 'px';
      confetti.style.backgroundColor = [
        'red',
        'blue',
        'green',
        'yellow',
        'purple',
      ][Math.floor(Math.random() * 5)];
    }

    function showConfetti() {
      for (let i = 0; i < 200; i++) {
        // Increased the number of confetti pieces
        createConfetti();
      }
    }

    showConfetti();
  }
};
