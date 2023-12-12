import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import { getMovieByProfileId, getProfile } from "../api";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

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
            console.log(data.data.cast)
            setMovies(data.data.cast)
        })
    }, [id]);

    useEffect(() => {
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        setTotalMovies(movies.slice(startIndex, endIndex))

    }, [movies, moviesPerPage, page]);

    return (
        <>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w200${profile.profile_path}`}
                    alt=""
                />
                <p>{profile.name}</p>
            </div>
            <div className="text-center mt-[2rem]">
                <h1 className="text-[3rem]">Movies</h1>
                
                {totalMovies && <MovieList movie={totalMovies }/>}
                
            <Pagination 
                setPage={setPage}
                currentPage={page}
                totalPages={pages}
            />
            </div>
        </>
    );
};

export default Profile;
