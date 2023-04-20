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
			md:text-md-16px
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "О нас",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
			md:text-md-16px
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Магазины",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
			md:text-md-16px
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Контакты",
		classes: `
			font-mPlus text-sm-14px font-normal text-blue-zodiac-950 
			duration-500 ease-out basic-hover-underline-animation
			md:text-md-16px
		`,
		url: "/",
		key: uuidv4(),
	},
];

const SecondaryNavigation = () => {
	return (
		<nav aria-label="secondary navigation">
			<ul
				className={`
				grid grid-cols-2 gap-x-[3rem] gap-y-[2.5rem] mb-[3rem] 
				md:flex md:mb-[0rem] md:gap-x-[2.5rem] md:gap-y-[0rem]
				lg:ml-[7rem] lg:gap-x-[4rem]`}
			>
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
