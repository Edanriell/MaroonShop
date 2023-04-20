import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

type SecondaryNavigationElements = Array<{
	label: string;
	classes: string;
	url: string;
	key: string;
}>;

// TODO Change urls when all necessary pages are created.
const secondaryNavigation: SecondaryNavigationElements = [
	{
		label: "Каталог",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "О нас",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Магазины",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Контакты",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
		`,
		url: "/",
		key: uuidv4(),
	},
];

const SecondaryNavigation = () => {
	return (
		<nav aria-label="secondary navigation">
			<ul className="grid grid-cols-2 gap-x-[3rem] gap-y-[2.5rem] mb-[3rem]">
				{secondaryNavigation.map(({ label, classes, url, key }) => (
					<li key={key}>
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
