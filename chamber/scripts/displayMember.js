const membersDiv = document.querySelector("#members");

async function fetchMemberData() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  // console.log(members);
  members.forEach((member) => {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member-card");
    memberDiv.innerHTML = `
			<h3>${member.name}</h3>
			<p>${member.address}</p>
			<p>${member.phone}</p>
			<a href="${member.website}" target="_blank">${member.website}</a>
			<figure>
			<img src="images/${member.image}" alt="${member.name} Logo">
			</figure>
		`;
    membersDiv.appendChild(memberDiv);
  });
}

fetchMemberData();
