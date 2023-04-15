import { FunctionComponent, SVGProps } from "react";

import { NavLink, Link } from "react-router-dom";

import Burger from "./burger";

import { ReactComponent as SearchIcon } from "./assets/search.svg";
import { ReactComponent as CartIcon } from "./assets/cart.svg";
import { ReactComponent as AuthIcon } from "./assets/auth.svg";
import { ReactComponent as Logo } from "./assets/logo.svg";

type Navigation = Array<{
	label: string;
	url: string;
}>;

type Actions = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	url: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const navigation: Navigation = [
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
		Icon: SearchIcon,
		url: "#",
	},
	{
		label: "Корзина",
		Icon: CartIcon,
		url: "#",
	},
	{
		label: "Аутентификация",
		Icon: AuthIcon,
		url: "#",
	},
];

const Header = () => {
	return (
		<header className="sm:bg-slate-100 md:bg-slate-800 lg:bg-red-600">
			<div className="container">
				<Burger />
				<Link to="/">
					<Logo />
				</Link>
				{actions.map(({ label, Icon, url }) => (
					<NavLink key={label} to={url}>
						<Icon />
						<span className="sr-only">{label}</span>
					</NavLink>
				))}
			</div>
		</header>
	);
};

export default Header;
