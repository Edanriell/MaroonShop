import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { MainNavigation } from "./types";

const mainNavigation: MainNavigation = [
	{
		label: "Каталог",
		url: "/catalog",
		id: uuidv4(),
	},
	{
		label: "О нас",
		url: "/about-shop",
		id: uuidv4(),
	},
	{
		label: "Контакты",
		url: "/contacts",
		id: uuidv4(),
	},
];

const PrimaryNavigation = () => {
	return (
		<nav aria-label={"primary navigation"}>
			<ul className={"flex items-center justify-start gap-x-[3.5rem] mr-[5.1rem]"}>
				{mainNavigation.map(({ label, url, id }) => (
					<li key={id}>
						<NavLink
							to={url}
							className={
								"font-normal text-lg-16px font-mPlus text-blue-zodiac-950 " +
								"duration-500 ease-out basic-hover-underline-animation"
							}
						>
							{label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default PrimaryNavigation;
