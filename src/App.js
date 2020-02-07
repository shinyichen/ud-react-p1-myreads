import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf.component';
import Search from './Search.component';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: [], // book id's
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    this.reloadbooks();
  }

  reloadbooks = () => {
    BooksAPI.getAll().then(
      books => {
        this.setState({
          books: books,
          shelves: {
            currentlyReading: books.filter(book => (book.shelf === "currentlyReading")).map(book => (book.id)),
            wantToRead: books.filter(book => (book.shelf === "wantToRead")).map(book => (book.id)),
            read: books.filter(book => (book.shelf === "read")).map(book => (book.id))
          }
        });
      }
    );
  }

  moveToShelf = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(
      data => {
        this.reloadbooks();
      }
    );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search moveToShelf={this.moveToShelf} shelves={this.state.shelves}/>
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
                            moveToShelf={this.moveToShelf} 
                            shelves={this.state.shelves} />
                <Bookshelf title="Want to Read" 
                            books={this.state.books.filter((book) => (book.shelf === 'wantToRead'))} 
                            moveToShelf={this.moveToShelf} 
                            shelves={this.state.shelves}/>
                <Bookshelf title="Read" 
                            books={this.state.books.filter((book) => (book.shelf === 'read'))} 
                            moveToShelf={this.moveToShelf} 
                            shelves={this.state.shelves}/>
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
