import React from 'react';

import { fetchQueryResultsFromURL } from '../api';

const Preview = ({setSearchResults, setFeaturedResult, setIsLoading, searchResults}) => {
  const {info, records} = searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);
    
    try {
      const response = await fetchQueryResultsFromURL(pageUrl);
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.log("Uh oh, issue with fetchPage", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleObjectClick(event, records) {
    event.preventDefault();
    setFeaturedResult(records);
    
    if (records.primaryimageurl) {
      return <img src={records.primaryimageurl} alt={records.description} />;
    }
    return records.title ? <h3>{records.title}</h3> : <h3>MISSING INFO</h3>;
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
        {records.map((records, index) => (
          <div
            key={index}
            className="object-preview"
            onClick={(event) => handleObjectClick(event, records)}
          ></div>
        ))}
      </section>
    </aside>
  );
};

export default Preview;