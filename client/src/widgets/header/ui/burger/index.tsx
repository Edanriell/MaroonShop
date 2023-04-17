import { useState, FunctionComponent, SVGProps } from "react";
// Importing useState hook. Importing necessary types for SocialLinks type.

import { Link } from "react-router-dom";
// Importing Link component.

import { v4 as uuidv4 } from "uuid";
// Importing unique id generator for keys.

import { ReactComponent as Bar } from "./assets/bar.svg";
//Importing Bar svg.
import { ReactComponent as Facebook } from "./assets/facebook.svg";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { ReactComponent as Twitter } from "./assets/twitter.svg";
// Importing icons for social links. If we import them straight without ReactComponent we will get "links"
// not an actual SVG (<svg></svg>). In that case we will need to use an img tag with src.

type IsDisplayed = boolean;
// Type for our isDisplayed state.

type BurgerNavigation = Array<{
	label: string;
	url: string;
	key: string;
}>;
// BurgerNavigation type.

type SocialLinks = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconWidth: string;
	iconHeight: string;
	url: string;
	key: string;
}>;
// SocialLinks type.

// TODO FIX links when will be creating corresponding pages.
const burgerNavigation: BurgerNavigation = [
	{
		label: "Каталог",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "О нас",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Контакты",
		url: "/",
		key: uuidv4(),
	},
];
// mainNavigation contains an array of objects. We will use objects to generate correct NavLinks.

const socialLinks: SocialLinks = [
	{
		label: "Наша страничка в Facebook",
		Icon: Facebook,
		iconWidth: "w-[1.1rem]",
		iconHeight: "h-[1.8rem]",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Наша страничка в Instagram",
		Icon: Instagram,
		iconWidth: "w-[2rem]",
		iconHeight: "h-[2rem]",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Наша страничка в Twitter",
		Icon: Twitter,
		iconWidth: "w-[2rem]",
		iconHeight: "h-[1.7rem]",
		url: "/",
		key: uuidv4(),
	},
];

function Burger() {
	const [isDisplayed, setIsDisplayed] = useState<IsDisplayed>(false);

	function handleDisplayClick() {
		setIsDisplayed(!isDisplayed);
	}

	return (
		<div>
			<div
				aria-label="burger menu"
				className={`
					flex flex-col items-center justify-center 
					cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem] relative z-10
				`}
				onClick={handleDisplayClick}
			>
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
			</div>
			{isDisplayed && (
				<div className="absolute top-0 left-0 w-full bg-desert-storm shadow-burgerMenu">
					<div className="container pt-[11.6rem] pb-[5rem] md:pt-[15.1rem]">
						<nav aria-label="burger menu navigation">
							<ul className="flex flex-col gap-y-[3.5rem] md:gap-y-[4rem]">
								{burgerNavigation.map(({ label, url, key }) => (
									<li key={key}>
										<Link
											to={url}
											className="font-medium text-sm-28px font-raleway text-blue-zodiac md:text-md-32px"
										>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						<ul className="flex items-center justify-start mt-[5rem] gap-x-[3rem] md:gap-x-[2.5rem] md:mt-[6rem]">
							{socialLinks.map(({ label, Icon, iconWidth, iconHeight, url, key }) => (
								<li key={key}>
									<Link to={url}>
										<Icon
											className={
												iconWidth + " " + iconHeight + " text-blue-zodiac"
											}
										/>
										<span className="sr-only">{label}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default Burger;
