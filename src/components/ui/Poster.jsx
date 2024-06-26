import React, { memo, useEffect, useState } from "react";
import Preloader from "./Preloader";

const Poster = memo(({ src, alt, className, spinner, container }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!src) setIsLoading(false);
    }, [src]);

    return (
        <>
            {!isLoading && (
                <Preloader
                    container={`min-h-full absolute inset-0 ${container}`}
                    spinner={`w-[20px] h-[20px] ${spinner}`}
                />
            )}
                <img
                src={src ? src : ''}
                alt={alt}
                className={`w-[100%] h-[100%] object-cover ${className}`}
                loading="lazy"
                onLoad={() => setIsLoading(true)}
                />
        </>
    );
});
Poster.displayName = 'Poster';
export default Poster;
