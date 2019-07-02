/** @module views/NotFound */

import React from 'react';
import 'views/NotFound/style.less';

/** returns a 404 - resource not found message */
function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <hr />
            <p>Resource not found</p>
        </div>
    );
}

export default NotFound;
