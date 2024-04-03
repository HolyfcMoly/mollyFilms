import React, { useEffect, useState } from "react";
import BackButton from "../components/ui/BackButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getEpisodeCredits, getEpisodeExternalIds, getEpisodeInfo } from "../services/api";
import Poster from "../components/ui/Poster";
import ImdbBtn from "../components/ui/ImdbBtn";
import VoteRating from "../components/ui/VoteRating";
import { convertRuntime, filterDuplicates, filteredJob, getPremierDate } from "../utils";
import CrewItem from "../components/CrewItem";
import ImageSlider from "../components/ImageSlider";
import Modal from "../components/ui/Modal";
import { close } from "../assets";
import CastCard from "../components/CastCard";
import ProfileSlider from "../components/ProfileSlider";
import ToggleOverview from "../components/ToggleOverview";

const EpisodeInfo = () => {
    const { id, sNumber, eNumber } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { episode, poster } = location.state || [];

    const [episodeInfo, setEpisodeInfo] = useState([]);
    const [episodeImgAndVideo, setEpisodeImgAndVideo] = useState([]);
    const [externalId, setExternalId] = useState([]);
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [cast, setCast] = useState([]);

    const externalIds = localStorage.getItem('tvImdbId');
    const time = convertRuntime(episodeInfo.runtime);
    const posterImg = poster || localStorage.getItem('poster');
    const director = filteredJob(episodeInfo.crew, "Directing", "department").slice(0, 10);
    const producer = filteredJob(episodeInfo.crew, "Production", "department").slice(0, 10);
    const operator = filteredJob(episodeInfo.crew, "Camera", "department").slice(0, 10);
    const writer = filteredJob(episodeInfo.crew, "Writing", "department").slice(0, 10);
    const fullText = episodeInfo.overview || '';

    const openModal = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (!episode) {
            getEpisodeInfo(id, sNumber, eNumber).then((data) => {
                data?.data && setEpisodeInfo(data.data);
            });
        } else {
            setEpisodeInfo(episode);
        }
        getEpisodeInfo(id, sNumber, eNumber, true).then((data) => {
            data?.data &&
                setEpisodeImgAndVideo({
                    images:data.data.images,
                    video:data.data.videos,
                });
        });
        getEpisodeExternalIds(id,sNumber,eNumber).then((data) => {
            if(data?.data?.imdb_id) {
                setExternalId(data.data);
            } else {
                setExternalId({imdb_id: externalIds});
            }
        });
        getEpisodeCredits(id,sNumber,eNumber).then(data => {
            if(data?.data?.cast && data?.data?.guest_stars) {
                const credits = filterDuplicates([...data.data.cast, ...data.data.guest_stars]);
                setCast(credits)
            }
        })
    }, [id, sNumber, episode, eNumber, externalIds]);

    return (
        <div>
            {/* Buttons */}
            <div className="pb-6 pl-1 flex justify-self-center gap-4">
                <BackButton
                    className={`flex items-center sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`}
                />
                <button
                    className={`block pr-4 pl-2 py-2 bg-transparent text-secondary group hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors sfhd:text-2xl xl:text-lg text-base`}
                    onClick={() => {
                        navigate(`/movie/${id}/season/${sNumber}`, {
                            state: { media_type: "tv" },
                        });
                    }}
                >
                    К сериалу
                </button>
            </div>
            <div className="flex items-start xl:px-6 px-1">
                <div className="relative sfhd:w-[385px] sfhd:h-[570px] xl:w-[300px] xl:h-[450px] sm:w-[220px] sm:h-[350px] w-[100px] h-[150px] mr-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                    {episodeInfo && (
                        <Poster
                            src={`https://image.tmdb.org/t/p/w500${
                                episodeInfo.still_path
                                    ? episodeInfo.still_path
                                    : posterImg
                            }`}
                            alt={episodeInfo.name}
                            className={`rounded-xl`}
                        />
                    )}
                </div>
                {/* overview */}
                <div>
                    <h1 className="xl:text-5xl text-3xl sfhd:mb-4 mb-2">
                        {episodeInfo?.name || ""}

                        {episodeInfo?.release_date &&
                            `(${episodeInfo.release_date.slice(0, 4)})`}
                    </h1>
                    <p className="sfhd:text-2xl xl:text-xl sfhd:mb-4 mb-1">
                    {`${episodeInfo.air_date ? `Премьера ${getPremierDate(episodeInfo.air_date)} •` : ''} S${sNumber}.E${eNumber} ${time ? `• ${time}` : ''}`}</p>
                    {episodeInfo.vote_average !== 0 && (
                        <VoteRating vote={episodeInfo.vote_average}/>
                    )}
                    <ul className="mt-4">
                        {director.length > 0 && <CrewItem crew={director} job={'Режиссёр'}/>}
                        {producer.length > 0 && <CrewItem crew={producer} job={'Продюсер'}/>}
                        {writer.length > 0 && <CrewItem crew={writer} job={'Сценарист'}/>}
                        {operator.length > 0 && <CrewItem crew={operator} job={'Оператор'}/>}
                    </ul>
                    <div className="flex justify-start sfhd:mt-5 mt-4">
                        <ImdbBtn
                            src={`https://www.imdb.com/title/${externalId?.imdb_id}/?ref_=ttep_ep${eNumber}`}
                            className={`mr-3`}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <ToggleOverview fullText={fullText} textSymbols={400} textClass={`text-lg`}/>
            </div>
            {/* Gallery */}
            {episodeImgAndVideo?.images?.stills && episodeImgAndVideo.images.stills.length ? (
                <>
                    <div className="mt-5">
                        <h1 className="text-[2.5rem] leading-[2.8rem] text-secondary">Галерея</h1>
                        <ImageSlider content={episodeImgAndVideo} showModal={openModal} setSlideIndex={setSlideIndex}/>
                    </div>
                    <Modal openIn={open} modalClass={'image-slider-modal'} containerClass={`fixed inset-0`}>
                        <div
                            className={`fixed inset-0 flex items-center z-[-1] bg-black/70`}
                        ></div>
                        <div className="absolute top-1/2 left-1/2 flexCenter -translate-y-1/2 -translate-x-1/2 sm:w-4/5 w-11/12 max-w-4/5 max-h-4/5">
                            <div className="w-full h-full flexCenter">
                                <button
                                    className="absolute sm:right-0 z-10 sfhd:-top-1 sm:top-2 top-0 right-4 sfhd:h-12 sfhd:w-12 ss:h-auto ss:w-auto h-6 w-6"
                                    onClick={(e) => {
                                        setOpen(!open);
                                        e.stopPropagation();
                                    }}
                                >
                                    <img src={close} className="w-full h-full object-cover"/>
                                </button>

                                <ImageSlider content={episodeImgAndVideo} show={false} slideIndex={slideIndex} containerClass={`slider py-0`}/>
                            </div>
                        </div>
                    </Modal>
                </>
            ) : ''}
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
        </div>
    );
};

export default EpisodeInfo;
