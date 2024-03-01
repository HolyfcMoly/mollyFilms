import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getMovieByProfileId,
    getPersonImages,
    getProfile,
    getTvByProfileId,
} from "../services/api";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import BackButton from "../components/ui/BackButton";
import { getFullAge, getStringDeclination } from "../utils";
import Poster from "../components/ui/Poster";
import { avatar } from "../assets";
import useTextToggle from "../hooks/useTextToggle";
import { excludeGenres } from "../assets/icons/genres";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState([]);
    const [moviesPerPage] = useState(12);
    const [expand, setExpand] = useState(false);
    const [profileImages, setProfileImages] = useState([]);

    const { id } = useParams();
    const fullText = profile.biography || "";
    const pages = Math.round(movies.length / moviesPerPage);
    const age = getStringDeclination(getFullAge(profile.birthday), "год");
    const [text, toggleText] = useTextToggle(fullText);
    const images = profileImages.map((item) => item.file_path);

    const getRandomImg = (images) => {
        return images[Math.floor(Math.random() * images.length)];
    };

    useEffect(() => {
        getProfile(id).then((data) => {
            setProfile(data.data);
        });
        Promise.all([getMovieByProfileId(id), getTvByProfileId(id)]).then(
            ([movie, tv]) => {
                if (movie?.data?.cast && tv?.data?.cast) {
                    const allFilms = [...movie.data.cast, ...tv.data.cast]
                        .filter((genre) => {
                            return !genre.genre_ids.some((id) =>
                                excludeGenres.includes(id)
                            );
                        })
                        .sort((a, b) => b.popularity - a.popularity);
                    setMovies(allFilms);
                }
            }
        );
        getPersonImages(id).then((data) => {
            setProfileImages(data.data.profiles);
        });
    }, [id]);

    useEffect(() => {
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        setTotalMovies(movies.slice(startIndex, endIndex));
    }, [movies, moviesPerPage, page]);

    return (
        <>
            <div>
                <div className="pb-6">
                    <BackButton className={`flex items-center mt-1`} />
                </div>
                <div className="flex sm:flex-row flex-col flex-wrap sm:items-start items-center">
                    <div className="relative sfhd:w-[650px] float-left sfhd:h-[920px] xl:w-[450px] xl:h-[720px] sm:w-[350px] sm:h-[550px] w-[260px] h-[380px] sm:mb-0 sm:mr-8 mb-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                        <Poster
                            src={
                                images.length
                                    ? `https://image.tmdb.org/t/p/original${getRandomImg(
                                        images
                                    )}`
                                    : profile.profile_path
                                    ? `https://image.tmdb.org/t/p/original${profile.profile_path}`
                                    : `${avatar}`
                            }
                            alt={""}
                            className={"rounded-xl float-left"}
                        />
                    </div>
                    <div className="flex flex-1 items-center text-center flex-col">
                        <h1 className="xl:text-5xl text-3xl mb-3">
                            {profile.name}
                        </h1>
                        <div className="text-center mb-3">
                            <p className="xl:text-3xl text-lg">
                                {profile.known_for_department}
                            </p>
                            {age && (
                                <p className="xl:text-3xl text-base">{`(${age})`}</p>
                            )}
                        </div>
                        {profile.biography && (
                            <div className="mt-3 text-left">
                                <p className={`xl:text-2xl`}>{text}</p>
                                {text.length > 550 && (
                                    <button
                                        onClick={() => {
                                            setExpand(!expand);
                                            toggleText();
                                        }}
                                        className="text-dimWhite mt-2"
                                    >
                                        {!expand
                                            ? "Показать полностью"
                                            : "Скрыть"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-[2rem]">
                    {totalMovies.length ? (
                        <>
                            <MovieList
                                movie={totalMovies}
                                genre={"Принимал участие"}
                                setSlide={false}
                            />
                            <Pagination
                                setPage={setPage}
                                currentPage={page}
                                totalPages={pages}
                            />
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
