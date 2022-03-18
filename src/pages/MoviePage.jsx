import React from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";

const MoviePage = () => {
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/popular?api_key=dc01a8f91ca4c206932a350cbf16d7c0`,
		fetcher
	);

	const movies = data?.results;

	return (
		<div className="py-10">
			<div className="flex mb-10">
				<div className="flex-1 mr-2">
					<input
						type="text"
						className="w-full p-4 bg-slate-800 outline-none text-white font-semibold rounded-md"
						placeholder="Type here to search..."
					/>
				</div>
				<button className="p-4 bg-[#f62682] text-white rounded-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			<div className="grid grid-cols-4 gap-10">
				{movies?.length > 0 &&
					movies.map((item) => (
						<MovieCard key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default MoviePage;
