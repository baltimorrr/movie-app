import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher } from "../config";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailPage = () => {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
		fetcher
	);

	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;

	return (
		<>
			<div className="w-full h-[600px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-50"></div>
				<div
					className="w-full h-full bg-cover bg-no-repeat"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
					}}
				></div>
			</div>
			<div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10">
				<img
					src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
					alt=""
					className="w-full h-full object-cover rounded-xl object-top"
				/>
			</div>
			<h1 className="text-center text-4xl font-bold text-white my-10">
				{title}
			</h1>
			{genres.length > 0 && (
				<div className="flex items-center justify-center  gap-x-5 mb-10">
					{genres.map((item) => (
						<span
							className="py-2 px-4 border-primary text-primary border"
							key={item.id}
						>
							{item.name}
						</span>
					))}
				</div>
			)}
			<p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
				{overview}
			</p>
			<MovieCredits />
			<MovieVideos />
			<MoviesSimilar />
		</>
	);
};

function MovieCredits() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
		fetcher
	);

	if (!data) return null;
	const { cast } = data;
	if (!cast || cast.length <= 0) return null;

	return (
		<>
			<h2 className="text-center text-3xl font-semibold mb-10">Casts</h2>
			<div className="grid grid-cols-4 gap-5 mb-10">
				{cast.slice(0, 8).map((item) => (
					<div className="cast-item" key={item.id}>
						<img
							src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
							alt=""
							className="w-full h-[350px] object-cover rounded-lg"
						/>
						<h3 className="text-xl font-medium pt-2">
							{item.name}
						</h3>
					</div>
				))}
			</div>
		</>
	);
}

/*
<iframe width="853" height="480" src="https://www.youtube.com/embed/swlrBlriFPE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/

function MovieVideos() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
		fetcher
	);

	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;

	return (
		<div className="py-10">
			{results.slice(0, 1).map((item, index) => (
				<div key={index}>
					<div className="w-full h-full flex justify-center">
						<h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block  rounded-md">
							{item.name}
						</h3>
					</div>
					<div
						key={item.id}
						className="w-full h-full flex items-center justify-center"
					>
						<iframe
							width="853"
							height="480"
							src={`https://www.youtube.com/embed/${item.key}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</div>
			))}
		</div>
	);
}

function MoviesSimilar() {
	const { movieId } = useParams();
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
		fetcher
	);

	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	console.log(data);
	return (
		<div className="py-10">
			<h2 className="text-3xl font-medium mb-10">Similar movies</h2>
			<div className="movie-list">
				<Swiper
					grabCursor={"true"}
					spaceBetween={40}
					slidesPerView={"auto"}
				>
					{results.length > 0 &&
						results.map((item, index) => (
							<SwiperSlide key={index}>
								<MovieCard item={item} />
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
}

export default MovieDetailPage;
