import React from 'react';

const Loading = ({ isLoading }) => (
    isLoading ? (
        <div id="loading">
            <h2 className="message">Searching...</h2>
        </div>
    ) : null
);
  
  
export default Loading;