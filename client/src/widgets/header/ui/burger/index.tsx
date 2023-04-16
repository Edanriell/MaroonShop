import { useState } from "react";
// Importing useState hook.

import { Link } from "react-router-dom";
// Importing Link component.

import { ReactComponent as Bar } from "./assets/bar.svg";
//Importing Bar svg.

type IsShowed = boolean;
// Type for our isShowed state.

type BurgerNavigation = Array<{
	label: string;
	url: string;
}>;
// BurgerNavigation type.

// TODO FIX links when will be creating corresponding pages.
const burgerNavigation: BurgerNavigation = [
	{
		label: "Каталог",
		url: "/",
	},
	{
		label: "О нас",
		url: "/",
	},
	{
		label: "Контакты",
		url: "/",
	},
];
// mainNavigation contains an array of objects. We will use objects to generate correct NavLinks.

function Burger() {
	const [isShowed, setIsShowed] = useState<IsShowed>(false);

	return (
		<>
			<div
				aria-label="burger menu"
				className="flex flex-col items-center justify-center cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem]"
			>
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
				<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
			</div>
			{isShowed && (
				<div className="absolute">
					<nav aria-label="burger menu navigation">
						<ul>
							{burgerNavigation.map(({ label, url }) => (
								<li key={label}>
									<Link
										to={url}
										className="font-normal text-lg-16px font-mPlus text-blue-zodiac"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</>
	);
}

export default Burger;
