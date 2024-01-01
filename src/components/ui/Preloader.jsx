import React from "react";

const Preloader = ({container, spinner}) => {
    return (
        <div className={`flex items-center justify-center w-full h-full min-h-[500px] ${container}`}>
            <div className={` animate-spin  border-solid w-[150px] h-[150px] ${spinner} border-2 border-secondary rounded-[50%] border-s-transparent
            `}></div>
        </div>
    );
};

export default Preloader;
