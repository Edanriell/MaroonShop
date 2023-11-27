import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Navigation } from "./types";

const burgerNavigation: Navigation = [
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

const BurgerNavigation = () => {
	return (
		<nav aria-label={"burger menu navigation"}>
			<ul className={"flex flex-col gap-y-[1.9rem] md:gap-y-[2.2rem]"}>
				{burgerNavigation.map(({ label, url, id }) => (
					<li key={id}>
						<Link
							to={url}
							className={
								"font-medium text-sm-28px font-raleway text-blue-zodiac-950 " +
								"duration-500 ease-out basic-hover-underline-animation " +
								"md:text-md-32px"
							}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default BurgerNavigation;
