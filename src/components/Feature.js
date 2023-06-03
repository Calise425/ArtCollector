import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {
    const searchTerm = props.searchTerm;
    const searchValue = props.searchValue;
    const setIsLoading = props.setIsLoading;
    const setSearchResults = props.setSearchResults;

    return (
        <span className="content">
            <a href="#" onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);
                try {
                    const response = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);;
                    setSearchResults(response);
                } catch (error) {
                    console.error("Uh oh, problem in Searchable", error);
                } finally {
                    setIsLoading(false);
                }
            }}>{searchValue}</a>
        </span>
    );
};

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {
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

    const factsElements = facts.map((fact, index) => (
        <React.Fragment key={index}>
            <span className="title">{fact.name.toUpperCase()}</span>
            <span className="content">{fact.value}</span>
        </React.Fragment>
    ));

    const searchableFacts = [
        { name: 'culture', value: culture },
        { name: 'technique', value: technique },
        { name: 'medium', value: medium ? medium.toLowerCase() : undefined },
    ];

    if (people) {
        people.forEach((person) => {
            searchableFacts.push({ name: 'person.displayname', value: person.displayname });
        });
    }

    const imageCollection = images.length > 0 ? images.map((image, index) => (
        <img src={image.baseimageurl} alt= "Beautiful Image Here" key={index} />
    )) : null;

    return (
        <main id="feature">
            <div className="object-feature">
                <header>
                    <h3>{title}</h3>
                    <h4>{dated}</h4>
                </header>
                <section className="facts">
                    {factsElements}
                    {searchableFacts.map((fact, index) => (
                        <Searchable searchTerm = {fact.name} searchValue = {fact.value} setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} key = {index}/>
                    ))}
                </section>
                <section className="photos">
                    {console.log(imageCollection)}
                    {console.log(images)}
                    {imageCollection}
                </section>
            </div>
        </main>
    );
};

export default Feature;

