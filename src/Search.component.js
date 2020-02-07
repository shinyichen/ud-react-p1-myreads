import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksGrid from './BooksGrid.component';

class Search extends Component {

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
                    books: data
                    });
                }
            );
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
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleQueryChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books={this.state.books} />
                </div>
            </div>
        );
    }
}

export default Search;