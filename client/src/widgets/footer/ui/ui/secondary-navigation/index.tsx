import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { FooterSecondaryNavigation } from "./types";

// TODO Change urls when all necessary pages are created.
const secondaryNavigation: FooterSecondaryNavigation = [
	{
		label: "Каталог",
		classes:
			"font-mPlus text-sm-14px font-normal text-blue-zodiac-950 " +
			"duration-500 ease-out basic-hover-underline-animation " +
			"md:text-md-16px mr-[3.4rem] md:mr-[0rem]",
		url: "/catalog",
		id: uuidv4(),
	},
	{
		label: "О нас",
		classes:
			"font-mPlus text-sm-14px font-normal text-blue-zodiac-950 " +
			"duration-500 ease-out basic-hover-underline-animation " +
			"md:text-md-16px mr-[5.1rem] md:mr-[0rem]",
		url: "/",
		id: uuidv4(),
	},
	{
		label: "Магазины",
		classes:
			"font-mPlus text-sm-14px font-normal text-blue-zodiac-950 " +
			"duration-500 ease-out basic-hover-underline-animation " +
			"md:text-md-16px mr-[2.1rem] md:mr-[0rem]",
		url: "/",
		id: uuidv4(),
	},
	{
		label: "Контакты",
		classes:
			"font-mPlus text-sm-14px font-normal text-blue-zodiac-950 " +
			"duration-500 ease-out basic-hover-underline-animation " +
			"md:text-md-16px mr-[2.3rem] md:mr-[0rem]",
		url: "/",
		id: uuidv4(),
	},
];

const SecondaryNavigation = () => {
	return (
		<nav aria-label="secondary navigation">
			<ul
				className={
					"flex flex-row flex-wrap mb-[2.5rem] gap-y-[1.5rem] gap-x-[1rem] " +
					"md:flex-row md:mb-[0rem] md:gap-x-[2.5rem] md:gap-y-[0rem] " +
					"md:ml-[5rem] lg:ml-[7rem] lg:gap-x-[4rem]"
				}
			>
				{secondaryNavigation.map(({ label, classes, url, id }) => (
					<li key={id}>
						<Link to={url} className={classes}>
							<span>{label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default SecondaryNavigation;
