export async function searchBooks() {
  const searchInput = document.getElementById('search-input');
  // const searchValue = searchInput.value;
  const searchValue = searchInput.value.trim();
  const results = document.getElementById('search-results');
  results.innerHTML = '';
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    searchValue
  )}&limit=15`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.docs.length > 0) {
      data.docs.forEach((book) => {
        const coverId = book.cover_i;
        const coverUrl = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : 'images/no-image.webp';

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${
          book.author_name ? book.author_name.join(', ') : 'Unknown'
        }`;

        const bookCover = document.createElement('img');
        bookCover.src = coverUrl;
        bookCover.alt = book.title;
        //height and width of the image
        bookCover.width = 200;
        bookCover.height = 250;

        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-cards');
        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookCover);

        results.appendChild(bookContainer);
      });
      document.querySelector('#footer-search').style.height = '150px';
    } else {
      console.log('No books found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  searchInput.value = '';
}
