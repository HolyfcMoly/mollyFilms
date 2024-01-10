import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";

const Poster = ({ src, alt, className }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [src]);

    return (
        <>
            {!isLoading && (
                <Preloader
                    container={"min-h-full absolute inset-0"}
                    spinner={"w-[20px] h-[20px]"}
                />
            )}

            <img
                src={src}
                alt={alt}
                className={`w-[100%] h-[100%] object-cover ${className}`}
                loading="lazy"
                onLoad={() => setIsLoading(true)}
            />
        </>
    );
};

export default Poster;
