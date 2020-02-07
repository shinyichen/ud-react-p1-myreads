import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookMenu from './BookMenu.component';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        moveToShelf: PropTypes.func.isRequired,
        shelves: PropTypes.object.isRequired
    }

    coverStyle = {
        width: 128, 
        height: 188, 
        backgroundImage: 'url(' + this.props.book.imageLinks.smallThumbnail + ')'
    };

    getShelf = (bookId) => {
        if (this.props.shelves.currentlyReading.includes(bookId)) {
            return "currentlyReading";
        } else if (this.props.shelves.wantToRead.includes(bookId)) {
            return "wantToRead";
        } else if (this.props.shelves.read.includes(bookId)) {
            return "read";
        } else {
            return "none";
        }
    }
    
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={this.coverStyle}></div>
                    <BookMenu book={this.props.book} moveToShelf={this.props.moveToShelf} shelf={this.getShelf(this.props.book.id)} />
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">
                    {this.props.book.authors && this.props.book.authors.join(", ")}
                </div>
            </div>
        );
    }
}

export default Book;