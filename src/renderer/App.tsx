import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { BookStore } from '../main/sync/syncManager';

const Hello = () => {
  const [books, setBooks] = useState([]);

  const handleClickKindle = () => {
    window.electron.ipcRenderer.sync(BookStore.kindle);
  };

  const getBookList = async () => {
    const bookList = await window.electron.ipcRenderer.getBookList();
    console.log(bookList);
    setBooks(bookList);
  };

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <div className="main">
      <div className="Sidebar">
        <h1>Lebra</h1>
        <button type="button" onClick={handleClickKindle}>
          Kindle
        </button>
      </div>
      <div className="books">
        {books.map((book) => (
          <li className="book" key={book.asin}>
            <a
              href={`https://read.amazon.co.jp/?asin=${book.asin}&language=ja-JP`}
              // href={`kindle://book?action=open&asin=${book.asin}`}
            >
              <img src={book.imgUrl}></img>
            </a>
            <p>{book.title}</p>
            <p>{book.authors}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
