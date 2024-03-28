import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactPaginate from 'react-paginate'
import { MAX_PAGES } from "../services/config";
import IconArrowForward from "../assets/icons/IconArrowForward";

const Pagination = ({ searchParams, setPage, totalPages, profile = false}) => {
    const newParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]); 
    const [prevId, setPrevId] = useState(null);
    const [prevGenre, setPrevGenre] = useState(null);
    const [prevHome, setPrevHome] = useState(null);
    const [prevType, setPrevType] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);
    const id = newParams.get('id');
    const g = newParams.get('g');
    const q = newParams.get('q');
    const h = newParams.get('h');
    const t = newParams.get('t');
    const ref = useRef(1)
    
    const setUrlQuery = (urlParams, page) => {
        if(page) {
            urlParams.set('p', page.toString())
            setPage(urlParams.toString())
        }
    }
    // console.log(Number(totalPages))
    // console.log(MAX_PAGES)

    useEffect(() => {
        if(id !== prevId || g !== prevGenre || q !== prevQuery || h !== prevHome || t !== prevType) {
            setPrevType(t)
            setPrevHome(h)
            setPrevId(id);
            setPrevGenre(g);
            setPrevQuery(q);
        }
    },[prevId, prevGenre, g, id, q, prevQuery, h, prevHome, t, prevType])

    useEffect(() => {
        ref.current = +newParams.get('p') || 1;
        setNextDisabled(ref.current === MAX_PAGES || ref.current === totalPages);
        setPrevDisabled(ref.current === 1);
    }, [newParams, totalPages])

    const handlePageClick = (event) => {
        ref.current = event.selected +1
        setUrlQuery(newParams, event.selected + 1)
    }

    return (
        <div className="flexCenter py-6">
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <IconArrowForward className={`  ${nextDisabled ? 'opacity-50' : 'opacity-100'}`} fill="#F0761D"/>
                }
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                forcePage={profile ? 0 : ref.current - 1}
                pageRangeDisplayed={3}
                pageCount={isNaN(totalPages) || isNaN(MAX_PAGES) ? MAX_PAGES : totalPages > MAX_PAGES ? MAX_PAGES : totalPages}
                previousLabel={
                    <IconArrowForward className={`rotate-180   ${prevDisabled ? 'opacity-50' : 'opacity-100'}`} fill={`#F0761D`}/>
                }
                renderOnZeroPageCount={null}
                containerClassName="flex  gap-6"
                pageLinkClassName={`px-4 py-2 rounded-full text-secondary hover:bg-secondary/70 hover:text-white transition-colors duration-300`}
                activeLinkClassName={`rounded-full bg-secondary text-white hover:bg-unset`}
                breakLinkClassName={`text-secondary`}
                previousLinkClassName={`${prevDisabled ? 'cursor-default' : ''}`}
                nextLinkClassName={`${nextDisabled ? 'cursor-default' : ''}`}
            />
        </div>
    );
};

export default Pagination;

