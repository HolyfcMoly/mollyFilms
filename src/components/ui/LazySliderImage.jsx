import React, { useEffect, useRef, useState } from "react";

const LazySliderImage = ({
    src,
    alt,
    className,
    totalSlides,
    currentIndex,
    perPage,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);
    useEffect(() => {
        const refImage = imageRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const isVisible = entry.isIntersecting && entry.target.dataset.index <= totalSlides - 1;
                
                if (entry.isIntersecting && isVisible) {
                        setIsLoaded(true);
                        observer.unobserve(entry.target);
                    }  
                });
            }, {});
            if (refImage) {
                refImage.dataset.index = currentIndex;
                observer.observe(refImage);
            }

            return () => {
                if (refImage) {
                    observer.unobserve(refImage);
                }
            };

    }, [src, currentIndex, totalSlides, perPage]);

    return (
        <div ref={imageRef} className="w-full h-full img_container">
            {isLoaded && (
                <img
                    src={src}
                    alt={alt}
                    className={`w-[100%] h-[100%] object-cover ${className}`}
                />
            )}
        </div>
    );
};

export default LazySliderImage;
