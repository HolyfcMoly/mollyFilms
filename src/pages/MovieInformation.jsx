import React, { useEffect, useState } from "react";
import { getCredits, getMovie, getMovieTrailer, getRecomendMovies } from "../services/api";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import BackButton from "../components/ui/BackButton";
import ProfileSlider from "../components/ProfileSlider";
import Poster from "../components/ui/Poster";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { convertRuntime } from "../utils";
import { genreAndCategoriesIcons } from "../assets/icons/genres";
import ImdbBtn from "../components/ui/ImdbBtn";
import TrailerBtn from "../components/ui/TrailerBtn";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#eaa800",
    inactiveFillColor: "#7d7d7d",
};

const MovieInformation = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [credits, setCredits] = useState([]);
    const [video, setVideo] = useState([]);
    const [trailerVideo, setTrailerVideo] = useState([]);
    const genres = movie.genres || [];
    const runtime = convertRuntime(movie.runtime);


    useEffect(() => {
        getMovie(id).then((data) => {
            setMovie(data.data);
        });
        getRecomendMovies(id).then((data) => {
            setMovies(data.data.results);
        });
        getCredits(id).then((data) => {
            setCredits(data.data.cast);
        });
        getMovieTrailer(id).then((data) => {
            setVideo(data.data.results)
        })
    }, [id]);

    useEffect(() => {
        const trailers = video.filter(item => item.type === 'Trailer')
        setTrailerVideo(trailers)
    },[video])

    return (
        <>
            <div className="flex flex-col">
                <div className="pb-6">
                    <BackButton className={`flex items-center mt-1 sfhd:pl-4 sfhd:pr-6 sfhd:py-4 xl:pl-3 xl:pr-5 xl:py-3`} />
                </div>
                <div className="flex sm:flex-row flex-col sm:items-start items-center justify-between xl:px-6">
                    <div className="relative sfhd:w-[650px] sfhd:h-[920px] xl:w-[450px] xl:h-[720px] sm:w-[350px] sm:h-[550px] w-[260px] h-[380px] sm:mb-0 sm:mr-8 mb-4 ring-1 ring-secondary rounded-xl shadow-secondary shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                        {movie.poster_path && (
                            <Poster
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={""}
                                className={"rounded-xl"}
                            />
                        )}
                    </div>

                    <div className="xl:w-[] sm:w-[50%] flex flex-col justify-between">
                        <div>
                            <div className="text-center mb-10">
                                <h1 className="xl:text-5xl text-3xl mb-3">
                                    {movie.title}(
                                    {movie.release_date
                                        ? movie.release_date.slice(0, 4)
                                        : movie.release_date}
                                    )
                                </h1>
                                <p className="xl:text-3xl text-base">{movie.tagline}</p>
                            </div>
                            <div className="flex justify-center space-x-3 xl:genre-icons-xl genre-icons mb-10">
                                {genres.map((item) => {
                                    return (
                                        <div key={item.id} className="flex items-center ">
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
                            <div className="flex justify-between mb-10">
                                <div className="flex">
                                    <span className="xl:text-2xl mr-3">
                                        {movie.vote_average
                                            ? movie.vote_average.toFixed(1)
                                            : movie.vote_average}
                                    </span>
                                    <Rating
                                        readOnly
                                        value={movie.vote_average / 2}
                                        itemStyles={myStyles}
                                        className="xl:max-w-[150px] max-w-[100px]"
                                    />
                                </div>
                                <p className="xl:text-2xl">{runtime}</p>
                            </div>
                            
                            <div>
                                <h2 className="xl:text-4xl text-xl mb-3">Описание</h2>
                                <p className="xl:text-2xl">{movie.overview}</p>
                            </div>
                        </div>
                            <div className="flex  mt-10">
                                <ImdbBtn src={`https://www.imdb.com/title/${movie.imdb_id}`}/>
                                {trailerVideo && (<TrailerBtn trailer={trailerVideo} />)}
                            </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1.5">
                    <div className="">
                        {!credits.length ? (
                            ""
                        ) : (
                            <ProfileSlider credits={credits} />
                        )}
                    </div>
                </div>
                <div>
                    {!movies.length ? (
                        ""
                    ) : (
                        <MovieList
                            movie={movies}
                            genre={"Рекомендуем также"}
                            setSlide={false}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default MovieInformation;
