import React from "react";
import { useNavigate } from "react-router-dom";
import "swiper/react";
import {SwiperSlide, Swiper} from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
import Button from "../button/Button";

const API_KEY = "dc01a8f91ca4c206932a350cbf16d7c0";

const Banner = () => {
	const { data, error } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
		fetcher
	);

	const movies = data?.results || [];
	console.log(movies);

	return (
		<section className="banner h-[500px] page-container mb-20 overflow-hidden">
			<Swiper grabCursor="true" slidesPerView={"auto"}>
				{movies.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<BannerItem item={item} />
						</SwiperSlide>
					))}
			</Swiper>
		</section>
	);
};

const BannerItem = ({ item }) => {
    const { title, poster_path, backdrop_path, id } = item;
	const navigate = useNavigate()
	return (
		<div className="w-full h-full rounded-lg relative">
			<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
			<img
				src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
				alt=""
				className="w-full h-full object-cover rounded-lg object-top"
			/>
			<div className="absolute left-5 bottom-5 w-full text-white">
				<h2 className="font-bold text-3xl mb-5 ">{title}</h2>
				<div className="flex items-center gap-x-3 mb-8">
					<span className="py-2 px-4 border border-white rounded-md">
						Adventure
					</span>
					<span className="py-2 px-4 border border-white rounded-md">
						Adventure
					</span>
					<span className="py-2 px-4 border border-white rounded-md">
						Adventure
					</span>
				</div>
				<Button bgColor="primary" className="w-auto" onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
			</div>
		</div>
	);
};

export default Banner;
