export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "dc01a8f91ca4c206932a350cbf16d7c0"

const tmdbEndpoint = "https://api.themoviedb.org/3/movie"
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie"
export const tmdbAPI = {
    getMovieList: (type, page = 1) => `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    getMovieDetails: (movieID) => `${tmdbEndpoint}/${movieID}?api_key=${apiKey}`,
    getMovieMeta: (movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
    getMovieSearch: (query, page) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
    image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
}