import React from "react";

const Pagination = ({ currentPage, searchParams, setPage, totalPages }) => {
    const newParams = new URLSearchParams(searchParams); 

    const setUrlQuery = (urlParams, btn) => {
        if(btn === 'prev' || btn === 'next') {
            urlParams.set('p', `${+currentPage + (btn === 'prev' ? - 1 : + 1)}`);
            setPage(urlParams.toString())
        }
        if(btn === 'reset') {
            urlParams.set('p', '1');
            setPage(urlParams)
        }
    }

    const handlePrev = () => {
        if (+currentPage !== 1) {
            setUrlQuery(newParams, 'prev');
        }
    };
    const handleNext = () => {
        if (+currentPage < totalPages) {
            setUrlQuery(newParams, 'next');
        } 
    };
    const handleReset = () => {
        if (+currentPage !== 1) {
            setUrlQuery(newParams, 'reset');
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
