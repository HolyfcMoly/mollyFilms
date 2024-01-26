import React, { useEffect, useState } from "react";
import {
    getCredits,
    getMovie,
    getMovieTrailer,
    getRecomendMovies,
} from "../services/api";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import BackButton from "../components/ui/BackButton";
import ProfileSlider from "../components/ProfileSlider";
import Poster from "../components/ui/Poster";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { convertRuntime, filteredJob } from "../utils";
import { genreAndCategoriesIcons } from "../assets/icons/genres";
import ImdbBtn from "../components/ui/ImdbBtn";
import TrailerBtn from "../components/ui/TrailerBtn";
import CastCard from "../components/CastCard";

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
    const [crew, setCrew] = useState([]);
    const [video, setVideo] = useState([]);
    const [trailerVideo, setTrailerVideo] = useState([]);
    const genres = movie.genres || [];
    const runtime = convertRuntime(movie.runtime);

    const director = filteredJob(crew, "Directing");
    const producer = filteredJob(crew, "Production");
    const operator = filteredJob(crew, "Camera");
    const writer = filteredJob(crew, "Writing");

    useEffect(() => {
        getMovie(id).then((data) => {
            setMovie(data.data);
        });
        getRecomendMovies(id).then((data) => {
            setMovies(data.data.results);
        });
        getCredits(id).then((data) => {
            setCredits(data.data.cast);
            setCrew(data.data.crew);
        });
        getMovieTrailer(id).then((data) => {
            setVideo(data.data.results);
        });
    }, [id]);

    useEffect(() => {
        const trailers = video.filter((item) => item.type === "Trailer");
        setTrailerVideo(trailers);
    }, [video]);

    return (
        <>
            <div className="flex flex-col">
                <div className="pb-6">
                    <BackButton
                        className={`flex items-center mt-1 sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`}
                    />
                </div>
                <div className="flex sm:flex-row flex-col sm:items-start items-center justify-between xl:px-6">
                    <div className="relative sfhd:w-[650px] sfhd:h-[920px] xl:w-[450px] xl:h-[720px] sm:w-[350px] sm:h-[550px] w-[260px] h-[380px] sm:mb-0 sm:mr-8 mb-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                        {movie.poster_path && (
                            <Poster
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={""}
                                className={"rounded-xl"}
                            />
                        )}
                    </div>

                    <div className="xl:w-[] sm:w-[50%] w-full flex flex-col justify-between">
                        <div>
                            <div className="text-center mb-10">
                                <h1 className="xl:text-5xl text-3xl mb-3">
                                    {movie.title}(
                                    {movie.release_date
                                        ? movie.release_date.slice(0, 4)
                                        : movie.release_date}
                                    )
                                </h1>
                                {movie.tagline ? (
                                    <p className="xl:text-3xl text-base">
                                        {movie.tagline}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex justify-center flex-wrap space-x-3 xl:genre-icons-xl genre-icons mb-10">
                                {genres.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center py-2"
                                        >
                                            {genreAndCategoriesIcons[item.id]}
                                            <p className="xs:ml-3 ml-1 xl:text-2xl xs:text-base text-xs">
                                                {item.name.replace(
                                                    item.name[0],
                                                    item.name[0].toUpperCase()
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex sm:justify-between sm:space-x-0 justify-center space-x-5 mb-10">
                                <div className="flex">
                                    <span className="xl:text-2xl mr-3">
                                        {movie.vote_average
                                            ? movie.vote_average.toFixed(1)
                                            : movie.vote_average}
                                    </span>
                                    <Rating
                                        readOnly
                                        value={movie.vote_average / 2}
                                        itemStyles={myStyles}
                                        className="xl:max-w-[150px] max-w-[100px]"
                                    />
                                </div>
                                <p className="xl:text-2xl">{runtime}</p>
                            </div>
                            {!movie.overview ? (
                                ""
                            ) : (
                                <div>
                                    <h2 className="xl:text-4xl text-xl mb-3">
                                        Описание
                                    </h2>
                                    <p className="xl:text-2xl">
                                        {movie.overview}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex sm:justify-start justify-center mt-10">
                            <ImdbBtn
                                src={`https://www.imdb.com/title/${movie.imdb_id}`}
                                className={`mr-3`}
                            />
                            {trailerVideo && (
                                <TrailerBtn trailer={trailerVideo} />
                            )}
                        </div>
                        {credits.length && credits.length <= 3 ? (
                            <div className="flex sm:justify-between sm:space-x-0 justify-center space-x-4 mt-10">
                                <h1>Актеры</h1>
                                {credits.map((cast) => (
                                    <CastCard
                                        key={cast.id}
                                        cast={cast}
                                        className=""
                                    />
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                {credits.length && credits.length > 3 ? (
                    <div className="flex flex-col flex-1.5 mt-10">
                        <h1 className="text-[2.5rem] leading-[2.8rem] text-secondary">
                            Актеры
                        </h1>
                        <ProfileSlider credits={credits} />
                    </div>
                ) : (
                    ""
                )}
                {crew.length ? (
                    <div className="flex flex-col">
                        <h1 className=" text-2xl text-secondary">
                            Подробнее о {movie ? "фильме" : ""}
                        </h1>
                        <div className="flex mt-5 flex-wrap flex-col ss:flex-row">
                            <div className="flex-1 mb-4 ss:mb-0">
                                <h1 className="text-xl text-secondary mb-3">
                                    Информация
                                </h1>
                                <ul className="[&_li:not(:last-child)]:mb-3">
                                    {movie.production_countries && (
                                        <li>
                                            <h2 className="text-lg text-secondary">Страна</h2>
                                            {movie.production_countries.map(
                                                (item) => (
                                                    <p key={item.iso_3166_1} className="text-base text-dimWhite">
                                                        {item.name}
                                                    </p>
                                                )
                                            )}
                                        </li>
                                    )}
                                    <li>
                                        <h2 className="text-lg text-secondary">Оригинальное название</h2>
                                        <p className="text-base text-dimWhite">{movie.original_title}</p>
                                    </li>
                                    <li>
                                        <h2 className="text-lg text-secondary">Премьера в мире</h2>
                                        <p className="text-base text-dimWhite">{movie.release_date}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-xl text-secondary mb-3">Съёмочная группа</h1>
                                <ul className="flex flex-col flex-wrap [&_li:not(:last-child)]:mb-3 *:inline-block ">
                                    {director.length > 0 && (
                                        <li>
                                            <h2 className="text-lg text-secondary">
                                                Режиссёр
                                            </h2>
                                            {director.map((item, index) => {
                                                return (
                                                    <h3
                                                        key={item.id}
                                                        className="text-base text-dimWhite inline "
                                                    >
                                                        {director.length - 1 ===
                                                        index
                                                            ? item.name
                                                            : `${item.name}, ` }
                                                    </h3>
                                                );
                                            })}
                                        </li>
                                    )}
                                    {producer.length > 0 && (
                                        <li>
                                            <h2 className="text-lg text-secondary">
                                                Продюсер
                                            </h2>
                                            {producer.map((item, index) => {
                                                return (
                                                    <h3
                                                        key={item.id}
                                                        className="text-base text-dimWhite inline"
                                                    >
                                                        {producer.length - 1 ===
                                                        index
                                                            ? item.name
                                                            : `${item.name}, `}
                                                    </h3>
                                                );
                                            })}
                                        </li>
                                    )}
                                    {writer.length > 0 && (
                                        <li>
                                            <h2 className="text-lg text-secondary">
                                                Сценарист
                                            </h2>
                                            {writer.map((item, index) => (
                                                <h3
                                                    key={item.id}
                                                    className="text-base text-dimWhite inline"
                                                >
                                                    {writer.length - 1 === index
                                                        ? item.name
                                                        : `${item.name}, `}
                                                </h3>
                                            ))}
                                        </li>
                                    )}
                                    {operator.length > 0 && (
                                        <li>
                                            <h2 className="text-lg text-secondary">
                                                Оператор
                                            </h2>
                                            {operator.map((item, index) => (
                                                <h3
                                                    key={item.id}
                                                    className="text-base text-dimWhite inline"
                                                >
                                                    {operator.length - 1 === index
                                                        ? item.name
                                                        : `${item.name}, `}
                                                </h3>
                                            ))}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {!movies.length ? (
                    ""
                ) : (
                    <div className="mt-10">
                        <MovieList
                            movie={movies}
                            genre={"Рекомендуем также"}
                            setSlide={false}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default MovieInformation;
