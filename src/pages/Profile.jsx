import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import { getMovieByProfileId, getProfile } from "../services/api";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import BackButton from "../components/ui/BackButton";
import { getFullAge, getStringAge } from "../utils";
import Poster from "../components/ui/Poster";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState([]);
    const [moviesPerPage] = useState(12);

    const pages = Math.round(movies.length / moviesPerPage);
    const { id } = useParams();
    const age = getStringAge(getFullAge(profile.birthday));

    useEffect(() => {
        getProfile(id).then((data) => {
            setProfile(data.data);
            console.log(data.data);
        });
        getMovieByProfileId(id).then((data) => {
            setMovies(data.data.cast);
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
                        {profile.profile_path && (
                            <Poster
                                src={`https://image.tmdb.org/t/p/original${profile.profile_path}`}
                                alt={""}
                                className={"rounded-xl float-left"}
                            />
                        )}
                    </div>
                    <div className="flex flex-1 items-center text-center flex-col">
                        <h1 className="xl:text-5xl text-3xl mb-3">{profile.name}</h1>
                        <div className="text-center mb-3">
                            <p className="xl:text-3xl text-lg">{profile.known_for_department}</p>
                            <p className="xl:text-3xl text-base">{`(${age})`}</p>
                        </div>
                        <div className="mt-3 text-left">
                            <p className="xl:text-2xl">{profile.biography}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-[2rem]">
                    {totalMovies && (
                        <MovieList
                            movie={totalMovies}
                            genre={"Принимал участие"}
                            setSlide={false}
                        />
                    )}
                    <Pagination
                        setPage={setPage}
                        currentPage={page}
                        totalPages={pages}
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
