import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const MovieList = ({ movie }) => {
    // console.log(movie, 'movie')
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     if(!loading) {
    //         setIsLoading(false)
    //     }
    // }, [loading])

    return (
        <>
        <div className="gridBox">
            {movie.map((item) => {
                    return (
                        <div className="flex-1 p-4" key={item.id}>
                            <Link to={`/movie/${item.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                />
                                <h3>{item.title}</h3>
                                <span></span>
                            </Link>
                        </div>
                    );
                })
            }
        </div>
        <Pagination />
        </>
    );
};

export default MovieList;
