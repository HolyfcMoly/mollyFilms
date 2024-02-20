import React from "react";

const Pagination = ({ currentPage, setPage, totalPages }) => {
    
    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((prev) => +prev - 1);
        }
    };
    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((prev) => +prev + 1);
        } else {
            setPage(currentPage)
        }
    };

    const handleReset = () => {
        if (currentPage !== 1) {
            setPage(1);
        }
    };

    return (
        <div className="flexCenter py-6">
            <button onClick={handleReset}>В начало</button>
            <button className="mx-8" onClick={handlePrev}>
                Prev
            </button>
            <span>{currentPage}</span>
            <button className="mx-8" onClick={handleNext}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
