import React from "react";

import { NavLink, Link } from "react-router-dom";

import SearchIcon from "./assets/search.svg";
import CartIcon from "./assets/cart.svg";
import AuthIcon from "./assets/auth.svg";
import Logo from "./assets/logo.svg";

type MainNavigation = Array<{
	label: string;
	url: string;
}>;

type Actions = Array<{
	label: string;
	icon: string;
	url: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const mainNavigation: MainNavigation = [
	{
		label: "Каталог",
		url: "#",
	},
	{
		label: "О нас",
		url: "#",
	},
	{
		label: "Контакты",
		url: "#",
	},
];

// TODO FIX links when will be creating corresponding pages.
const actions: Actions = [
	{
		label: "Поиск",
		icon: SearchIcon,
		url: "#",
	},
	{
		label: "Корзина",
		icon: CartIcon,
		url: "#",
	},
	{
		label: "Аутентификация",
		icon: AuthIcon,
		url: "#",
	},
];

const Header = () => {
	return <header></header>;
};

export default Header;
