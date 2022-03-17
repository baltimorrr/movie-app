import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="header flex items-center justify-center gap-x-5 text-white pt-5 mb-10">
			<NavLink to="/" className={({isActive}) => (isActive ? "text-[#f62682]" : "")}>Home</NavLink>
			<NavLink to="/movies" className={({isActive}) => (isActive ? "text-[#f62682]" : "")}>Movies</NavLink>
			
		</header>
	);
};

export default Header;
