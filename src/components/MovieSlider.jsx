import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import IconArrowForward from "../assets/icons/IconArrowForward";
import { useEffect, useState } from "react";
import Preloader from "./ui/Preloader";
import { memo } from "react";
import LazySliderImage from "./ui/LazySliderImage";
import TvIcon from "../assets/icons/TvIcon";

const MovieSlider = memo(({ movies, movieGenre, type }) => {
    const [isMoviesLoaded, setIsMoviesLoaded] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);

    const handleClick = (movie) => {
        localStorage.setItem(
            "type",
            movie.media_type
                ? movie.media_type
                : movie.first_air_date
                ? "tv"
                : "movie"
        );
    };

    const handleVisible = (visibleIndexes) => {
        const {isClone, slideIndex } = visibleIndexes;
            if(isClone) {
                const imgContainer = visibleIndexes.slide.querySelector('.img_container')
                if(imgContainer) {
                    const existingImg = imgContainer.querySelector('img');
                    if(!existingImg) {
                        const imgElement = document.createElement('img');
                        const url = `https://image.tmdb.org/t/p/w500${imageUrls[slideIndex][slideIndex]}`
                        imgElement.className = 'w-[100%] h-[100%] object-cover object-top rounded-[10px] relative z-[-1] bg-neutral-950';
                        imgElement.src = url;
                        imgContainer.appendChild(imgElement)
                    }
                }
            }
    }

    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        width: "100%",
        height: "350px",
        perPage: 3,
        breakpoints: {
            2080: {
                height: "250px",
            },
            1700: {
                height: "190px",
            },
            1200: {
                height: "160px",
            },
            1040: {
                height: "200px",
                focus: "start",
                perPage: 2,
            },
            768: {
                height: "280px",
                perPage: 1,
            },
            620: {
                height: "250px",
            },
            480: {
                height: "200px",
            },
        },
        focus: "start",
        pagination: false,
        arrows: true,
        interval: 10000,
    };

    useEffect(() => {
        if(movies?.length) {
            setIsMoviesLoaded(true);
            const urls = movies.map((item, index) => {
                return {[index]: item.backdrop_path ? item.backdrop_path : item.poster_path}
            })
            setImageUrls(urls)
        }
    }, [movies]);

    return (
        <div className="wrapper py-10 realtive">
            {isMoviesLoaded ? (
                <Splide
                    options={options}
                    hasTrack={false}
                    onVisible={(splide, visibleIndexes) => handleVisible(visibleIndexes)}
                >
                    <div className="relative xl:px-14 md:px-10 sm:px-7 px-0">
                        <div className="splide__arrows">
                            <button className="splide__arrow splide__arrow--prev sm:custom__arrow-unset custom__arrow-xl left-0 sm:bg-secondary sm:rounded-[10px] rounded-l-[8px] rounded-r-none xl:w-[3rem] xl:h-[4rem] md:w-[2rem] md:h-[2rem] sm:w-[1.2rem] xs:w-[2.8rem] w-[2rem] sm:p-0 ss:py-[8.65rem] xs:py-[7.7rem] py-[6.15rem]  bg-transparent">
                                <IconArrowForward />
                            </button>
                            <button className="splide__arrow splide__arrow--next sm:custom__arrow-unset custom__arrow-xl right-0 sm:bg-secondary sm:rounded-[10px] rounded-l-[0] rounded-r-[8px] xl:w-[3rem] xl:h-[4rem] md:w-[2rem] md:h-[2rem] sm:w-[1.2rem] xs:w-[2.8rem] w-[2rem] sm:p-0 ss:py-[8.65rem] xs:py-[7.7rem] py-[6.15rem] bg-transparent">
                                <IconArrowForward />
                            </button>
                        </div>
                        <SplideTrack>
                            {movies.map((slide, index) => {
                            return (
                                <SplideSlide key={slide.id} className="h-full">
                                    <Link
                                        to={`/movie/${slide.id}`}
                                        className=" h-full block"
                                        state={{
                                            media_type: `${
                                                slide.media_type === "movie" ||
                                                slide.release_date
                                                    ? "movie"
                                                    : "tv"
                                            }`,
                                        }}
                                        onClick={() => handleClick(slide)}
                                    >
                                        <div className="relative slide_info shadow-[inset_0_-40px_72px_12px_rgba(0,0,0,1)] cursor-pointer rounded-[10px] ">
                                            {type === 'tv' && <TvIcon />}
                                            {slide.backdrop_path ||
                                            slide.poster_path ? (
                                                <LazySliderImage
                                                    currentIndex={index}
                                                    totalSlides={movies.length}
                                                    perPage={options.perPage}
                                                    src={`https://image.tmdb.org/t/p/w500${
                                                        slide.backdrop_path
                                                            ? slide.backdrop_path
                                                            : slide.poster_path
                                                    }`}
                                                    alt={
                                                        slide.title ||
                                                        slide.name
                                                    }
                                                    className={`object-top rounded-[10px] relative z-[-1] bg-neutral-950`}
                                                />
                                            ) : (
                                                <Preloader
                                                    container={`min-h-full absolute inset-0 `}
                                                    spinner={`w-[20px] h-[20px]`}
                                                />
                                            )}
                                            <div className="flex flex-col justify-between absolute inset-0 px-3 py-4 hover:bg-neutral-900 hover:bg-opacity-50 transition-all duration-300">
                                                <div className="h-full z-10">
                                                    <p className="sfhd:text-2xl overview text-xs md:text-sm">
                                                        {slide.overview}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`flex flex-col absolute bottom-0 left-0 slide-description justify-end w-full px-4 pb-4 xl:pb-6 transition-opacity duration-300`}
                                                >
                                                    <h2 className="sfhd:text-3xl mb-2 text-sm lg:text-xl xl:text-2xl">
                                                        {slide.title ||
                                                            slide.name}
                                                    </h2>
                                                    <div className="flex items-center gap-3">
                                                        <p
                                                            className={`sfhd:text-2xl lg:text-base text-xs  ${
                                                                slide.vote_average >=
                                                                7
                                                                    ? "bg-secondary"
                                                                    : "bg-gray-700"
                                                            }  bg-opacity-80 rounded-[5px] px-1`}
                                                        >
                                                            {slide.vote_average.toFixed(
                                                                1
                                                            )}
                                                        </p>
                                                        <p className="sfhd:text-2xl text-xs lg:text-lg xl:text-xl ">
                                                            {slide.media_type ===
                                                                "movie" ||
                                                            slide.release_date
                                                                ? slide.release_date.slice(
                                                                    0,
                                                                    4
                                                                )
                                                                : slide.first_air_date.slice(
                                                                    0,
                                                                    4
                                                                )}
                                                        </p>
                                                        {movieGenre.map(
                                                            (genre) =>
                                                                genre.id ===
                                                                slide
                                                                    .genre_ids[0] ? (
                                                                    <p
                                                                        className="sfhd:text-2xl text-xs lg:text-lg xl:text-xl "
                                                                        key={
                                                                            genre.id
                                                                        }
                                                                    >
                                                                        {genre.name.replace(
                                                                            genre
                                                                                .name[0],
                                                                            genre.name[0].toUpperCase()
                                                                        )}
                                                                    </p>
                                                                ) : (
                                                                    ""
                                                                )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SplideSlide>
                            )})}
                        </SplideTrack>
                    </div>
                </Splide>
            ) : (
                <div className="flex items-center sfhd:h-[350px] xl:h-[250px] lg:h-[190px] md:h-[160px] sm:h-[200px] ss:h-[280px] xs:h-[250px] h-[200px]">
                    <Preloader container={"min-h-0"} />
                </div>
            )}
        </div>
    );
});
MovieSlider.displayName = "MovieSlider";
export default MovieSlider;
