import { Rating, ThinStar } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenre, getNowPlaying } from "../services/api";
import Slider from "./Slider";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const MovieList = ({ movie, genre = 'Популярные', setSlide = true }) => {
    const [movieGenre, setMovieGenre] = useState([]);
    const [nowPlayingMovie, setNowPlayingMovie] = useState([])

    useEffect(() => {
        getGenre().then((data) => {
            setMovieGenre(data);
        });
        getNowPlaying().then(data => setNowPlayingMovie(data.data.results))
    }, []);

    return (
        <>  {setSlide && (
                <div>
                    <h1 className="text-secondary text-[2.5rem] leading-[2.8rem]">Сейчас смотрят</h1>
                    <Slider movies={nowPlayingMovie} movieGenre={movieGenre}/>
                </div>
            )}
            <h1 className="mb-[1.5rem] text-secondary text-[2.5rem] leading-[2.8rem]">{genre ? genre.replace(genre[0], genre[0].toUpperCase()) : ''}</h1>
            <div className="gridBox mt-8">
                {movie.map((item) => (
                    <div
                        className="p-2 w-[200px] max-h-[100%] rounded-xl border-[1px] transition-shadow boxShadow border-orange-500/30"
                        key={item.id}
                    >
                        <Link
                            to={`/movie/${item.id}`}
                            className="flex flex-col relative"
                        >
                            <div className=" mb-2 h-[300px] relative scale-100 hover:scale-105 transition-transform">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                    className="w-[100%] h-[100%] object-cover bg-slate-400 rounded-md"
                                />
                                <div className="flex flex-col justify-end opacity-0 transition-all hover:opacity-100 absolute inset-0 bg-neutral-900 bg-opacity-50 h-full px-2 py-5">
                                    <div className={`flex`}>
                                        <p className="">
                                            {item.vote_average.toFixed(1)}
                                        </p>
                                        <Rating
                                            readOnly
                                            style={{ maxWidth: 100 }}
                                            value={item.vote_average / 2}
                                            itemStyles={myStyles}
                                        />
                                    </div>
                                    <h3>{item.release_date ? item.release_date.slice(0,4) : item.release_date}</h3>
                                    {movieGenre.map((genre) =>
                                        genre.id === item.genre_ids[0] ? (
                                            <p key={genre.id}>
                                                {genre.name.replace(
                                                    genre.name[0],
                                                    genre.name[0].toUpperCase()
                                                )}
                                            </p>
                                        ) : (
                                            ""
                                        )
                                    )}
                                </div>
                            </div>
                            <h3 className="overflow-hidden whitespace-nowrap text-ellipsis">
                                {item.title}
                            </h3>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MovieList;
