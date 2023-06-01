import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {
    const searchTerm = props.searchTerm;
    const searchValue = props.searchValue;
    const setIsLoading = props.setIsLoading;
    const setSearchResults = props.setSearchResults;
    <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
                const response = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                const result = await response.json();
                setSearchResults(result);
            } catch (error) {
                console.error("Uh oh, problem in Searchable", error)
            } finally {
                setIsLoading(false);
            }
        }}>SOME SEARCH TERM</a>
    </span>
}

const Feature = ({ featuredResult }) => {
    if (!featuredResult) {
      return <main id="feature"></main>;
    }

    const {
      title,
      dated,
      images,
      primaryimageurl,
      description,
      culture,
      style,
      technique,
      medium,
      dimensions,
      people,
      department,
      division,
      contact,
      creditline,
    } = featuredResult;

    const facts = [
        { name: 'title', value: title },
        { name: 'dated', value: dated },
        { name: 'culture', value: culture },
        { name: 'style', value: style },
        { name: 'technique', value: technique },
        { name: 'medium', value: medium },
        { name: 'dimensions', value: dimensions },
        { name: 'department', value: department },
        { name: 'division', value: division },
        { name: 'contact', value: contact },
        { name: 'creditline', value: creditline },
    ];

    facts.map((fact, index) => (
        <React.Fragment key={index}>
          <span className="title">{fact.name.toUpperCase()}</span>
          <span className="content">{fact.value}</span>
        </React.Fragment>
    ));

    const searchableFacts = [
        { name: 'culture', value: culture },
        { name: 'technique', value: technique },
        { name: 'medium', value: medium.toLowerCase() },
    ];

    renderFacts = () => {
        searchableFacts.map((fact, index) => (
        <React.Fragment key={index}>
          <span className="title">{fact.name.toUpperCase()}</span>
          <span className="content">{fact.value}</span>
        </React.Fragment>
        ));
    }

    if (people) {
        people.forEach((person) => {
            searchableFacts.push({ name: 'person.displayname', value: person.displayname });
        });
    }

    if (!images) {
        return null;
    }

    if (images) {
        const imageCollection = <section className="photos">
            {images.map((image, index) => (
            <img src={image} alt="SOMETHING_WORTHWHILE" key={index} />))}
        </section>
        
        return imageCollection;
    };
  
    return (
        <main id="feature">
            <div className="object-feature">
                <header>
                <h3>OBJECT TITLE</h3>
                <h4>WHEN IT IS DATED</h4>
                </header>
                <section className="facts">
                {renderFacts}
                </section>
                <section className="photos">
                {imageCollection}
                </section>
            </div>
        </main>
    );
};

export default Feature;