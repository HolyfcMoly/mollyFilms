import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getMovieByQuerySearch, getMovies, getMoviesByGenre } from "../services/api";
import MovieList from "../components/MovieList";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

const Movies = () => {
    const [genreMovie, setGenreMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    const location = useLocation();
    const { movies, query, genre } = !location.state ? genreMovie : location.state;
    
    useEffect(() => {
        if(!query) {
            if (typeof movies === "string") {
                getMovies(movies,currentPage).then((data) => {
                    setGenreMovie(data.data.results);
                    setCurrentPage(data.data.page);
                    setPages(data.data.total_pages);
                });
            } else {
                getMoviesByGenre(movies,currentPage).then((data) => {
                    setGenreMovie(data.data.results);
                    setCurrentPage(data.data.page);
                    setPages(data.data.total_pages);
                });
            }
        } else {
            getMovieByQuerySearch(query, currentPage).then(data => {
                setGenreMovie(data.data.results);
                setCurrentPage(data.data.page);
                setPages(data.data.total_pages);
            })
        }
    }, [ query,movies, currentPage ]);

    return (
        <>
            {!genreMovie.length ? (
                <h3>loading movies</h3>
            ) : (
                <>
                    <div>
                        <MovieList
                            movie={genreMovie}
                            genre={genre}
                            // loading={isLoading}
                        />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                        totalPages={pages}
                    />
                </>
            )}
        </>
    );
};

export default Movies;
