import React, { useEffect, useState } from "react";
import { getMovies, getMoviesByGenre } from "../api";
import MovieList from "./MovieList";

const GetMoviesByCategoryOrGenre = ( category ) => {
    console.log(category)
    const fetchData = async () => {
        try {
            if(category === 'string') {
                const response = await getMovies(category);
                console.log(response.data.results)
                return response.data.results
            } else {
                const response = await getMoviesByGenre(category);
                console.log(response.data.results)
                return response.data.results
            }
        } catch (error) {
            console.log(error);
        }
    };
    if(category) {
        fetchData();
    }
};

export default GetMoviesByCategoryOrGenre
