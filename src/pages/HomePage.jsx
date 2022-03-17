import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
	return (
		<Fragment>
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Now playing
				</h2>
				<MovieList type="now_playing" />
			</section>
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Top Rated
				</h2>
				<MovieList type="top_rated" />
			</section>
			<section className="movies-layout page-container pb-10">
				<h2 className="capitalize text-white mb-10 text-3xl font-bold">
					Trending
				</h2>
				<MovieList type="popular" />
			</section>
		</Fragment>
	);
};

export default HomePage;
