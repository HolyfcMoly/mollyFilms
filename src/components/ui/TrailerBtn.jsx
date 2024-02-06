import React, { useEffect, useRef, useState } from "react";
import { clickOutSide, toggleBodyClasses } from "../../utils";
import Preloader from "./Preloader";
import Modal from "./Modal";
import useResize from "../../hooks/useResize";
import { close } from "../../assets";

const TrailerBtn = ({ className = "", trailer }) => {
    const [youTubeKey, setYouTubeKey] = useState("");
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const width = useResize();

    const clickRef = useRef(null);

    useEffect(() => {
        const link = trailer.filter((item) => {
            if (item.name && item.name === "Final Trailer") {
                item.name === "Final Trailer";
            } else {
                return item.name;
            }
        });
        setYouTubeKey(link);
    }, [trailer]);

    useEffect(() => {
        const toggleTrailer = () => {
            !open ? setOpen(false) : setOpen(!open);
        }
        document.addEventListener("click", (e) => {
            clickOutSide(e, clickRef, toggleTrailer);
        });
        setIsMobile(false);
        if (width < 1023) {
            setIsMobile(true);
        }
        toggleBodyClasses(open, !isMobile);
    }, [open, width, isMobile]);

    return (
        <>
            <button
                className={`inline-block border-[1px] border-secondary sfhd:rounded-xl rounded-md sfhd:px-6 sfhd:py-3 px-4 py-1 text-secondary sfhd:text-3xl xl:text-2xl ${className}`}
                onClick={(e) => {
                    setOpen(!open);
                    e.stopPropagation();
                }}
            >
                Trailer
            </button>

            <Modal openIn={open} modalClass={"my-modal"} containerClass={`fixed inset-0`}>
                <div
                    className={`fixed inset-0 flex items-center z-[-1] bg-black/70`}
                ></div>
                <div
                    className={`absolute  top-1/2 left-1/2 flexCenter -translate-y-1/2 -translate-x-1/2 sm:w-1/2 ss:w-2/3 w-10/12 ss:h-1/2 h-2/6`}
                    ref={clickRef}
                >
                    {youTubeKey.length > 0 ? (
                        <div className="w-full h-full">
                            <button
                                className="absolute ss:-right-5 right-0 ss:-top-8 -top-6 ss:h-auto ss:w-auto h-6 w-6"
                                onClick={(e) => {
                                    setOpen(!open);
                                    e.stopPropagation();
                                }}
                            >
                                <img src={close} />
                            </button>
                            <iframe
                                autoPlay
                                allow="autoplay"
                                src={`https://www.youtube.com/embed/${youTubeKey[0].key}`}
                                className={`w-full h-full bg-black video`}
                            ></iframe>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-black video">
                            <Preloader />
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default TrailerBtn;
