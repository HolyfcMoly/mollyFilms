import { API_KEY, API_URL, YANDEX_API_KEY, YANDEX_FOLDER_ID } from "./config";
import axios from "axios";

axios.defaults.retry = true;
axios.defaults.retries = 3;

let controller = null;

const createApi = () => {
    controller = new AbortController();
    return axios.create({
        signal: controller.signal,
    });
};

let api = createApi();

const cancelRequests = () => {
    controller.abort();
};

export const refreshAPI = () => {
    cancelRequests();
    api = createApi();
};
export const translateText = async (text, targetLang = "ru") => {
    // const apiUrl = "/api";
    //при деплои использовать вместо ^
    const apiUrl =
        "https://translate.api.cloud.yandex.net/translate/v2/translate";
    const body = {
        folder_id: `${YANDEX_FOLDER_ID}`,
        targetLanguageCode: targetLang,
        texts: [text ? text : ""],
    };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${YANDEX_API_KEY}`,
    };

    const response = await api
        .post(apiUrl, body, { headers })
        .then((data) => data.data.translations[0].text)
        .catch((e) => {
            console.error("Error translating text:", e);
            return text;
        });
    return response;
};

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

const getMovies = async (category = "", page = 1) => {
    const response = await api
        .get(
            `${API_URL}movie/${
                category || "popular"
            }?api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => e);
    return response;
};

const getCategoryTv = async (category = "", page = 1) => {
    const response = await api
        .get(
            `${API_URL}tv/${
                category || "popular"
            }?api_key=${API_KEY}&page=${page}&language=ru`
        )
        .then((res) => res)
        .catch((e) => e);
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

const getTvByGenre = async (genreId, page = 1) => {
    const response = await api
        .get(
            `${API_URL}discover/tv?with_genres=${genreId}&api_key=${API_KEY}&page=${page}&language=ru`
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

const getMultiSearchByQuery = async (query, page = 1) => {
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

const getTvSeriesEpisode = async (id, seasonNumber) => {
    const response = await axios
        .get(
            `${API_URL}tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=ru`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getEpisodeInfo = async (
    id,
    seasonNumber,
    episodeNumber,
    extra = false
) => {
    const response = await axios
        .get(
            `${
                !extra
                    ? `${API_URL}tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&language=ru`
                    : `${API_URL}tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&append_to_response=videos,images`
            }`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getEpisodeExternalIds = async (id, seasonNumber, episodeNumber) => {
    const response = await axios
        .get(
            `${API_URL}tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/external_ids?api_key=${API_KEY}`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getEpisodeCredits = async (id, seasonNumber, episodeNumber) => {
    const response = await axios
        .get(
            `${API_URL}tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/credits?api_key=${API_KEY}`
        )
        .then((res) => res)
        .catch((e) => console.log(e));
    return response;
};

const getTvSeriesVideos = async (id, seasonNumber) => {
    const response = await axios
        .get(
            `${API_URL}tv/${id}/season/${seasonNumber}/videos?api_key=${API_KEY}`
        )
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

const getTrendingSeries = async () => {
    const response = await axios
        .get(`${API_URL}/trending/tv/week?api_key=${API_KEY}&language=ru`)
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
        .get(`${API_URL}person/${id}?api_key=${API_KEY}&language=en`)
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

const getTvByProfileId = async (id) => {
    const response = await axios
        .get(`${API_URL}person/${id}/tv_credits?api_key=${API_KEY}&language=ru`)
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

const getPersonImages = async (id) => {
    const response = await axios
        .get(`${API_URL}person/${id}/images?api_key=${API_KEY}`)
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
    getCategoryTv,
    getTvByGenre,
    getSeries,
    getSeriesCredits,
    getSeriesTrailer,
    getRecommendSeries,
    getExternalIds,
    getTvByProfileId,
    getTvSeriesEpisode,
    getTvSeriesVideos,
    getEpisodeInfo,
    getEpisodeExternalIds,
    getEpisodeCredits,
    getTrendingSeries,
    //utils
    cancelRequests,
    getPersonImages,
};
