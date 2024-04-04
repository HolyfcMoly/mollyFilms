import React, { memo } from "react";
import { useInView } from "react-intersection-observer";
import Poster from "./ui/Poster";
import { Link } from "react-router-dom";
import ToggleOverview from "./ToggleOverview";
import VoteRating from "./ui/VoteRating";
import { getPremierDate, setLocalStorageItem } from "../utils";

const EpisodeCard = memo(({item, movieInfo, season, externalIds}) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });
    
    return (
        <div ref={ref}>
            {inView ? (
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
                            <Poster
                                src={`https://image.tmdb.org/t/p/w500${
                                    item.still_path
                                        ? item.still_path
                                        : season.poster_path
                                }`}
                                alt={`${item.name}`}
                                className={`rounded-xl aspect-video group-hover:opacity-70 transition-opacity duration-300 ${
                                    !item.still_path ? "object-top" : ""
                                }`}
                            />
                    </div>
                </Link>
                <div className="sm:flex-[3_1_0%] ss:flex-2">
                    <div className="flex ss:flex-row flex-col mb-3">
                        <Link
                            to={`/movie/${movieInfo.id}/season/${season.season_number}/episode/${item.episode_number}`}
                            onClick={() => {
                                setLocalStorageItem(
                                    "tvImdbId",
                                    externalIds.imdb_id
                                );
                                setLocalStorageItem(
                                    "poster",
                                    season.poster_path
                                );
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
                    ) : (
                        ""
                    )}
                    {item?.vote_average ? (
                        <VoteRating vote={item.vote_average} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            ) : ''}
        </div>
    );
});
EpisodeCard.displayName = "EpisodeCard";
export default EpisodeCard;
