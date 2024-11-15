const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");
const allProphets = document.querySelector("#all");
const bornUtah = document.querySelector("#utah");
const bornOutsideUtah = document.querySelector("#nonus");
const ninetyfive = document.querySelector("#ninetyfive");
const children = document.querySelector("#childs");
const served = document.querySelector("#served");

const getProphets = async (filter = "all") => {
  let prophets = await jsonFetch(url);

  switch (filter) {
    case "bornUtah":
      prophets = prophets.filter((prophet) => prophet.birthplace === "Utah");
      break;
    case "bornOutsideUtah":
      prophets = prophets.filter((prophet) => prophet.birthplace != "Utah");
      break;
    case "served":
      prophets = prophets.filter((prophet) => prophet.length >= 15);
      break;
    case "children":
      prophets = prophets.filter((prophet) => prophet.numofchildren >= 10);
      break;
    case "ninetyfive":
      prophets = prophets.filter(
        (prophet) =>
          getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95
      );
      break;
    default:
      break;
  }
  displayProphets(prophets);
};

async function jsonFetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.prophets;
}

const displayProphets = (prophets) => {
  const cards = document.querySelector("div.cards");
  cards.innerHTML = "";

  prophets.forEach((prophet) => {
    let card = document.createElement("section");
    let h2 = document.createElement("h2");
    let details = document.createElement("div");
    details.classList.add("details");
    let date = document.createElement("p");
    let death = document.createElement("p");
    let ageatdeath = document.createElement("p");
    let length = document.createElement("p");
    let place = document.createElement("p");
    let num = document.createElement("p");
    let portrait = document.createElement("img");

    h2.textContent = `${prophet.name} ${prophet.lastname}`;
    date.innerHTML = `<span class="label">Birth:</span> ${prophet.birthdate}`;
    place.innerHTML = `<span class="label">Place:</span> ${prophet.birthplace}`;
    num.innerHTML = `<span class="label">Children:</span> ${prophet.numofchildren}`;
    length.innerHTML = `<span class="label">Prophet Years:</span> ${prophet.length}`;

    if (prophet.death === null) {
      death.innerHTML = "Current Prophet";
    } else {
      death.innerHTML = `<span class="label">Death:</span> ${prophet.death}`;
    }
    ageatdeath.innerHTML = `<span class="label">Age:</span> ${getAgeAtDeathInYears(
      prophet.birthdate,
      prophet.death
    )}`;

    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day Prophet`
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    details.appendChild(date);
    details.appendChild(place);
    details.appendChild(num);
    details.appendChild(length);
    details.appendChild(death);
    details.appendChild(ageatdeath);

    card.appendChild(h2);
    card.appendChild(details);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

getProphets();

// buttons
allProphets.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("all");
  allProphets.classList.add("active");
});

bornUtah.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("bornUtah");
  bornUtah.classList.add("active");
});

bornOutsideUtah.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("bornOutsideUtah");
  bornOutsideUtah.classList.add("active");
});

served.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("served");
  served.classList.add("active");
});

children.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("children");
  children.classList.add("active");
});

ninetyfive.addEventListener("click", () => {
  clearButtonClasses();
  getProphets("ninetyfive");
  ninetyfive.classList.add("active");
});

function getAgeAtDeathInYears(birthdate, deathdate) {
  let birth = new Date(birthdate);
  let death = new Date(deathdate);
  if (deathdate === null) {
    death = new Date();
  }
  return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}

function clearButtonClasses() {
  filterbuttons = document.querySelectorAll("button");
  filterbuttons.forEach((button) => (button.className = ""));
}

// async function getProphetData() {
//   const response = await fetch(url);
//   const data = await response.json();
//   displayProphets(data.prophets);
//   return data;
// }

// const displayProphets = (prophets) => {
//   prophets.forEach((prophet) => {
//     const card = document.createElement("section");
//     const fullName = document.createElement("h2");
//     const portrait = document.createElement("img");
//     const placeOfBirth = document.createElement("p");
//     const birthDate = document.createElement("p");

//     card.classList.add("card");
//     fullName.textContent = `${prophet.name} ${prophet.lastname}`;
//     placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
//     birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

//     portrait.setAttribute("src", prophet.imageurl);
//     portrait.setAttribute(
//       "alt",
//       `Portrait of ${prophet.name} ${prophet.lastname}`
//     );
//     portrait.setAttribute("loading", "lazy");
//     portrait.setAttribute("width", "340");
//     portrait.setAttribute("height", "440");

//     card.appendChild(fullName);
//     card.appendChild(birthDate);
//     card.appendChild(placeOfBirth);
//     card.appendChild(portrait);
//     cards.appendChild(card);
//   });
// };

// getProphetData();

// if (allProphets) {
//   allProphets.addEventListener("click", () => {
//     cards.innerHTML = "";
//     getProphetData();
//   });
// }

// if (bornUtah) {
//   bornUtah.addEventListener("click", () => {
//     cards.innerHTML = "";
//     getProphetData().then((data) => {
//       const prophets = data.prophets.filter(
//         (prophet) => prophet.birthplace === "Utah"
//       );
//       displayProphets(prophets);
//     });
//   });
// }
