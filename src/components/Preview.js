import React from 'react';

import { fetchQueryResultsFromURL } from '../api';

const Preview = ({setSearchResults, setFeaturedResult, setIsLoading, searchResults}) => {
  const {info, records} = searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);
    
    try {
      const response = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(response);
    } catch (error) {
      console.log("Uh oh, issue with fetchPage", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id="preview">
      <header className="pagination">
        <button
          disabled={!info.prev}
          className="previous"
          onClick={() => fetchPage(info.prev)}
        >
          Previous
        </button>
        <button
          disabled={!info.next}
          className="next"
          onClick={() => fetchPage(info.next)}
        >
          Next
        </button>
      </header>
      <section className="results">
        {records.map((record, index) => (
          <div
            key={index}
            className="object-preview"
            onClick={(event) => {
              event.preventDefault();
              setFeaturedResult(record);
            }}
          >{record.primaryimageurl ? <img src={record.primaryimageurl} alt={record.description} /> : null}
          {record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>
          }</div>
        ))}
      </section>
    </aside>
  );
};

export default Preview;