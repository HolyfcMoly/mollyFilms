import React, { useEffect, useState } from "react";
import { getCredits, getMovie, getRecomendMovies } from "../services/api";
import { Link, useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import BackButton from "../components/ui/BackButton";
import ProfileSlider from "../components/ProfileSlider";

const MovieInformation = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        getMovie(id).then((data) => {
            setMovie(data.data);
        });
        getRecomendMovies(id).then((data) => {
            setMovies(data.data.results);
        });
        getCredits(id).then((data) => {
            setCredits(data.data.cast);
            console.log(data.data.cast);
        });
    }, [id]);

    console.log(movies);
    return (
        <>
            <div>
                <BackButton className={`my-1`} />
                <div className="flex">
                    <div className="flex-1  h-[600px]">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex-1">
                        <p>{movie.overview}</p>
                    </div>
                </div>
                <div className="flex flex-col flex-1.5">
                    <div className="">
                        {!credits.length ? (
                            ""
                        ) : (
                            <ProfileSlider credits={credits} />
                        )}
                    </div>
                </div>
                <div>
                    {!movies.length ? (
                        ""
                    ) : (
                        <MovieList
                            movie={movies}
                            genre={"Рекомендуем также"}
                            setSlide={false}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default MovieInformation;
