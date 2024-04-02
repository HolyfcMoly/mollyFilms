import React, { useEffect, useMemo, useState } from "react";
import {
    getCredits,
    getExternalIds,
    getMovie,
    getMovieTrailer,
    getRecommendMovies,
    getRecommendSeries,
    getSeries,
    getSeriesCredits,
    getSeriesTrailer,
} from "../services/api";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import BackButton from "../components/ui/BackButton";
import ProfileSlider from "../components/ProfileSlider";
import Poster from "../components/ui/Poster";
import { Rating, ThinStar } from "@smastrom/react-rating";
import {
    convertRuntime,
    filterDuplicates,
    filteredJob,
    getPremierDate,
    getStringDeclination,
} from "../utils";
import { genreAndCategoriesIcons } from "../assets/icons/genres";
import ImdbBtn from "../components/ui/ImdbBtn";
import TrailerBtn from "../components/ui/TrailerBtn";
import CastCard from "../components/CastCard";
import useTextToggle from "../hooks/useTextToggle";
import CrewItem from "../components/CrewItem";
import ToggleOverview from "../components/ToggleOverview";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const MovieInformation = () => {
    const { id } = useParams();
    const location = useLocation();
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [credits, setCredits] = useState([]);
    const [crew, setCrew] = useState([]);
    const [video, setVideo] = useState([]);
    const [trailerVideo, setTrailerVideo] = useState([]);
    const [externalIds, setExternalIds] = useState({});
    const [expand,setExpand] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const newParams = useMemo(() => new URLSearchParams(searchParams), [searchParams])
    
    const genres = movie.genres || [];
    const fullText = movie.overview || '';
    const runtime = convertRuntime(movie.runtime ?? movie.episode_run_time?.[0] ?? movie.last_episode_to_air?.runtime);
    const seasonCount = getStringDeclination(movie.number_of_seasons, "сезон");
    
    const [text, toggleText] = useTextToggle(fullText);
    const director = filteredJob(crew, "Directing", "department").slice(0, 10);
    const producer = filteredJob(crew, "Production", "department").slice(0, 10);
    const operator = filteredJob(crew, "Camera", "department").slice(0, 10);
    const writer = filteredJob(crew, "Writing", "department").slice(0, 10);
    const cast = filterDuplicates(credits);
    const { media_type } = location.state || {};
    const defaultType = media_type || localStorage.getItem('type') || '';
    
    // const handleClick = (id) => {
    //     navigate(`/movie/${id}?${newParams.toString()}`)
    // }

    useEffect(() => {
        if (defaultType && defaultType === "tv" ) {
            getSeries(id).then((data) => {
                data && setMovie(data.data);
            });
            getSeriesCredits(id).then((data) => {
                data && setCredits(data.data.cast);
                data && setCrew(data.data.crew);
            });
            getSeriesTrailer(id).then((data) => {
                data && setVideo(data.data.results);
            });
            getRecommendSeries(id).then((data) => {
                data && setMovies(data.data.results);
            });
            getExternalIds(id).then((data) => {
                data && setExternalIds(data.data);
            });
        } else {
            getMovie(id).then((data) => {
                data && setMovie(data.data);
            });
            getRecommendMovies(id).then((data) => {
                data && setMovies(data.data.results);
            });
            getCredits(id).then((data) => {
                data && setCredits(data.data.cast);
                data && setCrew(data.data.crew);
            });
            getMovieTrailer(id).then((data) => {
                data && setVideo(data.data.results);
            });
        }
    }, [id, defaultType]);

    const movieStatus = {
        Canceled: "Отменен" ,
        Ended: "Завершен" ,
        Released: "Выпущен" ,
        'Returning Series': "Выходит" ,
        In_Production: "Скоро" ,
    };
    
    useEffect(() => {
        const trailers = video.filter((item) => item.type === "Trailer");
        setTrailerVideo(trailers);
    }, [video]);
    return (
        <>
            <div className="flex flex-col">
                <div className="pb-6 pl-1">
                    <BackButton
                        className={`flex items-center mt-1 sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`}
                    />
                </div>
                <div className="flex sm:flex-row flex-col sm:items-start items-center justify-between xl:px-6">
                    <div className="relative sfhd:w-[650px] sfhd:h-[920px] xl:w-[450px] xl:h-[720px] sm:w-[350px] sm:h-[550px] w-[260px] h-[380px] sm:mb-0 sm:mr-8 mb-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                        {movie && (
                            <Poster
                                src={`https://image.tmdb.org/t/p/w500${
                                    movie.poster_path
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={""}
                                className={"rounded-xl"}
                            />
                        )}
                    </div>

                    <div className="xl:w-[] sm:w-[50%] w-full flex flex-col justify-between">
                        {/* overview */}
                        <div>
                            <div className="flex flex-col items-center text-center ss:mb-10 mb-2">
                                <h1 className="xl:text-5xl text-3xl mb-3">
                                    {defaultType && defaultType === "tv"
                                        ? movie.name
                                        : movie.title}
                                    
                                    {movie.release_date && (
                                        `(${movie.release_date.slice(0,4)})`
                                    )}
                                </h1>
                                <p>
                                    {defaultType === "tv" && movie.in_production
                                        ? `(${movie.first_air_date.slice(0,4)}-...)`: ""}
                                    {movie.first_air_date &&
                                        movie.last_air_date && (
                                            <>
                                                {!movie.in_production
                                                    ? `(${movie.first_air_date.slice( 0,4)}
                                                    -${movie.last_air_date.slice(0,4)})`
                                                    : ""}
                                            </>
                                        )}
                                </p>
                                {movie.tagline ? (
                                    <p className="xl:text-3xl text-base">
                                        {movie.tagline}
                                    </p>
                                ) : (
                                    ""
                                )}
                                {movie.number_of_seasons ? (
                                    <p className="xl:text-3xl text-base capitalize">
                                        {seasonCount}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex justify-center flex-wrap space-x-3 xl:genre-icons-xl genre-icons ss:mb-10 mb-3">
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
                            <div className="flex sm:justify-between sm:space-x-0 justify-center space-x-5 ss:mb-10 mb-5">
                                <div className="flex">
                                    <span className="xl:text-2xl mr-3">
                                        {movie.vote_average
                                            ? movie.vote_average.toFixed(1)
                                            : movie.vote_average}
                                    </span>
                                    {movie.vote_average && (
                                        <Rating
                                            readOnly
                                            value={movie.vote_average / 2}
                                            itemStyles={myStyles}
                                            className="xl:max-w-[150px] max-w-[100px]"
                                        />
                                    )}
                                </div>
                                <p className="xl:text-2xl">{runtime}</p>
                            </div>
                            {!movie.overview ? (
                                ""
                            ) : (
                                <div className="ss:mb-10 mb-5">
                                    <h2 className="xl:text-4xl text-xl mb-3">
                                        Описание
                                    </h2>
                                    <ToggleOverview fullText={fullText} textSymbols={550}/>
                                </div>
                            )}
                        </div>
                        {/* buttons */}
                        <div className="flex sm:justify-start justify-center">
                            <ImdbBtn
                                src={
                                    defaultType === "tv"
                                        ? `https://www.imdb.com/title/${externalIds.imdb_id}`
                                        : `https://www.imdb.com/title/${movie.imdb_id}`
                                }
                                className={`mr-3`}
                            />
                            {trailerVideo && (
                                <TrailerBtn trailer={trailerVideo} />
                            )}
                        </div>
                        {/* cast */}
                        {cast.length && cast.length <= 3 ? (
                            <>
                                <h1 className="ss:mt-10 mt-3 mb-3 text-[2.5rem] leading-[2.8rem] text-secondary">
                                    Актеры
                                </h1>
                                <div className="flex   space-x-4 mt-6">
                                    {cast.map((actor) => (
                                        <CastCard
                                            key={actor.id}
                                            cast={actor}
                                            className=""
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                {/* episodes */}
                {movie.seasons && (
                    <div className="mt-8">
                        <h2 className="text-[2.5rem] leading-[2.8rem] text-secondary">
                            Сезоны
                        </h2>
                        <div className="flex items-start flex-wrap gap-5 xs:justify-start justify-center">
                            {movie.seasons.map((item) => {
                                return item.name === "Спецматериалы" ? (
                                    ""
                                ) : (
                                    <Link to={`/movie/${movie.id}/season/${item.season_number}`} state={{movie: movie, imdbId: externalIds.imdb_id}} key={item.id} className="mt-3 w-20">
                                        <div className="">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${item.poster_path ? item.poster_path : movie.poster_path}`}
                                                alt="season_poster"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                        <h2 className="break-words">{item.name}</h2>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
                {/* cast */}
                {cast.length && cast.length > 3 ? (
                    <div className="flex flex-col flex-1.5 ss:mt-10 mt-3">
                        <h1 className="text-[2.5rem] leading-[2.8rem] text-secondary">
                            Актеры
                        </h1>
                        <ProfileSlider credits={cast} />
                    </div>
                ) : (
                    ""
                )}
                    <div className="flex flex-col mt-5">
                        <h1 className=" text-2xl text-secondary">
                            Подробнее о {defaultType && defaultType === 'movie' ? "фильме" : "сериале"}
                        </h1>
                        <div className="flex mt-5 flex-wrap flex-col ss:flex-row">
                            <div className="flex-1 mb-4 ss:mb-0">
                                <h1 className="text-xl text-secondary mb-3">
                                    Информация
                                </h1>
                                <ul className="[&_li:not(:last-child)]:mb-3 [&_li]:text-base">
                                    {movie.number_of_episodes && (
                                        <li>
                                            <h2 className=" text-secondary">
                                                Эпизодов
                                            </h2>
                                            <p className=" text-dimWhite">
                                                {movie.number_of_episodes}
                                            </p>
                                        </li>
                                    )}
                                    {movie.production_countries && (
                                        <li>
                                            <h2 className=" text-secondary">
                                                Страна
                                            </h2>
                                            {movie.production_countries.map(
                                                (item) => (
                                                    <p
                                                        key={item.iso_3166_1}
                                                        className=" text-dimWhite"
                                                    >
                                                        {item.name}
                                                    </p>
                                                )
                                            )}
                                        </li>
                                    )}
                                    {movie.original_title ||
                                    movie.original_name ? (
                                        <li>
                                            <h2 className="text-secondary">
                                                Оригинальное название
                                            </h2>

                                            <p className="text-dimWhite">
                                                {movie.original_title}
                                                {movie.original_name}
                                            </p>
                                        </li>
                                    ) : (
                                        ""
                                    )}
                                    {movie.release_date ||
                                    movie.first_air_date ? (
                                        <li>
                                            <h2 className="text-secondary">
                                                Премьера в мире
                                            </h2>
                                            <p className="text-dimWhite">
                                                {movie.release_date && getPremierDate(movie.release_date)} 
                                                {movie.first_air_date && getPremierDate(movie.first_air_date)}
                                            </p>
                                        </li>
                                    ) : (
                                        ""
                                    )}
                                    {movie.status && (
                                        <li>
                                            <h2 className="text-secondary">
                                                Статус
                                            </h2>
                                            <p className="text-dimWhite">
                                                {movieStatus[movie.status]}
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {/* crew */}
                        {crew.length ? (
                            <div className="flex-1">
                                <h1 className="text-xl text-secondary mb-3">
                                    Съёмочная группа
                                </h1>
                                <ul className="flex flex-col flex-wrap [&_li:not(:last-child)]:mb-3 [&_li]:text-base ">
                                    {director.length > 0 && <CrewItem crew={director} job={'Режиссёр'}/>}
                                    {producer.length > 0 && <CrewItem crew={producer} job={'Продюсер'}/>}
                                    {writer.length > 0 && <CrewItem crew={writer} job={'Сценарист'}/>}
                                    {operator.length > 0 && <CrewItem crew={operator} job={'Оператор'}/>}
                                </ul>
                            </div>
                        ) : (
                            ""
                        )}
                        </div>
                    </div>
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
