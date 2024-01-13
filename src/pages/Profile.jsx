import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import { getMovieByProfileId, getProfile } from "../services/api";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import BackButton from "../components/ui/BackButton";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [movies, setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState([])
    const [moviesPerPage] = useState(12);

    const pages = Math.round(movies.length / moviesPerPage);
    const { id } = useParams();

    useEffect(() => {
        getProfile(id).then((data) => {
            setProfile(data.data);
            // console.log(data.data);
        });
        getMovieByProfileId(id).then(data => {
            console.log(data.data.cast, 'cast')
            setMovies(data.data.cast)
        })
    }, [id]);

    useEffect(() => {
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        setTotalMovies(movies.slice(startIndex, endIndex))

    }, [movies, moviesPerPage, page]);

    return (
        <><div>
            <BackButton className={`my-1`}/>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w200${profile.profile_path}`}
                    alt=""
                />
                <p>{profile.name}</p>
            </div>
            <div className="mt-[2rem]">
                {totalMovies && <MovieList movie={totalMovies} genre={'Похожие'} setSlide={false}/>}
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
