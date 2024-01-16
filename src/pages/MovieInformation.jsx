import React, { useEffect, useState } from "react";
import { getCredits, getMovie, getRecomendMovies } from "../services/api";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import BackButton from "../components/ui/BackButton";
import ProfileSlider from "../components/ProfileSlider";
import Poster from "../components/ui/Poster";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { ConvertRuntime } from "../utils";
import { genreAndCategoriesIcons } from "../assets/icons/genres";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const MovieInformation = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [credits, setCredits] = useState([]);
    const genres = movie.genres || [];
    const runtime = ConvertRuntime(movie.runtime);

    useEffect(() => {
        getMovie(id).then((data) => {
            setMovie(data.data);
        });
        getRecomendMovies(id).then((data) => {
            setMovies(data.data.results);
        });
        getCredits(id).then((data) => {
            setCredits(data.data.cast);
        });
    }, [id]);

    return (
        <>
            <div className="flex flex-col">
                <div className=" pb-6">
                    <BackButton className={`flex items-center mt-1 xl:pl-3 xl:pr-5 xl:py-3`} />
                </div>
                <div className="flex sm:flex-row flex-col sm:items-start items-center justify-between xl:px-6">
                    <div className="relative xl:w-[450px] xl:h-[720px] sm:w-[350px] sm:h-[550px] w-[260px] h-[380px] sm:mb-0 sm:mr-8 mb-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                        <Poster
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={""}
                            className={"rounded-xl"}
                        />
                    </div>

                    <div className="xl:w-[] sm:w-[50%] flex flex-col justify-between">
                        <div>
                            <div className="text-center mb-10">
                                <h1 className="text-3xl">
                                    {movie.title}(
                                    {movie.release_date
                                        ? movie.release_date.slice(0, 4)
                                        : movie.release_date}
                                    )
                                </h1>
                                <p className="text-base">{movie.tagline}</p>
                            </div>
                            <div className="flex justify-between genre-icons mb-10">
                                {genres.map((item) => {
                                    return (
                                        <div key={item.id} className="flex items-center ">
                                            {genreAndCategoriesIcons[item.id]}
                                            <p className="xs:ml-3 ml-1 xs:text-base text-xs">
                                                {item.name.replace(
                                                    item.name[0],
                                                    item.name[0].toUpperCase()
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between mb-10">
                                <div className="flex">
                                    <span>
                                        {movie.vote_average
                                            ? movie.vote_average.toFixed(1)
                                            : movie.vote_average}
                                    </span>
                                    <Rating
                                        readOnly
                                        value={movie.vote_average / 2}
                                        itemStyles={myStyles}
                                        className="sfhd:max-w-[150px] max-w-[100px]"
                                    />
                                </div>
                                <p>{runtime}</p>
                            </div>
                            
                            <div>
                                <h2 className="text-xl mb-3">Описание</h2>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                            <div className="mt-10">
                                <a href={`https://www.imdb.com/title/tt${movie.id}`} className="inline-block border-[1px] border-secondary rounded-md px-4 py-1 text-secondary">IMDB</a>
                            </div>
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
