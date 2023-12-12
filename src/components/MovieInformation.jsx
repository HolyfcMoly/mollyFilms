import React, { useEffect, useState } from "react";
import { getCredits, getMovie, getRecomendMovies } from "../api";
import { Link, useParams } from "react-router-dom";
import MovieList from "./MovieList";

const MovieInformation = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [movies, setMovies] = useState([]);
    const [credits, setCredits] = useState([]);
    useEffect(() => {
        getMovie(id).then((data) => {
            setData(data.data);
        });
        getRecomendMovies(id).then((data) => {
            setMovies(data.data.results);
        });
        getCredits(id).then((data) => {
            setCredits(data.data.cast.slice(0, 10));
            console.log(data.data.cast.slice(0, 10));
        });
    }, [id]);
    // console.log(data)
    return (
        <>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt=""
                />
            </div>
            <div>
                <MovieList movie={movies} />
            </div>
            <div>
                {!credits.length ? (
                    <h3>loading</h3>
                ) : (
                    credits.map((item) => {
                        return !item.profile_path ? (
                            ""
                        ) : (
                            <div key={item.id}>
                                <Link to={`/profile/${item.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                                    alt=""
                                />
                                <p>{item.original_name}</p>
                                </Link>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default MovieInformation;
