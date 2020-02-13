import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    
    render() {
        return (
            <div className="not-found">
                <h2>The page you are looking for is not found</h2>
                <Link to="/">Go to home page</Link>
            </div>
        );
    }
}

export default NotFound;