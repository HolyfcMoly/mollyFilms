import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovieByQuerySearch } from "../services/api";
import ImgPreLoader from "./ui/ImgPreLoader";
import { search } from "../assets";
import useResize from "../hooks/useResize";

const Search = ({ className }) => {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const timeoutInputRef = useRef(null);
    const inputRef = useRef(null);
    const width = useResize();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            navigate("/", { state: { query: query } });
            setQuery("");
        }
    };

    const handleClick = (e) => {
        setOpen(false);
        setQuery("");
        e.stopPropagation();
    };

    useEffect(() => {
        setIsMobile(false);
        if (width < 620) setIsMobile(true);
    }, [width, isMobile]);

    useEffect(() => {
        if (open) {
            inputRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        document.body.classList.remove("overflow-hidden");
        if (timeoutInputRef) {
            clearInterval(timeoutInputRef.current);
        }
        if (query) {
            timeoutInputRef.current = setTimeout(() => {
                getMovieByQuerySearch(query, currentPage).then((data) => {
                    setMovies(data.data.results);
                });
            }, 700);
            document.body.classList.add("overflow-hidden");
        }
    }, [query, currentPage]);

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
                                handleClick(e);
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
                            className={`w-full focus:outline-none rounded-[5px] ring-secondary focus-visible:ring-1 sfhd:py-2 px-2 py-[2px] caret-secondary sfhd:text-2xl text-white`}
                        />
                        <button
                            className="ml-3"
                            onClick={() => {
                                // handleClick(e);
                                setOpen(false);
                                setQuery("");
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
                    </>
                )}
            </div>
            {query && (
                <div className="fixed top-[3.5rem] left-0 grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-3 h-[94dvh] sm:px-8 px-4 py-5 w-full overflow-y-auto overflow-x-hidden bg-[#14161a] z-[100]">
                    {movies.length
                        ? movies.map((item) => {
                            return (
                                <div key={`id:${item.id}`} className="py-3">
                                    <Link
                                        to={`/movie/${item.id}`}
                                        onClick={() => {
                                            setOpen(false);
                                            setQuery("");
                                            inputRef.current = null;
                                        }}
                                        className="flex relative group focus:outline-none"
                                    >
                                        <div className="w-fit max-w-[140px]  h-[150px]  relative scale-100 group-hover:scale-105 group-active:scale-100 group-focus:scale-105 transition-all rounded-lg border-[1px] border-orange-500/30 group-hover:border-orange-500/70 group-focus:border-orange-500/70 shadow-orange-500 group-hover:shadow-[0_0_15px_-3px_var(--tw-shadow-color)] group-focus:shadow-[0_0_15px_-3px_var(--tw-shadow-color)]">
                                            {item.poster_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                                    alt=""
                                                    className="w-full h-full object-contain rounded-xl"
                                                />
                                            ) : (
                                                <ImgPreLoader width={"100"} />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col w-[200px] ml-4 text-sm">
                                            <h1>{item.title}</h1>
                                            <p>
                                                {item.release_date.slice(
                                                    0,
                                                    4
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                        : ""}
                </div>
            )}
        </>
    );
};

export default Search;
