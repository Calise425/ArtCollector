import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
    Feature,
    Loading,
    Preview,
    Search,
    Title
} from './components';

const App = () => {

    const [searchResults, setSearchResults] = useState({info: {}, records: []});
    const [featuredResult, setFeaturedResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    return <div className="app">
        <Title />
        <Search setIsLoading = {setIsLoading} setSearchResults = {setSearchResults}/>       
        <Preview searchResults = {searchResults} setIsLoading = {setIsLoading} setSearchResults = {setSearchResults} setFeaturedResult = {setFeaturedResult}/>      
        <Feature featuredResult = {featuredResult} setIsLoading = {setIsLoading} setSearchResults = {setSearchResults}/>
        <Loading isLoading = {isLoading}/> 
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);