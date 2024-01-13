import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import IconArrowForward from "../assets/icons/IconArrowForward";
import ImgPreLoader from "./ui/ImgPreLoader";
import { useEffect, useState } from "react";
import Preloader from "./ui/Preloader";
import { avatar } from "../assets";

const ProfileSlider = ({ credits }) => {
    const [isSplideLoaded, setIsSplideLoaded] = useState(false);

    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: false,
        pauseOnHover: true,
        resetProgress: false,
        width: "100%",
        autoHeight: true,
        // height: "190px",
        perPage: 9,
        padding: { left: '1rem', right: '1rem' },
        breakpoints: {
            2080: {
                perPage: 8,
            },
            1700: {
                perPage: 7,
            },
            1040: {
                perPage: 5,
                focus: "start",
            },
            768: {
                perPage: 4,
            },
            480: {
                perPage: 3,
            },
            375: {
                perPage: 2,
            },
        },
        focus: "center",
        pagination: false,
        lazyLoad: "nearby",
        arrows: true,
        interval: 5000,
    };

    useEffect(() => {
        setTimeout(() => {
            setIsSplideLoaded(true);
        }, 200);
    }, []);

    return (
        <div className="py-10">
            {isSplideLoaded ? (
                <Splide options={options} hasTrack={false}>
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
                            {credits.map((cast) => (
                                <SplideSlide key={cast.id} className="">
                                    <div className="sfhd:w-[140px] w-[80px] h-full">
                                        <Link
                                            to={`/profile/${cast.id}`}
                                            className="h-full"
                                        >
                                            <div className="">
                                                    <img
                                                        src={`${!cast.profile_path ? `${avatar}` : `https://image.tmdb.org/t/p/w200${cast.profile_path}`}`}
                                                        alt={`${cast.original_name}`}
                                                        className="object-cover w-full h-[120px] rounded-full bg-dark/25"
                                                    />
                                                <p className="sfhd:text-2xl">
                                                    {cast.original_name}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </SplideSlide>
                            ))}
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
};

export default ProfileSlider;
