import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
    getExternalIds,
    getSeries,
    getTvSeriesEpisode,
    getTvSeriesVideos,
} from "../services/api";
import BackButton from "../components/ui/BackButton";
import Poster from "../components/ui/Poster";
import ToggleOverview from "../components/ToggleOverview";
import { useInView } from "react-intersection-observer";
import ImdbBtn from "../components/ui/ImdbBtn";
import TrailerBtn from "../components/ui/TrailerBtn";
import VoteRating from "../components/ui/VoteRating";
import ImgPreLoader from "../components/ui/ImgPreLoader";
import {
    deleteFromLocalStorage,
    getPremierDate,
    setLocalStorageItem,
} from "../utils";
import IconArrowForward from "../assets/icons/IconArrowForward";

const TvEpisodesInfo = () => {
    const { id, sNumber } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [season, setSeason] = useState([]);
    const location = useLocation();
    const [movieInfo, setMovieInfo] = useState([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const { movie } = location.state || [];
    const [trailer, setTrailer] = useState([]);
    const [seasonNumber, setSeasonNumber] = useState(sNumber);
    const [externalIds, setExternalIds] = useState({});
    const [displayedEpisodes, setDisplayedEpisodes] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(30);

    const navigate = useNavigate();
    const fullText = season.overview || "";

    const { ref, inView } = useInView({
        threshold: 0.7,
        triggerOnce: true,
    });

    const actions = [
        deleteFromLocalStorage("tvImdbId"),
        deleteFromLocalStorage("poster"),
    ];

    const showMore = () => {
        setItemsToShow((prev) => prev + 20);
    };

    const showAll = () => {
        setDisplayedEpisodes(episodes);
    };

    const handleClick = (season) => {
        setSeasonNumber(season);
        navigate(`/movie/${id}/season/${season}`, { state: { movieInfo } });
    };

    useEffect(() => {
        setSeasonNumber(sNumber);
        if (!movie) {
            getSeries(id).then((data) => {
                if (data?.data) {
                    setMovieInfo(data.data);
                    setTotalSeasons(
                        data.data.seasons[0].name === "Спецматериалы"
                            ? data.data.seasons.length - 1
                            : data.data.seasons.length
                    );
                }
            });
        } else {
            setMovieInfo(movie);
        }
        getTvSeriesEpisode(id, seasonNumber).then((data) => {
            data?.data && setSeason(data.data);
            if (data?.data?.episodes) {
                setEpisodes(data.data.episodes);
                setDisplayedEpisodes(data.data.episodes.slice(0, itemsToShow));
            }
        });
        getTvSeriesVideos(id, seasonNumber).then((data) => {
            data?.data?.results &&
                setTrailer(
                    data.data.results.filter((item) => item.type === "Trailer")
                );
        });
        getExternalIds(id).then((data) => {
            data?.data && setExternalIds(data.data);
        });
    }, [id, seasonNumber, sNumber, movie, itemsToShow]);

    return (
        <div className="flex flex-col">
            {/* back buttons */}
            <div className="pb-6 pl-1 flex justify-self-center gap-4">
                <BackButton
                    className={`flex items-center sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`}
                    actions={actions}
                />
                <button
                    className={`block pr-4 pl-2 py-2 bg-transparent text-secondary group hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors sfhd:text-2xl xl:text-lg text-base`}
                    onClick={() => {
                        navigate(`/movie/${id}`, {
                            state: { media_type: "tv" },
                        });
                        deleteFromLocalStorage("poster");
                        deleteFromLocalStorage("tvImdbId");
                    }}
                >
                    К сериалу
                </button>
            </div>
            {/* poster */}
            <div className="flex items-start xl:px-6 px-1">
                <div className="relative sfhd:w-[385px] sfhd:h-[570px] xl:w-[300px] xl:h-[450px] sm:w-[220px] sm:h-[350px] w-[100px] h-[150px] mr-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                    {season && (
                        <Poster
                            src={`https://image.tmdb.org/t/p/original${
                                season.poster_path
                                    ? season.poster_path
                                    : movieInfo?.poster_path
                                    ? movieInfo.poster_path
                                    : movieInfo?.backdrop_path
                            }`}
                            alt={""}
                            className={"rounded-xl"}
                        />
                    )}
                </div>
                {/* overview */}
                <div>
                    <h1 className="xl:text-5xl text-3xl sfhd:mb-4 mb-2">
                        {movieInfo?.name || ""}

                        {movieInfo?.release_date &&
                            `(${movieInfo.release_date.slice(0, 4)})`}
                    </h1>
                    <p className="sfhd:text-3xl xl:text-2xl text-lg sfhd:mb-4 mb-1">
                        {season.name}
                    </p>
                    {season.air_date && (
                        <p className="sfhd:text-2xl xl:text-xl sfhd:mb-4 mb-1">{`Премьера • ${getPremierDate(
                            season.air_date
                        )}`}</p>
                    )}
                    {season.vote_average !== 0 && (
                        <VoteRating vote={season.vote_average} />
                    )}
                    {!fullText && (
                        <div className="flex justify-start sfhd:mt-5 mt-4">
                            <ImdbBtn
                                src={`https://www.imdb.com/title/${externalIds?.imdb_id}/episodes/?season=${season?.season_number}`}
                                className={`mr-3`}
                            />
                            {trailer && <TrailerBtn trailer={trailer} />}
                        </div>
                    )}
                </div>
            </div>
            {/* season overview */}
            {fullText && (
                <>
                    <h2 className="sfhd:text-4xl xl:text-3xl text-xl mb-3 mt-4">
                        Описание сезона
                    </h2>
                    <ToggleOverview fullText={fullText} className={``}>
                        <div className="flex justify-start sfhd:mt-5 mt-4">
                            <ImdbBtn
                                src={`https://www.imdb.com/title/${externalIds?.imdb_id}/episodes/?season=${season?.season_number}`}
                                className={`mr-3`}
                            />
                            {trailer && <TrailerBtn trailer={trailer} />}
                        </div>
                    </ToggleOverview>
                </>
            )}
            <div className="mt-10 mb-3">
                <h1 className="text-[2.5rem] leading-[2.8rem] text-secondary">
                    Сезоны
                </h1>
                {/* Спецматериалы */}
                {/* {movieInfo?.seasons && movieInfo.seasons[0].name === "Спецматериалы" ? 
                    <span 
                        className="" 
                        onClick={() => {
                            handleClick(movieInfo.seasons[0].season_number)
                        }}
                    >
                        Спецматериалы
                    </span> 
                : ''} */}
                
                {/* seasons */}
                <ul className="flex mt-5 pb-2 overflow-x-auto season_scroll">
                    {movieInfo?.seasons?.map((item) => {
                        return item.name === "Спецматериалы" ? (
                            ""
                        ) : (
                            <li
                                key={item.id}
                                className={`sfhd:text-5xl sfhd:px-[2.2rem] sfhd:py-5 xl:px-[1.7rem] xl:py-3 px-4 py-1 text-white xl:text-4xl text-xl cursor-pointer rounded-full ${
                                    +sNumber === item.season_number
                                        ? "bg-secondary"
                                        : ""
                                }`}
                                onClick={() => {
                                    handleClick(item.season_number);
                                }}
                            >
                                {item.season_number}
                            </li>
                        );
                    })}
                </ul>
                {/* episodes */}
                <div className="mt-5" ref={ref}>
                    <ul className="flex flex-col gap-5 [&_li:not(:last-child)]:border-b">
                        {displayedEpisodes?.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className="xl:pb-6 pb-4 border-b-secondary/30"
                                >
                                    <div className="flex ss:flex-row flex-col gap-3 px-1">
                                        <Link
                                            to={`/movie/${movieInfo.id}/season/${season.season_number}/episode/${item.episode_number}`}
                                            state={{
                                                episode: item,
                                                poster: season.poster_path,
                                            }}
                                            className="h-full group"
                                            onClick={() => {
                                                setLocalStorageItem("tvImdbId", externalIds.imdb_id);
                                                setLocalStorageItem("poster", season.poster_path);
                                            }}
                                        >
                                            <div className="relative ss:flex-1 ss:w-full fhd:h-[250px] xl:h-[200px] lg:h-[150px] sm:h-[130px] ss:h-[120px] xs:h-[250px] min-w-[170px] min-h-[95px] ring-1  ring-secondary rounded-xl shadow-secondary shadow-[0_0_5px_0px_var(--tw-shadow-color)]">
                                                {inView ? (
                                                    <Poster
                                                        src={`https://image.tmdb.org/t/p/original${
                                                            item.still_path
                                                                ? item.still_path
                                                                : season.poster_path
                                                        }`}
                                                        alt={`${item.name}`}
                                                        className={`rounded-xl aspect-video group-hover:opacity-70 transition-opacity duration-300 ${
                                                            !item.still_path
                                                                ? "object-top"
                                                                : ""
                                                        }`}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </Link>
                                        <div className="sm:flex-[3_1_0%] ss:flex-2">
                                            <div className="flex ss:flex-row flex-col mb-3">
                                                <Link
                                                    to={`/movie/${movieInfo.id}/season/${season.season_number}/episode/${item.episode_number}`}
                                                    onClick={() => {
                                                        setLocalStorageItem("tvImdbId",externalIds.imdb_id);
                                                        setLocalStorageItem("poster",season.poster_path );
                                                    }}
                                                    className="ss:flex-2 group"
                                                    state={{
                                                        episode: item,
                                                        poster: season.poster_path,
                                                    }}
                                                >
                                                    <h1 className="xl:text-3xl text-lg font-[600] group-hover:opacity-70 transition-opacity duration-300">
                                                        {`S${item.season_number}. E${item.episode_number} • ${item.name}`}
                                                    </h1>
                                                </Link>
                                                {item.air_date && (
                                                    <p className="ss:flex-1 sfhd:text-3xl xl:text-2xl text-dimWhite">{`${getPremierDate(
                                                        item.air_date
                                                    )}`}</p>
                                                )}
                                            </div>
                                            {item?.overview ? (
                                                <ToggleOverview
                                                    fullText={item.overview}
                                                    textSymbols={100}
                                                    className={`mb-2`}
                                                />
                                            ) : ("")
                                            }
                                            {item?.vote_average ? (
                                                <VoteRating vote={item.vote_average} />
                                            ) : ("")
                                            }
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {/* load more and all buttons */}
                    {displayedEpisodes.length !== episodes.length ? (
                        <div className="flex flex-col items-start">
                            <p>
                                Загрузить:{" "}
                                <button
                                    className="text-secondary"
                                    onClick={() => showMore()}
                                >
                                    +30
                                </button>{" "}
                                •{" "}
                                <button
                                    className="text-secondary"
                                    onClick={() => showAll()}
                                >
                                    Все
                                </button>
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* next and prev seasons button */}
                    <div className="flex justify-center gap-6 h-9">
                        {console.log(totalSeasons)}
                        {seasonNumber > 1 ? (
                            <button
                            className="flex items-center pl-1 pr-4 rounded-[8px] hover:bg-secondary/10 active:bg-secondary/20 transition-colors duration-300"
                            onClick={() => handleClick(+seasonNumber - 1)}
                        >
                            <IconArrowForward
                                className="rotate-180"
                                fill="#f0761d"
                            />
                            <span className="text-secondary text-lg">{+seasonNumber - 1}</span>
                            
                        </button>
                        ) : ''}

                        {seasonNumber < totalSeasons ? (
                            <button
                                className="flex items-center pl-4 pr-1 rounded-[8px] hover:bg-secondary/10 active:bg-secondary/20 transition-colors duration-300"
                                onClick={() => handleClick(+seasonNumber + 1)}
                            >
                                <span className="text-secondary text-lg">{+seasonNumber + 1}</span>
                                <IconArrowForward
                                    fill="#f0761d"
                                />
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvEpisodesInfo;
