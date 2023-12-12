import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { memo } from "react";

const MovieList = ({ movie }) => {

    return (
        <>
        <div className="gridBox">
            {movie.map((item) => (
                    <div className="flex-1 p-4 w-[200px] max-h-[100%] h-[300px]" key={item.id}>
                        <Link to={`/movie/${item.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title}
                                className="w-[200px] h-[100%] bg-slate-400"
                            />
                            <h3>{item.title}</h3>
                            <span>0/10</span>
                        </Link>
                    </div>
                ))
            }
        </div>
        </>
    );
};

export default MovieList;
