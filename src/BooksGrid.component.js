import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book.component';

class BooksGrid extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        moveToShelf: PropTypes.func.isRequired
    }

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.length > 0 && this.props.books.map(book => (
                    <li key={book.id}><Book book={book} moveToShelf={this.props.moveToShelf} /></li>
                ))}
            </ol>
        );
    }
}

 export default BooksGrid;