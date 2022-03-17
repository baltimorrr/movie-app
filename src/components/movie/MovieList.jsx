import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=dc01a8f91ca4c206932a350cbf16d7c0

const API_KEY = "dc01a8f91ca4c206932a350cbf16d7c0";

const MovieList = ({type = "now_playing"}) => {
	const [movies, setMovies] = useState([]);
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`,
		fetcher
	);

	useEffect(() => {
		setMovies(data?.results);
	}, [data]);


	return (
		<div className="movie-list">
			<Swiper
				grabCursor={"true"}
				spaceBetween={40}
				slidesPerView={"auto"}
			>
				{movies &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<MovieCard item={item} />
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default MovieList;
