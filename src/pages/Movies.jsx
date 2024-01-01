import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getMovieByQuerySearch, getMovies, getMoviesByGenre } from "../services/api";
import MovieList from "../components/MovieList";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import Preloader from "../components/ui/Preloader";

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
                    data.data.results && setGenreMovie(data.data.results);
                    data.data.page && setCurrentPage(data.data.page);
                    data.data.total_pages && setPages(data.data.total_pages);
                    // setIsLoading(false)
                });
            } else {
                getMoviesByGenre(movies,currentPage).then((data) => {
                    data.data.results && setGenreMovie(data.data.results);
                    data.data.page && setCurrentPage(data.data.page);
                    data.data.total_pages && setPages(data.data.total_pages);
                    // setIsLoading(false)

                });
            }
        } else {
            getMovieByQuerySearch(query, currentPage).then(data => {
                data.data.results && setGenreMovie(data.data.results);
                data.data.page && setCurrentPage(data.data.page);
                data.data.total_pages && setPages(data.data.total_pages);
                // setIsLoading(false)

            })
        }
    }, [ query,movies, currentPage ]);

    return (
        <>
            {!genreMovie.length ? (
                <Preloader />
            ) : (
                <>
                    <div>
                        <MovieList
                            movie={genreMovie}
                            genre={genre}
                            // loading={isLoading}
                            // setIsLoading={setIsLoading}
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
