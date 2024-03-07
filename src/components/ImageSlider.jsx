import "@splidejs/react-splide/css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import IconArrowForward from "../assets/icons/IconArrowForward";
import { useEffect, useState } from "react";
import Preloader from "./ui/Preloader";
import { getRandomKey } from "../utils";

const ImageSlider = ({
    content,
    showModal,
    show = true,
    setSlideIndex,
    slideIndex,
    containerClass,
}) => {
    const [isSplideLoaded, setIsSplideLoaded] = useState(false);

    const options = {
        type: "loop",
        width: "100%",
        autoHeight: true,
        perPage: 5,
        breakpoints: {
            2080: {
                perPage: 4,
            },
            1700: {
                perPage: 3,
            },
            620: {
                perPage: 2,
            },
            375: {
                perPage: 1,
            },
        },
        focus: "start",
        pagination: false,
        lazyLoad: "nearby",
        arrows: true,
    };

    const options2 = {
        ...options,
        type: 'fade',
        breakpoints: {},
        start: slideIndex,
        focus: "center",
        autoWidth: true,
    };

    useEffect(() => {
        setTimeout(() => {
            setIsSplideLoaded(true);
        }, 200);
    }, [slideIndex]);

    return (
        <div className={`py-10 ${containerClass}`}>
            {isSplideLoaded ? (
                <>
                    {content && content.images.stills.length ? (
                        show ? (
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
                                        {content.images.stills.map(
                                            (image, index) => (
                                                <SplideSlide
                                                    key={
                                                        image.file_path
                                                            ? image.file_path.slice(1,6)
                                                        : getRandomKey(0,index).id
                                                    }
                                                    className="px-2 flex justify-center  w-full"
                                                >
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                                                        alt=""
                                                        onClick={() => {
                                                            show ? showModal() : "";
                                                            setSlideIndex(index);
                                                        }}
                                                    />
                                                </SplideSlide>
                                            )
                                        )}
                                    </SplideTrack>
                                </div>
                            </Splide>
                        ) : (
                            <Splide options={options2} hasTrack={false}>
                                <div className="relative sm:px-8 overflow-hidden">
                                    <div className="splide__arrows">
                                        <button className="splide__arrow splide__arrow--prev custom__arrow-xs sm:custom__arrow-xl lg:custom__arrow-xxl lg:-left-4 left-0 sm:rounded-[10px] rounded-l-[8px] rounded-r-none lg:w-[4rem] w-[3rem] lg:py-[18.5rem] ss:py-[11rem] xs:py-[7.7rem] py-[6.15rem]  bg-transparent">
                                            <IconArrowForward />
                                        </button>
                                        <button className="splide__arrow splide__arrow--next custom__arrow-xs sm:custom__arrow-xl lg:custom__arrow-xxl  lg:-right-4 right-0 sm:rounded-[10px] rounded-l-none rounded-r-[8px] lg:w-[4rem] w-[3rem] lg:py-[18.5rem] ss:py-[11rem] xs:py-[7.7rem] py-[6.15rem] bg-transparent">
                                            <IconArrowForward />
                                        </button>
                                    </div>
                                    <SplideTrack>
                                        {content.images.stills.map((image, index) => (
                                            <SplideSlide
                                            key={
                                                image.file_path
                                                    ? image.file_path.slice(1,6)
                                                : getRandomKey(0,index).id
                                            }
                                                className="px-2 flex justify-center  w-full"
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                                                    alt=""
                                                />
                                            </SplideSlide>
                                        ))}
                                    </SplideTrack>
                                </div>
                            </Splide>
                        )
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <div className="flex items-center sfhd:h-[350px] xl:h-[250px] lg:h-[190px] md:h-[160px] sm:h-[200px] ss:h-[280px] xs:h-[250px] h-[200px]">
                    <Preloader container={"min-h-0"} />
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
