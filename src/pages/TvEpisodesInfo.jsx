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
import { getPremierDate } from "../utils";

const TvEpisodesInfo = () => {
    const { id, number } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [season, setSeason] = useState([]);
    const location = useLocation();
    const [movieInfo, setMovieInfo] = useState([]);
    const { movie } = location.state || [];
    const [trailer, setTrailer] = useState([]);
    const [seasonNumber, setSeasonNumber] = useState(number);
    const [externalIds, setExternalIds] = useState({});
    const navigate = useNavigate();
    const fullText = season.overview || "";

    const { ref, inView } = useInView({
        threshold: 0.7,
        triggerOnce: true,
    });

    const handleClick = (season) => {
        setSeasonNumber(season);
        navigate(`/movie/${id}/season/${season}`, { state: { movieInfo } });
    };

    useEffect(() => {
        setSeasonNumber(number);
        if (!movie) {
            getSeries(id).then((data) => {
                data && setMovieInfo(data.data);
            });
        } else {
            setMovieInfo(movie);
        }
        getTvSeriesEpisode(id, seasonNumber).then((data) => {
            data?.data && setSeason(data.data);
            data?.data?.episodes && setEpisodes(data.data.episodes);
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
    }, [id, seasonNumber, number, movie]);

    useEffect(() => {
        // console.log(movieInfo, 'movieInfo')
        console.log(season, 'season')
        console.log(episodes, 'episodes')
    }, [season, episodes]);
    return (
        <div className="flex flex-col">
            <div className="pb-6 pl-1 flex justify-self-center gap-4">
                <BackButton
                    className={`flex items-center sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`}
                />
                <button
                    className={`block pr-4 pl-2 py-2 bg-transparent text-secondary group hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors sfhd:text-2xl xl:text-lg text-base`}
                    onClick={() => {
                        navigate(`/movie/${id}`, {
                            state: { media_type: "tv" },
                        });
                    }}
                >
                    К сериалу
                </button>
            </div>
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
                    <p className="sfhd:text-3xl xl:text-2xl text-lg sfhd:mb-4 mb-1">{season.name}</p>
                    <p className="sfhd:text-2xl xl:text-xl sfhd:mb-4 mb-1">{`Премьера • ${getPremierDate(season.air_date)}`}</p>
                    {season.vote_average !== 0 && (
                        <VoteRating vote={season.vote_average}/>
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
            {fullText && (
                <>
                    <h2 className="sfhd:text-4xl xl:text-3xl text-xl mb-3 mt-4">
                        Описание сезона
                    </h2>
                    <ToggleOverview
                        fullText={fullText}
                        className={``}
                    >
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
                <ul className="flex mt-5 pb-2 overflow-x-auto">
                    {movieInfo?.seasons?.map((item) => {
                        return item.name === "Спецматериалы" ? (
                            ""
                        ) : (
                            <li
                                key={item.id}
                                className={`sfhd:text-5xl sfhd:px-[2.2rem] sfhd:py-5 xl:px-[1.7rem] xl:py-3 px-4 py-1 text-white xl:text-4xl text-xl cursor-pointer rounded-full ${
                                    +number === item.season_number
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
                        {episodes?.map((item) => {
                            return (
                                <li key={item.id} className="xl:pb-6 pb-4 border-b-secondary/30">
                                    <div className="flex ss:flex-row flex-col gap-3 px-1">
                                    <Link to={`/movie/${movieInfo.id}/season/${season.season_number}/episode/${item.episode_number}`}
                                    state={{episode: item, externalIds: externalIds}}>
                                        <div className="relative ss:flex-1 ss:w-full fhd:h-[250px] xl:h-[200px] lg:h-[150px] sm:h-[130px] ss:h-[120px] xs:h-[250px] min-w-[170px] min-h-[95px] ring-1  ring-secondary rounded-xl shadow-secondary shadow-[0_0_5px_0px_var(--tw-shadow-color)]">
                                            {inView ? (
                                                <Poster
                                                    src={`https://image.tmdb.org/t/p/original${item.still_path ? item.still_path : ''}`}
                                                    alt={`${item.name}`}
                                                    className={"rounded-xl aspect-video"}
                                                />
                                            ) : ''} 
                                        </div>
                                    </Link>
                                        <div className="sm:flex-[3_1_0%] ss:flex-2">
                                            <div className="flex ss:flex-row flex-col mb-3">
                                            <Link to={`/movie/${movieInfo.id}/season/${season.season_number}/episode/${item.episode_number}`}
                                            className="ss:flex-2" state={{episode: item, externalIds: externalIds}}>
                                                <h1 className="xl:text-3xl text-lg font-[600]">{`S${item.season_number}. E${item.episode_number} • ${item.name}`}
                                                </h1>
                                            </Link>
                                                {item.air_date && (
                                                    <p className="ss:flex-1 sfhd:text-3xl xl:text-2xl text-dimWhite">{`${getPremierDate(item.air_date)}`}</p>
                                                )}
                                            </div>
                                            {item.overview && (
                                                <ToggleOverview
                                                    fullText={item.overview}
                                                    textSymbols={100}
                                                    className={`mb-2`}
                                                />
                                            )}
                                            {item.vote_average && (
                                                    <VoteRating vote={item.vote_average}/>
                                                )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TvEpisodesInfo;
