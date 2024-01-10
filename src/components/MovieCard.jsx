import React from "react";
import { Link } from "react-router-dom";
import Poster from "./ui/Poster";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { useInView } from "react-intersection-observer";
import ImgPreLoader from "./ui/ImgPreLoader";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const MovieCard = ({ movieGenre, movie }) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    return (
        <div className={`p-2 w-[200px] max-h-[100%] rounded-xl`} ref={ref}>
            <Link
                to={`/movie/${movie.id}`}
                className="flex flex-col relative group focus:outline-none"
            >
                <div
                    className={`mb-2 h-[300px] p-1 relative scale-100 group-hover:scale-105 group-active:scale-100 group-focus:scale-105 transition-all rounded-xl border-[1px] border-orange-500/30 group-hover:border-orange-500/70 group-focus:border-orange-500/70 shadow-orange-500 group-hover:shadow-[0_0_15px_-3px_var(--tw-shadow-color)] group-focus:shadow-[0_0_15px_-3px_var(--tw-shadow-color)]
                    }`}
                >
                    {inView ? (
                        <Poster
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={`rounded-md bg-transparent`}
                        />
                    ) : (
                        <ImgPreLoader />
                    )}
                    <div className="flex flex-col justify-end opacity-0 transition-all rounded-xl group-focus:opacity-100 hover:opacity-100 hover:shadow-[inset_0_-100px_50px_-55px_rgba(0,0,0,1)] group-focus:shadow-[inset_0_-100px_50px_-55px_rgba(0,0,0,1)] absolute inset-0 bg-neutral-900 bg-opacity-40 h-full px-2 py-5">
                        <div className={`flex`}>
                            <p className="">{movie.vote_average.toFixed(1)}</p>
                            <Rating
                                readOnly
                                style={{ maxWidth: 100 }}
                                value={movie.vote_average / 2}
                                itemStyles={myStyles}
                            />
                        </div>
                        <h3>
                            {movie.release_date
                                ? movie.release_date.slice(0, 4)
                                : movie.release_date}
                        </h3>
                        {movieGenre.map((genre) =>
                            genre.id === movie.genre_ids[0] ? (
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
                <h3 className="">{movie.title}</h3>
            </Link>
        </div>
    );
};

export default MovieCard;
