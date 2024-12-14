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
        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
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

// Call the monthBook function with the title of the book
const bookMonth = document.getElementById('book-month');
const loadingIndicator = document.createElement('p');
loadingIndicator.textContent = 'Loading...';
loadingIndicator.style.width = '300px'; // Assuming the cover image size is 128px
loadingIndicator.style.height = '300px'; // Assuming the cover image size is 193px
loadingIndicator.style.display = 'flex';
loadingIndicator.style.alignItems = 'center';
loadingIndicator.style.justifyContent = 'center';
bookMonth.appendChild(loadingIndicator);

monthBook('Kingdom of Ash')
  .then((bookInfo) => {
    bookMonth.removeChild(loadingIndicator);
    if (bookInfo) {
      displayMonthBook(bookInfo);
    }
  })
  .catch((error) => {
    bookMonth.removeChild(loadingIndicator);
    console.error('Error:', error);
  });

function displayMonthBook(bookInfo) {
  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('p');
  const bookCover = document.createElement('img');

  bookTitle.textContent = `${bookInfo.title}`;
  bookAuthor.textContent = `Author: ${bookInfo.author}`;
  bookCover.src = `${bookInfo.coverUrl}`;
  bookCover.alt = `${bookInfo.title}`;
  bookMonth.appendChild(bookTitle);
  bookMonth.appendChild(bookAuthor);
  bookMonth.appendChild(bookCover);
}
