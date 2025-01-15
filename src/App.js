import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=b1b9a15d';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const searchMovies = async (title) => {
        setLoading(true);
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        searchMovies('Superman');
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className='app'>
            <h1>Film Spot</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies!'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            <div className='movie_container'>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : movies.length ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                ) : !movies.length && !searchTerm.length ? (
                    <div className='empty'>
                        <h2>Please enter a movie...</h2>
                    </div>
                )
                    :
                    (
                        <div className='empty'>
                            <h2>No Movies Found</h2>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default App;
