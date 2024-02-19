import { API_KEY, API_URL } from "./config";
import axios from "axios";

let controller = null;

const createApi = () => {
    controller = new AbortController();
    return axios.create({
        signal: controller.signal,
    });
}

let api = createApi();

const cancelRequests = () => {
    controller.abort();
};

export const refreshAPI = () => {
    cancelRequests();
    api = createApi(); 
  }

const getGenre = () => {
    const response = axios
        .get(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=ru`)
        .then((res) => res.data.genres)
        .catch((e) => console.log(e));
    return response;
};

const getTvGenre = () => {
    const response = axios
        .get(`${API_URL}genre/tv/list?api_key=${API_KEY}&language=ru`)
        .then((res) => res.data.genres)
        .catch((e) => console.log(e));
    return response;
};

const getMovies = async (category = "popular", page = 1) => {
    const response = await api
        .get(
            `${API_URL}movie/${category}?api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getPopularTv = async (page = 1) => {
    const response = await api
        .get(`${API_URL}tv/popular?api_key=${API_KEY}&page=${page}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getMoviesByGenre = async (genreId, page = 1) => {
    const response = await api
        .get(
            `${API_URL}discover/movie?with_genres=${genreId}&api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => e);
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

const getMultiSearchByQuery = async (query, page) => {
    const response = await axios
        .get(
            `${API_URL}search/multi?query=${query}&api_key=${API_KEY}&page=${page}&language=ru`
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

const getSeries = async (id) => {
    const response = await axios
        .get(`${API_URL}tv/${id}?api_key=${API_KEY}&language=ru`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getNowPlaying = async (page = 1) => {
    const response = await axios
        .get(
            `${API_URL}movie/now_playing?page=${page}&api_key=${API_KEY}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getRecommendMovies = async (id) => {
    const response = await axios
        .get(
            `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getRecommendSeries = async (id) => {
    const response = await axios
        .get(
            `${API_URL}tv/${id}/recommendations?api_key=${API_KEY}&language=ru`
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

const getSeriesCredits = async (id) => {
    const response = await axios
        .get(`${API_URL}tv/${id}/credits?api_key=${API_KEY}&language=ru`)
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

const getMovieTrailer = async (id) => {
    const response = await axios
        .get(`${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en}`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getSeriesTrailer = async (id) => {
    const response = await axios
        .get(`${API_URL}tv/${id}/videos?api_key=${API_KEY}&language=en}`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getExternalIds = async (id) => {
    const response = await axios
        .get(`${API_URL}tv/${id}/external_ids?api_key=${API_KEY}`)
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

export {
    getMovie,
    getMovies,
    getMoviesByGenre,
    getMovieByQuerySearch,
    getMovieByProfileId,
    getMovieTrailer,
    getCredits,
    getProfile,
    getGenre,
    getPosterImage,
    getNowPlaying,
    getRecommendMovies,
    getMultiSearchByQuery,
    //series
    getTvGenre,
    getPopularTv,
    getSeries,
    getSeriesCredits,
    getSeriesTrailer,
    getRecommendSeries,
    getExternalIds,
    //utils
    cancelRequests,
};
