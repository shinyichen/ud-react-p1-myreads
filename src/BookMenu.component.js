import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookMenu extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        moveToShelf: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    }

    handleSelect = (event) => {
        const shelf = event.target.value;
        this.props.moveToShelf(this.props.book.id, shelf);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.shelf} onChange={this.handleSelect}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookMenu;