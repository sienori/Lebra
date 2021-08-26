const { ipcRenderer } = require('electron');

const scrollToBottom = async () => {
  return new Promise((resolve) => {
    let prevBookCount = 0;
    const timer = setInterval(() => {
      const element = document.documentElement;
      const height = element.scrollHeight - element.clientHeight;
      window.scroll(0, height);
      const bookCount = document.querySelectorAll('#cover li').length;

      if (bookCount === prevBookCount) {
        clearInterval(timer);
        resolve();
      }
      prevBookCount = bookCount;
    }, 1000);
  });
};

const getBookList = async () => {
  await scrollToBottom();
  const books = document.querySelectorAll('#cover li');

  const bookList = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const book of books) {
    if (!book.querySelector('img')) break;
    const bookData = {
      asin: book.querySelector('img').id.split('cover-')[1],
      imgUrl: book.querySelector('img').src,
      title: book.querySelectorAll('p')[0].innerText,
      authors: book.querySelectorAll('p')[1].innerText,
    };
    bookList.push(bookData);
  }

  ipcRenderer.invoke('setBookList', bookList);
};

setTimeout(getBookList, 3000);
