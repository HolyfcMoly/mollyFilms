import React, { useEffect, useState } from "react";
import BackButton from "../components/ui/BackButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getEpisodeExternalIds, getEpisodeInfo } from "../services/api";
import Poster from "../components/ui/Poster";
import ImdbBtn from "../components/ui/ImdbBtn";
import VoteRating from "../components/ui/VoteRating";
import { convertRuntime, filteredJob, getPremierDate } from "../utils";
import CrewItem from "../components/CrewItem";
import ImageSlider from "../components/ImageSlider";
import Modal from "../components/ui/Modal";
import { close } from "../assets";

const EpisodeInfo = () => {
    const { id, number, count } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { episode } = location.state || [];
    const [episodeInfo, setEpisodeInfo] = useState([]);
    const [episodeImgAndVideo, setEpisodeImgAndVideo] = useState([]);
    const [externalId, setExternalId] = useState([]);
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const time = convertRuntime(episodeInfo.runtime);

    const director = filteredJob(episodeInfo.crew, "Directing", "department").slice(0, 10);
    const producer = filteredJob(episodeInfo.crew, "Production", "department").slice(0, 10);
    const operator = filteredJob(episodeInfo.crew, "Camera", "department").slice(0, 10);
    const writer = filteredJob(episodeInfo.crew, "Writing", "department").slice(0, 10);

    console.log(episodeInfo)
    console.log(episodeImgAndVideo)
    console.log(slideIndex)

    const openModal = () => {
        setOpen(true)
    }

    useEffect(() => {
        if (!episode) {
            getEpisodeInfo(id, number, count).then((data) => {
                data && setEpisodeInfo(data.data);
            });
        } else {
            setEpisodeInfo(episode);
        }
        getEpisodeInfo(id, number, count, true).then((data) => {
            data?.data &&
                setEpisodeImgAndVideo({
                    images:data.data.images,
                    video:data.data.videos,
                });
        });
            getEpisodeExternalIds(id,number,count).then((data) => {
                data?.data && setExternalId(data.data);
            });
    }, [id, number, episode, count]);

    return (
        <div>
            <div className="pb-6 pl-1 flex justify-self-center gap-4">
                <BackButton
                    className={`flex items-center sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`}
                />
                <button
                    className={`block pr-4 pl-2 py-2 bg-transparent text-secondary group hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors sfhd:text-2xl xl:text-lg text-base`}
                    onClick={() => {
                        navigate(`/movie/${id}/season/${number}`, {
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
                            src={`https://image.tmdb.org/t/p/original${
                                episodeInfo.still_path
                                    ? episodeInfo.still_path
                                    : ''
                            }`}
                            alt={""}
                            className={"rounded-xl"}
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
                    <p className="sfhd:text-2xl xl:text-xl sfhd:mb-4 mb-1">{`Премьера  ${getPremierDate(episodeInfo.air_date)}`} • {`S${number}.E${count}`} • {time}</p>
                    {episodeInfo.vote_average !== 0 && (
                        <VoteRating vote={episodeInfo.vote_average}/>
                    )}
                    <div className="flex justify-start sfhd:mt-5 mt-4">
                        <ImdbBtn
                            src={`https://www.imdb.com/title/${externalId?.imdb_id}/?ref_=ttep_ep${count}`}
                            className={`mr-3`}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <p>{episodeInfo.overview}</p>
                <ul>
                    {director.length > 0 && <CrewItem crew={director} job={'Режиссёр'}/>}
                    {producer.length > 0 && <CrewItem crew={producer} job={'Продюсер'}/>}
                    {writer.length > 0 && <CrewItem crew={writer} job={'Сценарист'}/>}
                    {operator.length > 0 && <CrewItem crew={operator} job={'Оператор'}/>}
                </ul>
            </div>
            {episodeImgAndVideo?.images?.stills && (
                <>
                    <div className="mt-5">
                        <h1 className="text-[2.5rem] leading-[2.8rem] text-secondary">Галерея</h1>
                        <ImageSlider content={episodeImgAndVideo} showModal={openModal} setSlideIndex={setSlideIndex}/>
                    </div>
                    <Modal openIn={open} modalClass={'image-slider-modal'} containerClass={`fixed inset-0`}>
                        <div>
                            <button
                                className="absolute right-0  top-0 ss:h-auto ss:w-auto h-6 w-6"
                                onClick={(e) => {
                                    setOpen(!open);
                                    e.stopPropagation();
                                }}
                            >
                                <img src={close} />
                            </button>
                            <ImageSlider content={episodeImgAndVideo} show={false} slideIndex={slideIndex}/>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default EpisodeInfo;
