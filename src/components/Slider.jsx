import { IoIosArrowForward } from "react-icons/io";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Link } from "react-router-dom";

const Slider = ({ movies, movieGenre }) => {

    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: false,
        pauseOnHover: true,
        resetProgress: false,
        width: "100%",
        perPage: 3,
        breakpoints: {
            1040: {
                focus: "start",
                perPage: 2,
            },
            768: {
                perPage: 1,
            },
        },
        focus: "center",
        autoHeight: true,
        pagination: false,
        lazyLoad: "nearby",
        arrows: true,
        interval: 10000,
    };

    return (
        <div className="wrapper py-10">
            <Splide options={options} hasTrack={false}>
                <div className="relative xl:px-14 md:px-10 px-7">
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev left-0 bg-secondary rounded-[10px] xl:w-[3rem] xl:h-[4rem] md:w-[2rem] md:h-[2rem] w-[1.2rem]">
                            <IoIosArrowForward />
                        </button>
                        <button className="splide__arrow splide__arrow--next right-0 bg-secondary rounded-[10px] xl:w-[3rem] xl:h-[4rem] md:w-[2rem] md:h-[2rem] w-[1.2rem]">
                            <IoIosArrowForward />
                        </button>
                    </div>
                    <SplideTrack>
                        {movies.map((slide) => (
                            <SplideSlide key={slide.id} className="h-full">
                                <Link to={`/movie/${slide.id}`}>
                                    <div className="relative slide_info shadow-[inset_0_-40px_72px_12px_rgba(0,0,0,1)] cursor-pointer rounded-[10px]">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${
                                                slide.backdrop_path
                                                    ? slide.backdrop_path
                                                    : slide.poster_path
                                            }`}
                                            data-splide-lazy={`https://image.tmdb.org/t/p/original${
                                                slide.backdrop_path
                                                    ? slide.backdrop_path
                                                    : slide.poster_path
                                            }`}
                                            className="w-full object-cover h-full rounded-[10px] relative z-[-1]"
                                            alt={slide.title}
                                        />
                                        <div className="flex flex-col justify-between absolute inset-0 px-3 py-4 hover:bg-neutral-900 hover:bg-opacity-50 transition-all duration-300">
                                            <div className="h-full z-10">
                                                <p className="overview text-xs md:text-sm">
                                                    {slide.overview}
                                                </p>
                                            </div>
                                            <div
                                                className={`flex flex-col absolute bottom-0 left-0 slide-description justify-end w-full px-4 pb-4 transition-opacity duration-300`}
                                            >
                                                <h2 className="text-sm md:text-xl">
                                                    {slide.title}
                                                </h2>
                                                <div className="flex items-center gap-3">
                                                    <p
                                                        className={`text-xs md:text-base ${
                                                            slide.vote_average >= 7
                                                                ? "bg-secondary"
                                                                : "bg-gray-700"
                                                        }  bg-opacity-80 rounded-[5px] px-1`}
                                                    >
                                                        {slide.vote_average.toFixed(1)}
                                                    </p>
                                                    <p className="text-xs md:text-base md:leading-7">
                                                        {slide.release_date.slice(
                                                            0,
                                                            4
                                                        )}
                                                    </p>
                                                    {movieGenre.map((genre) =>
                                                        genre.id ===
                                                        slide.genre_ids[0] ? (
                                                            <p
                                                                className="text-xs md:text-base md:leading-7"
                                                                key={genre.id}
                                                            >
                                                                {genre.name.replace(
                                                                    genre.name[0],
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
                        ))}
                    </SplideTrack>
                </div>
            </Splide>
        </div>
    );
};

export default Slider;
