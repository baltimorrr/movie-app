import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";

import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";

const itemsPerPage = 20;

const MoviePage = () => {
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState("");
	const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
	const filterDebounce = useDebounce(filter, 500);
	const handleFilterChange = (e) => {
		setFilter(e.target.value);
	};
	const { data, error } = useSWR(url, fetcher);
	const loading = !data && !error;

	useEffect(() => {
		if (filterDebounce) {
			setUrl(
				tmdbAPI.getMovieSearch(filterDebounce, nextPage)
			);
		} else {
			setUrl(tmdbAPI.getMovieList("popular", nextPage)
			);
		}
	}, [filterDebounce, nextPage]);

	useEffect(() => {
		if (!data || !data.total_results) return;
		// Fetch items from another resources.
		setPageCount(Math.ceil(data.total_results / itemsPerPage));
	}, [data]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
		setNextPage(event.selected + 1);
	};

	const movies = data?.results;
	console.log(url);
	return (
		<div className="py-10">
			<div className="flex mb-10">
				<div className="flex-1 mr-2">
					<input
						type="text"
						className="w-full p-4 bg-slate-800 outline-none text-white font-semibold rounded-md"
						placeholder="Type here to search..."
						onChange={handleFilterChange}
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
			{loading && (
				<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
			)}
			<div className="grid grid-cols-4 gap-10">
				{!loading &&
					movies?.length > 0 &&
					movies.map((item) => (
						<MovieCard key={item.id} item={item} />
					))}
			</div>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				className="pagination"
			/>
			{/* <div className="flex items-center justify-center mt-10 gap-x-5">
				<span
					className="cursor-pointer"
					onClick={() => setNextPage(nextPage - 1)}
				>
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
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</span>
				{new Array(pageCount).fill(0).map((item, index) => (
					<span
						key={index}
						onClick={() => setNextPage(index + 1)}
						className="cursor-pointer inline-block py-2 px-4 leading-relaxed rounded bg-white text-slate-900"
					>
						{index + 1}
					</span>
				))}
				<span
					className="cursor-pointer"
					onClick={() => setNextPage(nextPage + 1)}
				>
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
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</span>
			</div> */}
		</div>
	);
};

export default MoviePage;
