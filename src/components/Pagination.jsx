import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactPaginate from 'react-paginate'
import { MAX_PAGES } from "../services/config";

const Pagination2 = ({ searchParams, setPage, totalPages, profile = false }) => {
    const newParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]); 
    const [prevId, setPrevId] = useState(null);
    const [prevGenre, setPrevGenre] = useState(null);
    const [prevQuery, setPrevQuery] = useState(null);
    const id = newParams.get('id');
    const g = newParams.get('g');
    const q = newParams.get('q');
    const ref = useRef(1)
    
    const setUrlQuery = (urlParams, page) => {
        if(page) {
            urlParams.set('p', page.toString())
            setPage(urlParams.toString())
        }
    }

    useEffect(() => {
        if(id !== prevId || g !== prevGenre || q !== prevQuery) {
            setPrevId(id);
            setPrevGenre(g);
            setPrevQuery(q);
        }
    },[newParams, prevId, prevGenre, g, id, q, prevQuery])

    useEffect(() => {
        ref.current = +newParams.get('p') || 1;
    }, [newParams])

    const handlePageClick = (event) => {
        ref.current = event.selected +1
        setUrlQuery(newParams, event.selected + 1)
    }

    return (
        <div className="flexCenter py-6">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                forcePage={profile ? 0 : ref.current - 1}
                pageRangeDisplayed={1}
                pageCount={totalPages > MAX_PAGES ? MAX_PAGES : totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="flex gap-6"
            />
        </div>
    );
};

export default Pagination2;

