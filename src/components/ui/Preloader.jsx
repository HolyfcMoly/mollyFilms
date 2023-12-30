import React from "react";

const Preloader = () => {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[500px]">
            <div className={`relative animate-spin block w-[150px] h-[150px] border-4 border-secondary rounded-[50%] border-s-transparent
            before:absolute inset-0 before:block before:w-full before:h-full before:border-4 before:border-opacity-20 before:border-secondary before:rounded-[50%]`}></div>
        </div>
    );
};

export default Preloader;
