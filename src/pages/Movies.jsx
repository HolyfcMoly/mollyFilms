import React, { useEffect } from "react";
import { useState } from "react";
import {
    refreshAPI,
    getMovieByQuerySearch,
    getMovies,
    getMoviesByGenre,
    getPopularTv,
} from "../services/api";
import MovieList from "../components/MovieList";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import Preloader from "../components/ui/Preloader";

const Movies = () => {
    const [genreMovie, setGenreMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const defaultPage = localStorage.getItem('page') || 1 ;
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [pages, setPages] = useState(0);
    const [movieTotalPages, setMovieTotalPages] = useState(1);
    const [tvsTotalPages, setTvsTotalPages] = useState(1);
    const [prevGenre, setPrevGenre] = useState('');
    
    localStorage.setItem('page', currentPage);
    const storage = localStorage.getItem('page');
    
    const location = useLocation();
    const { movies, query, genre } = !location.state
    ? genreMovie
    : location.state;

    useEffect(() => {
        const isChanged = localStorage.getItem('isGenreChanged');
        if(genre === prevGenre) {
            setCurrentPage(storage);
            if(isChanged) {
                setCurrentPage(1)
                localStorage.removeItem('isGenreChanged')
            }
        }

        if(genre !== prevGenre) {
            setPrevGenre(genre)
            if(isChanged) {
                setCurrentPage(1)
                localStorage.removeItem('isGenreChanged')
            }
        } 

        if(!movies && !location.state?.homePage) {
            setCurrentPage(storage)
        }

        if(location.state?.homePage) {
            setCurrentPage(1);
            location.state.homePage = null;
        }
    }, [location.state, storage, genre, prevGenre, movies]);


    useEffect(() => {
        if (!query) {
            if (!movies) {
                console.log(movies)
                refreshAPI();
                Promise.all([
                    getMovies(movies, currentPage),
                    getPopularTv(currentPage),
                ]).then(([movie, tv]) => {
                    const allGenres = [
                        ...movie.data.results,
                        ...tv.data.results,
                    ].sort((a, b) => b.popularity - a.popularity);
                    setGenreMovie(allGenres);
                    const moviesTotalPages = movie.data.total_pages;
                    const tvTotalPages = tv.data.total_pages;
                    const totalPages = Math.min(moviesTotalPages, tvTotalPages);
                    if (totalPages >= 500) {
                        setPages(500);
                    } else {
                        setPages(totalPages);
                    }
                });
            }
            if (movies && typeof movies === "string") {
                refreshAPI();
                getMovies(movies, currentPage).then((data) => {
                    data?.data?.results && setGenreMovie(data.data.results);
                    data?.data?.page && setCurrentPage(data.data.page);
                    data?.data?.total_pages && setPages(data.data.total_pages);
                });
            }
            if (movies && typeof movies === "number") {
                refreshAPI();
                getMoviesByGenre(movies, currentPage).then((data) => {
                    data?.data?.results && setGenreMovie(data.data.results);
                    data?.data?.page && setCurrentPage(data.data.page);
                    data?.data?.total_pages && setPages(data.data.total_pages);
                });
            }
        } else {
            refreshAPI();
            getMovieByQuerySearch(query, currentPage).then((data) => {
                data?.data?.results && setGenreMovie(data.data.results);
                data?.data?.page && setCurrentPage(data.data.page);
                data?.data?.total_pages && setPages(data.data.total_pages);
            });
        }
    }, [query, movies, currentPage, storage]);

    return (
        <>
            {!genreMovie.length ? (
                <Preloader container={`min-h-[500px]`} />
            ) : (
                <>
                    <div>
                        <MovieList
                            movie={genreMovie}
                            genre={genre}
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
