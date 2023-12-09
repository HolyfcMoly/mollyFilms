import { API_KEY, API_URL } from "./config";
import axios from "axios";


const getGenre =  () => {
    const response =  axios
        .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=ru`)
        .then((res) => res.data.genres)
        .catch((e) => console.log(e));
    return response;
};

const getMovies = async(category = 'popular', page = 1) => {
    const response = await axios
        .get(`${API_URL}movie/${category}?api_key=${API_KEY}&page=${page}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
}

const getMoviesByGenre = async(genreId, page = 1) => {
    const response = await axios
        .get(`${API_URL}discover/movie/?with_genres=${genreId}&api_key=${API_KEY}&page=${page}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
}

const getMovie = async(id) => {
    const response = await axios
        .get(`${API_URL}movie/${id}?api_key=${API_KEY}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
}

const getPosterImage = async(id) => {
    const response = await axios
        .get(`${API_URL}movie/${id}?api_key=${API_KEY}}`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
}


export { getGenre, getMovies, getPosterImage, getMovie, getMoviesByGenre };