import React, { useEffect } from "react";
import { useState } from "react";
import { getMovies, getMoviesByGenre } from "../api";
import MovieList from "./MovieList";
import { useLocation } from "react-router-dom";

const Movies = () => {
    const [genreMovie, setGenreMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const {movies} = !location.state ? genreMovie : location.state;
    
    useEffect(() => {
            if (typeof movies === 'string') {
                getMovies(movies).then(data => {
                    setGenreMovie(data.data.results)
                })
            } else {
                getMoviesByGenre(movies).then(data => {
                    setGenreMovie(data.data.results)
                })
            }
        }, [movies]);
    
    return (
        <>
            {!genreMovie.length ? (
                <h3>loading movies</h3>
            ) : (
                <div>
                    <MovieList
                        movie={genreMovie}
                        // loading={isLoading}
                    />
                </div>
            )}
        </>
    );
};

export default Movies;
