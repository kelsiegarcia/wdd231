// fetch the members urls and randomize the object shown for the spotlight id display 3 objects and each has properties of the object

const spotlight = document.getElementById('spotlight');

async function fetchSpotlightData() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const members = await response.json();

    const randomMembers = [];
    const selectedIndices = new Set();

    while (randomMembers.length < 3) {
      const randomIndex = Math.floor(Math.random() * members.length);
      if (!selectedIndices.has(randomIndex)) {
        selectedIndices.add(randomIndex);
        randomMembers.push(members[randomIndex]);
      }
    }

    randomMembers.forEach((member) => {
      const memberDiv = document.createElement('div');
      memberDiv.classList.add('member-card', 'grid-item');
      memberDiv.innerHTML = `
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        <figure>
          <img src="images/${member.image}" alt="${member.name}" width="200" height="50">
        </figure>
      `;
      spotlight.appendChild(memberDiv);
    });
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

fetchSpotlightData();
