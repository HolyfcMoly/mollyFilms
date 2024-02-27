import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovieByQuerySearch, getMultiSearchByQuery } from "../services/api";
import ImgPreLoader from "./ui/ImgPreLoader";
import { search, serial } from "../assets";
import useResize from "../hooks/useResize";
import { clickOutSide, filteredJob } from "../utils";
import Modal from "./ui/Modal";
import IconArrowForward from "../assets/icons/IconArrowForward";

const Search = ({ className }) => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();
    const timeoutInputRef = useRef(null);
    const inputRef = useRef(null);
    const width = useResize();

    const searchedMovies = filteredJob(movies,'movie', 'media_type').slice(0, 5);
    const searchedSeries = filteredJob(movies,'tv','media_type').slice(0, 5);
    const searchedActors = filteredJob(movies, "Acting", "known_for_department");
    const moviesAndSeries = [...searchedMovies, ...searchedSeries].sort((a,b) => (
        b.popularity - a.popularity
    ));

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            navigate("/", { state: { query: query, genre: `Результаты поиска`, search: true } });
            setQuery("");
            setOpen(false);
        }
    };

    const handleReset = (e) => {
        setOpen(false);
        setQuery("");
        e.stopPropagation();
    };

    useEffect(() => {
        setIsMobile(false);
        if (width < 620) setIsMobile(true);
    }, [width, isMobile]);

    useEffect(() => {
        if (open || query) {
            inputRef.current.focus();
            setOpen(true);
            document.addEventListener("click", (e) => {
                clickOutSide(e, inputRef, handleReset);
            });
            return () => document.removeEventListener("click", clickOutSide);
        }
    }, [open, query]);

    useEffect(() => {
        document.body.classList.remove("overflow-hidden");
        if (timeoutInputRef) {
            clearInterval(timeoutInputRef.current);
        }
        if (query) {
            timeoutInputRef.current = setTimeout(() => {
                getMultiSearchByQuery(query, 1).then((data) => {
                    setMovies(data.data.results);
                });
            }, 700);
            document.body.classList.add("overflow-hidden");
        }
    }, [query]);

    return (
        <>
            <div className={`${className} min-h-[30px] `}>
                {isMobile ? (
                    <>
                        <input
                            onKeyDown={(e) => handleKeyPress(e)}
                            type="search"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                            placeholder="Search"
                            ref={inputRef}
                            className={`xs:w-[70%] w-[50%] fixed ss:top-0 left-[20px] transition-[top] ease-in-out duration-300 ${
                                open ? "top-3" : "-top-[10rem]"
                            }  focus:outline-none rounded-[5px] ring-secondary focus-visible:ring-1 sfhd:py-2 px-2 py-[2px] caret-secondary sfhd:text-2xl text-white`}
                        />
                        <button
                            className="block ss:hidden"
                            onClick={(e) => {
                                setOpen(!open);
                                setQuery("");
                                e.stopPropagation();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                className={`w-[24px] h-full fill-secondary object-cover transition-transform duration-300 ${
                                    open ? "scale-100" : "scale-0"
                                }`}
                            >
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                            </svg>
                            <img
                                src={search}
                                alt="search"
                                className={`absolute top-0 w-[24px] h-full object-cover transition-transform duration-300 ${
                                    !open ? "scale-100" : "scale-0"
                                }`}
                            />
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            onKeyDown={(e) => handleKeyPress(e)}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            ref={inputRef}
                            className={`w-full focus:outline-none rounded-[5px] ring-secondary focus-visible:ring-1 sfhd:py-2 px-2 py-[2px] caret-secondary sfhd:text-2xl text-white`}
                        />
                        {query && (
                            <button
                                className="ml-3"
                                onClick={(e) => {
                                    handleReset(e);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 50 50"
                                    className={`w-[24px] h-full fill-secondary object-cover transition-transform duration-300 ${
                                        query ? "scale-100" : "scale-0"
                                    }`}
                                >
                                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>
            <Modal
                openIn={open}
                modalClass={"search-modal"}
                containerClass={`fixed`}
            >
                <div className="fixed sfhd:top-[5.5rem] top-[3.5rem] left-0  h-[70dvh] sm:px-8 px-4 py-5 w-full overflow-y-auto overflow-x-hidden bg-[#14161a] bg-opacity-[0.98] z-[100]">
                    <Link
                        to={`/`}
                        state={{ query: query, genre: `Результаты поиска`, search: true }}
                        className="text-secondary inline-flex items-center sfhd:text-5xl md:text-4xl text-2xl"
                    >
                        Все результаты
                        <IconArrowForward fill="#f0761d"/>
                    </Link>

                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3 py-3">
                        {moviesAndSeries.length
                            ? moviesAndSeries.map((item) => {
                                return (
                                    <div
                                        key={`id:${item.id}`}
                                        className="py-3"
                                    >
                                        <Link
                                            to={`/movie/${item.id}`}
                                            onClick={(e) => {
                                                handleReset(e);
                                            }}
                                            state={{media_type: item.media_type}}
                                            className="flex relative group focus:outline-none"
                                        >
                                            <div className="w-fit min-w-[130px] max-w-[140px]  h-[190px]  relative scale-100 group-hover:scale-105 group-active:scale-100 group-focus:scale-105 transition-all rounded-lg border-[1px] border-orange-500/30 group-hover:border-orange-500/70 group-focus:border-orange-500/70 shadow-orange-500 group-hover:shadow-[0_0_15px_-3px_var(--tw-shadow-color)] group-focus:shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                                                {item.poster_path || item.backdrop_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/original${item.poster_path ? item.poster_path : item.backdrop_path}`}
                                                        alt=""
                                                        className="w-full h-full object-contain rounded-xl"
                                                    />
                                                ) : (
                                                    <ImgPreLoader
                                                        width={"130"}
                                                    />
                                                )}
                                                {item.media_type === 'tv' && (
                                                    <img src={serial} alt="serial" className="w-6 h-6 absolute top-1 right-1 group-hover:z-50"/>
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col w-[200px] ml-4 text-sm">
                                                <h1>{item.media_type === 'tv' ? item.name : item.title}</h1>
                                                
                                                {item ? (
                                                <p>
                                                    {item.release_date ? item.release_date.slice(0,4) : ''}
                                                    {item.first_air_date ? item.first_air_date.slice(0,4) : ''}
                                                </p>
                                                ) : ''}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                            : ""}
                    </div>
                    {searchedActors.length ? (
                        <>
                            <h1 className="mb-[1.5rem] mt-6 text-secondary sfhd:text-5xl md:text-4xl text-2xl">
                                Актеры
                            </h1>
                            <div className="flex flex-wrap ">
                                {searchedActors.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/profile/${item.id}`}
                                        className="flex flex-wrap flex-col py-3 px-2 md:basis-[calc(99.9%*1/3)] ss:basis-[calc(99.9%*1/2)] w-full"
                                    >
                                        <h2>{item.name}</h2>
                                        <p className="text-dimWhite">
                                            {item.known_for_department}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <div className="fixed inset-0 top-[3.5rem] w-dvw h-dvh backdrop-blur-[2px] -z-10"></div>
            </Modal>
        </>
    );
};

export default Search;
