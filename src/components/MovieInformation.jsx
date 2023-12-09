import React, { useEffect, useState } from "react";
import { getMovie } from "../api";
import { useParams } from "react-router-dom";

const MovieInformation = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMovie(id);
            setData(response.data);
        };
        fetchData();
    }, [id]);
    // console.log(data)
    return (
        <div>
            <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt=""
            />
        </div>
    );
};

export default MovieInformation;
