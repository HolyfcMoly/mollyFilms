import { Rating, ThinStar } from "@smastrom/react-rating";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getGenre, getNowPlaying } from "../services/api";
import Slider from "./Slider";
import { useInView } from "react-intersection-observer";
import Poster from "./ui/Poster";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const MovieList = ({ movie, genre = "Популярные", setSlide = true }) => {
    const [movieGenre, setMovieGenre] = useState([]);
    const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
    // const { ref, inView } = useInView({
    //     threshold: 0,
    //     triggerOnce: true,
    // });

    useEffect(() => {
        getGenre().then((data) => {
            setMovieGenre(data);
        });
        getNowPlaying().then((data) => setNowPlayingMovie(data.data.results));
    }, []);
    console.log(movie, "movie");
    return (
        <>
            {setSlide && (
                <div>
                    <h1 className="text-secondary text-[2.5rem] leading-[2.8rem]">
                        Сейчас смотрят
                    </h1>
                    <Slider movies={nowPlayingMovie} movieGenre={movieGenre} />
                </div>
            )}
            <h1 className="mb-[1.5rem] text-secondary text-[2.5rem] leading-[2.8rem]">
                {genre ? genre.replace(genre[0], genre[0].toUpperCase()) : ""}
            </h1>
            <div className="gridBox mt-8">
                {movie.map((item) => (
                    <div
                        className="p-2 w-[200px] max-h-[100%] rounded-xl "
                        key={item.id}
                    >
                        <Link
                            to={`/movie/${item.id}`}
                            className="flex flex-col relative group focus:outline-none"
                        >
                            <div className=" mb-2 h-[300px] p-1 relative scale-100 group-hover:scale-105 group-active:scale-100 group-focus:scale-105 transition-all rounded-xl border-[1px] border-orange-500/30 group-hover:border-orange-500/70 group-focus:border-orange-500/70 shadow-orange-500 group-hover:shadow-[0_0_15px_-3px_var(--tw-shadow-color)] group-focus:shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                                <Poster
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                />
                                <div className="flex flex-col justify-end opacity-0 transition-all rounded-xl group-focus:opacity-100 hover:opacity-100 hover:shadow-[inset_0_-100px_50px_-55px_rgba(0,0,0,1)] group-focus:shadow-[inset_0_-100px_50px_-55px_rgba(0,0,0,1)] absolute inset-0 bg-neutral-900 bg-opacity-40 h-full px-2 py-5">
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
                                    <h3>
                                        {item.release_date
                                            ? item.release_date.slice(0, 4)
                                            : item.release_date}
                                    </h3>
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
                            <h3 className="">{item.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MovieList;
