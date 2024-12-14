import { searchBooks } from './searchBooks.mjs';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('search-results');

searchButton.addEventListener('click', searchBooks);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchBooks();
  }
});
