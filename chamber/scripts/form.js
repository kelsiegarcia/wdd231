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

const timestamp = new Date().toLocaleString();
const email = show('email');
const showInfo = document.querySelector('#results');
showInfo.innerHTML = `<p>Form for ${show('first')} ${show('last')}</p>
<p>Email: ${show('email')} at ${show('email')}</p>
<p>Phone: ${show('tel')} at ${show('email')}</p>
<p>Address: ${show('address')} at ${show('email')}</p>
<p>City: ${show('city')} at ${show('email')}</p>
<p>State: ${show('state')} at ${show('email')}</p>
<p>City: ${show('zip')} at ${show('email')}</p>
<p>How did you hear about us: ${show('description')}</p> 
<p>Favorite Genres: ${show('genr[]')}</p>
<p> Date and time processed: ${timestamp}</p>
`;
