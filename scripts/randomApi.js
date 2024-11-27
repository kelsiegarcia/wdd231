const url = 'https://www.freepublicapis.com/api/apis?limit=10&sort=best';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  const apiList = document.getElementById('api-list');
  data.forEach((api) => {
    const apiItem = document.createElement('li');
    apiItem.innerHTML = `<a href="${api.Link}" target="_blank">${api.title}</a>`;
    apiList.appendChild(apiItem);
  });
}

apiFetch();
