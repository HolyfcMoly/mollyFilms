import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import IconArrowForward from "../assets/icons/IconArrowForward";
import { memo, useEffect, useState } from "react";
import Preloader from "./ui/Preloader";
import CastCard from "./CastCard";

const ProfileSlider = memo(({ credits }) => {
    const [isSplideLoaded, setIsSplideLoaded] = useState(false);

    const options = {
        type: "loop",
        width: "100%",
        autoHeight: true,
        perPage: 9,
        breakpoints: {
            2080: {
                perPage: 8,
            },
            1700: {
                perPage: 7,
            },
            1200: {
                perPage: 6,
            },
            768: {
                perPage: 5,
            },
            620: {
                perPage: 4,
            },
            480: {
                perPage: 3,
            },
            375: {
                perPage: 2,
            },
        },
        focus: "start",
        pagination: false,
        lazyLoad: "nearby",
        arrows: true,
    };

    const options2 = structuredClone(options);
    options2.type = 'slide';
    options2.arrows = false;

    useEffect(() => {
        setTimeout(() => {
            setIsSplideLoaded(true);
        }, 200);
    }, []);

    return (
        <div className="py-10">
            {isSplideLoaded ? (
                <div>
                    {credits && credits.length > 9 ? (
                        <Splide options={options} hasTrack={false}>
                            <div className="relative  xl:px-14 md:px-10 sm:px-7 px-0 overflow-hidden">
                                <div className="splide__arrows">
                                    <button className="splide__arrow splide__arrow--prev sfhd:custom__arrow-xxl sm:custom__arrow-unset custom__arrow-xl left-0 sm:bg-secondary sm:rounded-[10px] rounded-l-[8px] rounded-r-none xl:w-[3rem] xl:h-[4rem] md:w-[2rem] md:h-[2rem] sm:w-[1.2rem] xs:w-[2.8rem] w-[2rem] sm:p-0 ss:py-[8.65rem] xs:py-[7.7rem] py-[6.15rem]  bg-transparent">
                                        <IconArrowForward />
                                    </button>
                                    <button className="splide__arrow splide__arrow--next sfhd:custom__arrow-xxl sm:custom__arrow-unset custom__arrow-xl right-0 sm:bg-secondary sm:rounded-[10px] rounded-l-[0] rounded-r-[8px] xl:w-[3rem] xl:h-[4rem] md:w-[2rem] md:h-[2rem] sm:w-[1.2rem] xs:w-[2.8rem] w-[2rem] sm:p-0 ss:py-[8.65rem] xs:py-[7.7rem] py-[6.15rem] bg-transparent">
                                        <IconArrowForward />
                                    </button>
                                </div>

                                <SplideTrack>
                                    {credits.map((cast) => (
                                        <SplideSlide
                                            key={cast.id}
                                            className="px-2 flex justify-center  w-full"
                                        >
                                            <CastCard cast={cast} />
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                            </div>
                        </Splide>
                    ) : (
                        <Splide options={options2} hasTrack={false}>
                            <div className="relative px-0 overflow-hidden">
                                <SplideTrack>
                                    {credits.map((cast) => (
                                        <SplideSlide
                                            key={cast.id}
                                            className="px-2 flex justify-center  w-full"
                                        >
                                            <CastCard cast={cast} />
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                            </div>
                        </Splide>
                        
                    )}
                </div>
            ) : (
                <div className="flex items-center sfhd:h-[350px] xl:h-[250px] lg:h-[190px] md:h-[160px] sm:h-[200px] ss:h-[280px] xs:h-[250px] h-[200px]">
                    <Preloader container={"min-h-0"} />
                </div>
            )}
        </div>
    );
});
ProfileSlider.displayName = 'ProfileSlider';
export default ProfileSlider;
