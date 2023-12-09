import React, { useEffect } from "react";
import { useState } from "react";
import { getMovies, getMoviesByGenre } from "../api";
import MovieList from "./MovieList";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";

const Movies = () => {
    const [genreMovie, setGenreMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    const location = useLocation();
    const { movies } = !location.state ? genreMovie : location.state;

    useEffect(() => {
        if (typeof movies === "string") {
            getMovies(movies,currentPage).then((data) => {
                console.log(data.data);
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
    }, [movies, currentPage]);

    return (
        <>
            {!genreMovie.length ? (
                <h3>loading movies</h3>
            ) : (
                <>
                    <div>
                        <MovieList
                            movie={genreMovie}
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
