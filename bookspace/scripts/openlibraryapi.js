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

// Call the monthBook function with the title of the book
monthBook('Kingdom of Ash')
  .then((bookInfo) => {
    if (bookInfo) {
      displayMonthBook(bookInfo);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function displayMonthBook(bookInfo) {
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
