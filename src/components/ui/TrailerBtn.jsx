import React, { useEffect, useRef, useState } from "react";
import { clickOutside } from "../../utils";
import Preloader from "./Preloader";
import Modal from "./Modal";

const TrailerBtn = ({ className = "", trailer }) => {
    const [youTubeKey, setYouTubeKey] = useState("");
    const [open, setOpen] = useState(false);
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
        const handler = clickOutside(clickRef, setOpen, open);
        document.addEventListener("click", handler);
    }, [open]);

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

            <Modal openIn={open} modalClass={"my-modal"}>
                <div
                    className={`fixed inset-0 flex items-center z-[-1] bg-black/70`}
                ></div>
                <div
                    className={`absolute  top-1/2 left-1/2 flex items-center justify-center  -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2`}
                    ref={clickRef}
                >
                    {youTubeKey.length > 0 ? (
                        <iframe
                            autoPlay
                            allow="autoplay"
                            src={`https://www.youtube.com/embed/${youTubeKey[0].key}`}
                            className={`w-full h-full bg-black video`}
                        ></iframe>
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
