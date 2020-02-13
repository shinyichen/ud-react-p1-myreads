import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid.component';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

class Search extends Component {

    static propTypes = {
        moveToShelf: PropTypes.func.isRequired,
        shelves: PropTypes.object.isRequired
    }

    state = {
        query: "",
        books: []
    }

    search = (query) => {
        query = query.trim();
        if (query.length > 0) {
            BooksAPI.search(query)
            .then(
                data => {
                    this.setState({
                        books: (Array.isArray(data))? data : []
                    });
                }
            );
        } else {
            this.setState({
                books: []
            });
        }
    };

    handleQueryChange = (event) => {
        this.setState({
            query: event.target.value
        });
        this.search(event.target.value);
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            minLength={2} 
                            placeholder="Search by title or author" 
                            value={this.state.query} 
                            onChange={this.handleQueryChange}
                            />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={this.state.books} moveToShelf={this.props.moveToShelf} shelves={this.props.shelves} />
                </div>
            </div>
        );
    }
}

export default Search;