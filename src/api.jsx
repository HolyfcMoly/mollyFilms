import { API_KEY, API_URL } from "./config";
import axios from "axios";

const getGenre = () => {
    const response = axios
        .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=ru`)
        .then((res) => res.data.genres)
        .catch((e) => console.log(e));
    return response;
};

const getMovies = async (category = "popular", page = 1) => {
    const response = await axios
        .get(
            `${API_URL}movie/${category}?api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getMoviesByGenre = async (genreId, page = 1) => {
    const response = await axios
        .get(
            `${API_URL}discover/movie/?with_genres=${genreId}&api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getMovieByQuerySearch = async (query, page) => {
    const response = await axios
        .get(
            `${API_URL}search/movie?query=${query}&api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getMovie = async (id) => {
    const response = await axios
        .get(`${API_URL}movie/${id}?api_key=${API_KEY}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getRecomendMovies = async (id) => {
    const response = await axios
        .get(
            `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getCredits = async (id) => {
    const response = await axios
        .get(`${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getProfile = async (id) => {
    const response = await axios
        .get(`${API_URL}person/${id}?api_key=${API_KEY}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getMovieByProfileId = async (id) => {
    const response = await axios
        .get(
            `${API_URL}person/${id}/movie_credits?api_key=${API_KEY}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getPosterImage = async (id) => {
    const response = await axios
        .get(`${API_URL}movie/${id}?api_key=${API_KEY}}`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

export {
    getGenre,
    getMovies,
    getPosterImage,
    getMovie,
    getMoviesByGenre,
    getMovieByQuerySearch,
    getRecomendMovies,
    getCredits,
    getProfile,
    getMovieByProfileId,
};
