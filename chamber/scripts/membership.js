const membershipLevels = [
  {
    name: 'Non-Profit',
    price: 100,
    description: 'This membership level is for non-profit organizations.',
    benefits: [
      'Access to all events',
      'Access to all resources',
      'Access to all networking opportunities',
    ],
  },
  {
    name: 'Bronze',
    price: 200,
    description: 'This membership level is for small businesses.',
    benefits: [
      'Access to all events',
      'Access to all resources',
      'Access to all networking opportunities',
      'Access to all workshops',
    ],
  },
  {
    name: 'Gold',
    price: 300,
    description: 'This membership level is for medium businesses.',
    benefits: [
      'Access to all events',
      'Access to all resources',
      'Access to all networking opportunities',
      'Access to all workshops',
      'Access to all seminars',
    ],
  },
  {
    name: 'Platinum',
    price: 400,
    description: 'This membership level is for large businesses.',
    benefits: [
      'Access to all events',
      'Access to all resources',
      'Access to all networking opportunities',
      'Access to all workshops',
      'Access to all seminars',
      'Access to all conferences',
    ],
  },
];

const membershipContainer = document.querySelector('#membership-container');
const membershipModal = document.querySelector('#membership-cards');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalPrice = document.querySelector('#modal-price');
const closeModalButton = document.querySelector('#close-modal');

function displayMembershipLevels() {
  membershipLevels.forEach((level) => {
    const memberCardDiv = document.createElement('div');
    memberCardDiv.classList.add('membership-card', 'grid-item');

    memberCardDiv.innerHTML = `
      <h3>Membership Level: ${level.name}</h3>
      <button class="btn">Learn More</button>
    `;

    memberCardDiv.addEventListener('click', () => {
      openModal(level);
    });

    membershipContainer.appendChild(memberCardDiv);
  });
}

function openModal(level) {
  modalTitle.textContent = level.name;
  modalDescription.textContent = level.description;
  modalPrice.textContent = `Price: $${level.price}`;
  membershipModal.showModal();
}

closeModalButton.addEventListener('click', () => {
  membershipModal.close();
});

displayMembershipLevels();
