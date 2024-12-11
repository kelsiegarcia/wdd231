async function monthBook(title) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    title
  )}&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.docs.length > 0) {
      const book = data.docs[0];
      const coverId = book.cover_i;

      // Construct the cover image URL
      const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

      return {
        title: book.title,
        author: book.author_name,
        coverUrl: coverUrl,
      };
    } else {
      console.log('Book not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Example usage:
monthBook('Kingdom of Ash')
  .then((bookInfo) => {
    if (bookInfo) {
      displayBook(bookInfo);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
// append these items to the id book-month
function displayBook(bookInfo) {
  const bookMonth = document.getElementById('book-month');
  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('p');
  const bookCover = document.createElement('img');

  bookTitle.textContent = `${bookInfo.title}`;
  bookAuthor.textContent = `Author${bookInfo.author}`;
  bookCover.src = `${bookInfo.coverUrl}`;
  bookCover.alt = `${bookInfo.title}`;
  bookMonth.appendChild(bookTitle);
  bookMonth.appendChild(bookAuthor);
  bookMonth.appendChild(bookCover);
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  console.log('button is clicked');
  searchBooks();
});

async function searchBooks() {
  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value;
  const results = document.getElementById('search-results');
  results.innerHTML = '';
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    searchValue
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.docs.length > 0) {
      data.docs.forEach((book) => {
        const coverId = book.cover_i;
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${
          book.author_name ? book.author_name.join(', ') : 'Unknown'
        }`;

        const bookCover = document.createElement('img');
        bookCover.src = coverUrl;
        bookCover.alt = book.title;

        const bookContainer = document.createElement('div');
        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookCover);

        results.appendChild(bookContainer);
      });
    } else {
      console.log('No books found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// add a click event listener to the search button
// use the value added to search input to search for books
