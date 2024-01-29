import React, { useEffect, useState } from "react";
import { getGenre, getNowPlaying } from "../services/api";
import MovieSlider from "./MovieSlider";
import MovieCard from "./MovieCard";

const MovieList = ({ movie, genre = "Популярные", setSlide = true }) => {
    const [movieGenre, setMovieGenre] = useState([]);
    const [nowPlayingMovie, setNowPlayingMovie] = useState([]);

    useEffect(() => {
        getGenre().then((data) => setMovieGenre(data));
        if(setSlide) {
            getNowPlaying().then((data) => setNowPlayingMovie(data.data.results));
        }
    }, [setSlide]);

    return (
        <>
            {setSlide && (
                <div>
                    <h1 className="text-secondary text-[2.5rem] leading-[2.8rem]">
                        Сейчас смотрят
                    </h1>
                    <MovieSlider movies={nowPlayingMovie} movieGenre={movieGenre} />
                </div>
            )}
            <h1 className="mb-[1.5rem] text-secondary text-[2.5rem] leading-[2.8rem]">
                {genre ? genre.replace(genre[0], genre[0].toUpperCase()) : ""}
            </h1>
            <div className="grid sfhd:gap-11 gap-5 sfhd:place-items-start sfhd:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] place-items-center items-start ss:gridBox gridBox-min mt-8 ">
                {movie.map((item) => (
                    <MovieCard
                        key={item.id}
                        movieGenre={movieGenre}
                        movie={item}
                    />
                ))}
            </div>
        </>
    );
};

export default MovieList;
