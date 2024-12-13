const currentUrl = window.location.href;
const everything = currentUrl.split('?');
let formData = everything[1].split('&');

function show(info) {
  let result = '';
  formData.forEach((element) => {
    if (element.startsWith(info)) {
      result = element.split('=')[1].replace('%40', '@').replace(/\+/g, ' ');

      if (info === 'description') {
        result = element.split('=')[1].split('+').join(' ');
      }
    }
  });
  return result;
}

function showConfetti() {
  confetti.start();
  setTimeout(() => confetti.stop(), 3000); // Stop confetti after 3 seconds
}

const timestamp = new Date().toLocaleString();
const email = show('email');
const showInfo = document.querySelector('#results');
showInfo.innerHTML = `<p>Form for ${show('first')} ${show('last')}</p>
<p>Title: ${show('title')} at ${show('organization')}</p>
<p>Business Description: ${show('description')}</p> 
<p>Membership Level: ${show('membership')}</p>
<p>Your email: <a href="${email}">${email}</a></p>
<p> Date and time processed: ${timestamp}</p>
`;

showConfetti();
