const membersDiv = document.querySelector('#members');
const grid = document.querySelector('#gridButton');
const list = document.querySelector('#listButton');

async function fetchMemberData() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const members = await response.json();

    members.forEach((member) => {
      const memberDiv = document.createElement('div');
      memberDiv.classList.add('member-card');
      memberDiv.innerHTML = `
				<h3>${member.name}</h3>
				<p>${member.address}</p>
				<p>${member.phone}</p>
				<p>${member.membershipLevel}</p>
				<a href="${member.website}" target="_blank">${member.website}</a>
				<figure>
				<img src="images/${member.image}" alt="${member.name}"width="200" height="auto">
				</figure>
			`;
      membersDiv.appendChild(memberDiv);
    });

    membersDiv.classList.add('grid');
    membersDiv.classList.remove('list');
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function setActiveButton(button) {
  gridButton.classList.remove('active');
  listButton.classList.remove('active');
  button.classList.add('active');
}

if (gridButton) {
  grid.addEventListener('click', () => {
    membersDiv.classList.add('grid');
    membersDiv.classList.remove('list');
    setActiveButton(gridButton);
  });
}
if (listButton) {
  list.addEventListener('click', () => {
    membersDiv.classList.add('list');
    membersDiv.classList.remove('grid');
    setActiveButton(listButton);
  });
}

fetchMemberData();
