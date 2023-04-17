import { FunctionComponent, SVGProps } from "react";
// Importing necessary types for UserActions type.

import { NavLink } from "react-router-dom";
// Importing NavLink and Link components, to be able to visit other pages of the website.
// Main difference between NavLink and Link components lays in classes, when we use NavLink component we can highlight
// page that we are at the moment.

import { v4 as uuidv4 } from "uuid";
// Importing unique id generator for keys.

import { ReactComponent as CartIcon } from "../assets/cart.svg";
import { ReactComponent as AuthIcon } from "../assets/auth.svg";
// Importing bunch of SVG's. If we import them straight without ReactComponent we will get "links"
// not an actual SVG (<svg></svg>). In that case we will need to use an img tag with src.

type UserActions = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconWidth: string;
	iconHeight: string;
	url: string;
	key: string;
}>;
// UserActions type.

// TODO FIX links when will be creating corresponding pages.
const userActions: UserActions = [
	{
		label: "Аутентификация",
		Icon: AuthIcon,
		iconWidth: "w-[1.3rem] md:w-[1.6rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Корзина",
		Icon: CartIcon,
		iconWidth: "w-[1.4rem] md:w-[1.8rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "/",
		key: uuidv4(),
	},
];
// userActions contains an array of objects. Those objects will help us to create a bunch of Links.

function Toolbar() {
	return (
		<ul className="flex items-center justify-start gap-x-[2rem] md:gap-x-[3rem] relative z-10">
			{userActions.map(({ label, Icon, iconWidth, iconHeight, url, key }) => (
				<li key={key}>
					<NavLink to={url}>
						<Icon className={iconWidth + " " + iconHeight + " text-blue-zodiac"} />
						<span className="sr-only">{label}</span>
					</NavLink>
				</li>
			))}
		</ul>
	);
}

export default Toolbar;
