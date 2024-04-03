import React, { memo, useEffect } from "react";
import { useState } from "react";
import {
    refreshAPI,
    getMovies,
    getMoviesByGenre,
    getCategoryTv,
    getMultiSearchByQuery,
    getTvByGenre,
} from "../services/api";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Preloader from "../components/ui/Preloader";
import { excludeGenres } from "../assets/icons/genres";
import { MAX_PAGES } from "../services/config";

const Movies = memo(() => {
    const [genreMovie, setGenreMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allMovies, setAllMovies] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('p') || '1';
    const movieId = isNaN(searchParams.get('id')) ? searchParams.get('id') : Number(searchParams.get('id'));
    const query = searchParams.get('q') || '';
    const genre = searchParams.get('g') || '';
    const type = searchParams.get('t') || '';
    const search = searchParams.get('s') || false;
    const [pages, setPages] = useState(0);
    const typeStorage = localStorage.getItem('type');

    useEffect(() => {
        setAllMovies(false);
        if (!query) {
            if (!movieId) {
                refreshAPI();
                Promise.all([
                    getMovies(movieId, currentPage),
                    getCategoryTv('',currentPage),
                ]).then(([movie, tv]) => {
                    if(movie?.data?.results && tv?.data?.results) {
                        const allGenres = [
                            ...movie.data.results,
                            ...tv.data.results,
                        ]
                        .filter(genre => {
                            return !genre.genre_ids.some(id => excludeGenres.includes(id))
                        })
                        .sort((a, b) => b.vote_average - a.vote_average)
                        setGenreMovie(allGenres);
                        setAllMovies(true);
                    }
                    const moviesTotalPages = movie?.data?.total_pages;
                    const tvTotalPages = tv?.data?.total_pages;
                    const totalPages = Math.min(moviesTotalPages, tvTotalPages);
                    if (totalPages >= MAX_PAGES) {
                        setPages(MAX_PAGES);
                    } else {
                        setPages(totalPages);
                    }
                });
            }
            if(type && type === 'movie' && !genre) {
                refreshAPI();
                getMovies("popular", currentPage).then(data => {
                    data?.data?.results && setGenreMovie(data.data.results);
                    data?.data?.total_pages && setPages(data.data.total_pages);
                })
            } 
            if(type && type === 'tv' || typeStorage && typeStorage === 'tv') {
                if(!movieId) {
                    refreshAPI();
                    getCategoryTv('',currentPage).then(data => {
                        if(data?.data?.results) {
                            const series = data.data.results.filter(genre => {
                                return !genre.genre_ids.some(id => excludeGenres.includes(id))
                            })
                            setGenreMovie(series)
                        }
                        data?.data?.total_pages && setPages(data.data.total_pages);
                    })
                }
                if(movieId && typeof movieId === "string") {
                    refreshAPI();
                    getCategoryTv(movieId, currentPage).then(data => {
                        if(data?.data?.results) {
                            const series = data.data.results.filter(genre => {
                                return !genre.genre_ids.some(id => excludeGenres.includes(id))
                            })
                            setGenreMovie(series)
                        }
                        data?.data?.total_pages && setPages(data.data.total_pages);
                    })
                }
                if(movieId && typeof movieId === 'number') {
                    refreshAPI();
                    getTvByGenre(movieId, currentPage).then((data) => {
                        data?.data?.results && setGenreMovie(data.data.results);
                        data?.data?.total_pages && setPages(data.data.total_pages);
                    });
                }
            }
            if (movieId && typeof movieId === "string" && typeStorage === 'movie') {
                refreshAPI();
                getMovies(movieId, currentPage).then((data) => {
                    data?.data?.results && setGenreMovie(data.data.results);
                    data?.data?.total_pages && setPages(data.data.total_pages);
                });
            }
            if (movieId && typeof movieId === "number" && typeStorage === 'movie') {
                refreshAPI();
                getMoviesByGenre(movieId, currentPage).then((data) => {
                    data?.data?.results && setGenreMovie(data.data.results);
                    data?.data?.total_pages && setPages(data.data.total_pages);
                });
            }
        } else {
            refreshAPI();
            getMultiSearchByQuery(query, currentPage).then((data) => {
                data?.data?.results && setGenreMovie(data.data.results);
                data?.data?.total_pages && setPages(data.data.total_pages);
            });
        }
    }, [query, movieId, currentPage, type, genre, typeStorage]);

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
                            query={query}
                            search={search}
                            all={allMovies}
                        />
                    </div>
                        <Pagination
                            searchParams={searchParams}
                            setPage={setSearchParams}
                            totalPages={pages}
                        />
                </>
            )}
        </>
    );
});
Movies.displayName = 'Movies';
export default Movies;
