import React, { useEffect, useRef, useState } from "react";
import { getGenre, getNowPlaying, getTrendingSeries, getTvGenre } from "../services/api";
import MovieSlider from "./MovieSlider";
import MovieCard from "./MovieCard";
import {
    filterByProperty,
    filterDuplicates,
    filteredJob,
    getRandomKey,
} from "../utils";
import { Link } from "react-router-dom";
import { memo } from "react";

const MovieList = memo(({
    movie,
    genre = "Популярные",
    setSlide = true,
    query = "",
    search = false,
    all = false,
}) => {
    const [movieGenre, setMovieGenre] = useState([]);
    const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
    const [trendingSeries, setTrendingSeries] = useState([]);

    const actors = filteredJob(movie, "Acting", "known_for_department");
    const films = filteredJob(movie, "movie", "media_type");
    const series = filteredJob(movie, "tv", "media_type");
    const movies = [...films, ...series];
    const filteredMovies = filterDuplicates(movie);
    const allMovies = filterByProperty(filteredMovies, "title");
    const allSeries = filterByProperty(filteredMovies, "name");
    const ref = useRef('');
    const [storageRef, setStorageRef] = useState('')
    const categories = ["Все", "Фильмы", "Сериалы"];
    const storageTabType = ref.current = localStorage.getItem('tabType') || '';
    const storageType = localStorage.getItem('type') || '';

    const handleClick = (e) => {
        localStorage.setItem("tabType", e);
        setStorageRef(e);
    };

    const handleFilms = (storage) => {
        if(storage === "Сериалы") {
            return allSeries
        } else if(storage === "Фильмы") {
            return allMovies
        } else {
            return filteredMovies
        }
    }

    useEffect(() => {
        Promise.all([getGenre(), getTvGenre()]).then(
            ([movieGenres, tvGenres]) => {
                const allGenres = filterDuplicates([
                    ...movieGenres,
                    ...tvGenres,
                ]);
                setMovieGenre(allGenres);
            }
        );
        if (setSlide) {
            if(storageType === 'tv') {
                getTrendingSeries().then(data => 
                    data?.data?.results && setTrendingSeries(data.data.results)
                )
            } else {
                getNowPlaying().then((data) =>
                setNowPlayingMovie(data.data.results)
            );
            }
        }
    }, [setSlide, storageType]);

    useEffect(() => {
        setStorageRef(storageTabType)
    }, [storageRef, storageTabType])
    return (
        <>
            {setSlide && (
                <div>
                    <h1 className="text-secondary sfhd:text-5xl md:text-4xl text-2xl">
                        Сейчас смотрят
                    </h1>
                    <MovieSlider
                        movies={storageType === 'tv' ? trendingSeries : nowPlayingMovie}
                        movieGenre={movieGenre}
                        type={storageType}
                    />
                </div>
            )}
            {filteredMovies.length && !search ? (
                <>
                    <h1 className="mb-[1.5rem] text-secondary sfhd:text-5xl md:text-4xl text-2xl">
                        {genre
                            ? genre.replace(genre[0], genre[0].toUpperCase())
                            : ""}
                        {query && <span className="">{` "${query}"`}</span>}
                    </h1>
                    {all && (
                        <div className="flex gap-3">
                            {categories.map((item) => (
                                <span
                                    className="cursor-pointer hover:text-secondary transition-colors duration-300"
                                    key={getRandomKey(1, 10).id}
                                    onClick={(e) =>
                                        handleClick(e.target.innerHTML)
                                    }
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="grid sfhd:gap-11 gap-5 sfhd:place-items-start sfhd:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] place-items-center items-start ss:gridBox gridBox-min mt-8 ">
                        {handleFilms(storageRef).map((item) => (
                            <MovieCard
                                key={item.id}
                                movieGenre={movieGenre}
                                movie={item}
                            />
                        ))}
                    </div>
                </>
            ) : (
                ""
            )}
            {search && (
                <>
                    {movies.length ? (
                        <>
                            <h1 className="mb-[1.5rem] text-secondary sfhd:text-5xl md:text-4xl text-2xl">
                                {genre
                                    ? genre.replace(
                                        genre[0],
                                        genre[0].toUpperCase()
                                    )
                                    : ""}
                                {query && (
                                    <span className="">{` "${query}"`}</span>
                                )}
                            </h1>
                            <div className="grid sfhd:gap-11 gap-5 sfhd:place-items-start sfhd:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] place-items-center items-start ss:gridBox gridBox-min mt-8 ">
                                {movies.map((item) => (
                                    <MovieCard
                                        key={item.id}
                                        movieGenre={movieGenre}
                                        movie={item}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    {actors.length ? (
                        <>
                            <h1 className="mb-[1.5rem] mt-6 text-secondary sfhd:text-5xl md:text-4xl text-2xl">
                                Актеры
                            </h1>
                            <div className="flex flex-wrap ">
                                {actors.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/profile/${item.id}`}
                                        className="flex flex-wrap flex-col py-3 px-2 md:basis-[calc(99.9%*1/3)] ss:basis-[calc(99.9%*1/2)] w-full"
                                    >
                                        <h2>{item.name}</h2>
                                        <p className="text-dimWhite">
                                            {item.known_for_department}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </>
            )}
        </>
    );
});
MovieList.displayName = 'MovieList';
export default MovieList;
