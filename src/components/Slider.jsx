import React from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

const Slider = ({ movies }) => {
    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        width: '100%',
        perPage: 2,
        autoHeight: true,
        pagination: false,
        arrows: false,
        interval: 10000,
    };
    return (
        <div className="wrapper">
            <Splide
                options={options}
                hasTrack={false}
            >
                <div style={{ position: "relative" }} className="">
                    <SplideTrack >
                        {movies.map((slide) => (
                            <SplideSlide key={slide.id} >
                                <div className="relative">
                                    <img src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`} className="w-full object-cover h-full rounded-[10px]" alt={slide.title} />
                                    <div className="flex flex-col justify-end absolute inset-0 px-3 py-2 bg-neutral-900 bg-opacity-50">
                                        <div className={`flex`}>
                                            <h2>{slide.title}</h2>
                                            <p className="">
                                                {slide.vote_average.toFixed(1)}
                                            </p>
                                            
                                        </div>
                                        <div>
                                            <p className=" text-[0.7rem] overflow-hidden whitespace-nowrap text-ellipsis hover: transition-all">{slide.overview}</p>
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        ))}
                    </SplideTrack>
                </div>
            </Splide>
        </div>
    );
};

export default Slider;
