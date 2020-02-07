import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf.component';
import Search from './Search.component';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.reloadbooks();
  }

  reloadbooks = () => {
    BooksAPI.getAll().then(
      data => {
        this.setState({
          books: data
        });
      }
    );
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(
      data => this.reloadbooks()
    );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Current Reading" 
                            books={this.state.books.filter((book) => (book.shelf === 'currentlyReading'))} 
                            moveToShelf={this.moveToShelf} />
                <Bookshelf title="Want to Read" 
                            books={this.state.books.filter((book) => (book.shelf === 'wantToRead'))} 
                            moveToShelf={this.moveToShelf} />
                <Bookshelf title="Read" 
                            books={this.state.books.filter((book) => (book.shelf === 'read'))} 
                            moveToShelf={this.moveToShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;
