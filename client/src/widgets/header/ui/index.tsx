import { FunctionComponent, SVGProps } from "react";
// Importing necessary types for UserActions type.

import { NavLink, Link } from "react-router-dom";
// Importing NavLink and Link components, to be able to visit other pages of the website.
// Main difference between NavLink and Link components lays in classes, when we use NavLink component we can highlight
// page that we are at the moment.

import classNames from "classnames";
// Importing classNames for conditional classes.

import { useScreenSize } from "shared/lib/hooks";

import Burger from "./burger";
// Importing BurgerMenu component.

import { ReactComponent as CartIcon } from "./assets/cart.svg";
import { ReactComponent as AuthIcon } from "./assets/auth.svg";
import { ReactComponent as Logo } from "./assets/logo.svg";
// Importing bunch of SVG's. If we import them straight without ReactComponent we will get "links"
// not an actual SVG (<svg></svg>). In that case we will need to use an img tag with src.

type Props = {
	headerUnderline?: boolean;
};
// Header component props types.

type MainNavigation = Array<{
	label: string;
	url: string;
}>;
// MainNavigation type.

type UserActions = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconWidth: string;
	iconHeight: string;
	url: string;
}>;
// UserActions type.

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
// mainNavigation contains an array of objects. We will use objects to generate correct NavLinks.

// TODO FIX links when will be creating corresponding pages.
const userActions: UserActions = [
	{
		label: "Аутентификация",
		Icon: AuthIcon,
		iconWidth: "w-[1.3rem] md:w-[1.6rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "#",
	},
	{
		label: "Корзина",
		Icon: CartIcon,
		iconWidth: "w-[1.4rem] md:w-[1.8rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "#",
	},
];
// userActions contains an array of objects. Those objects will help us to create a bunch of Links.

const Header = ({ headerUnderline = false }: Props) => {
	const { width } = useScreenSize();
	// Using custom hook useScreenSize. We get the current window inner width from it.

	const headerClasses = classNames(
		headerUnderline ? "bg-transparent border-b-[0.1rem] border-gainsboro" : "bg-transparent",
	);
	// Depending on headerUnderline props we will show or hide the underline.

	return (
		<header className={headerClasses}>
			<div className="container flex items-center justify-start bg-transparent my-[3rem] md:my-[4rem]">
				{width < 1366 && <Burger />}
				<Link
					to="/"
					className={`
						w-[8.5rem] h-[1.3rem] ml-[8.1rem] mr-auto 
						md:w-[13.1rem] md:h-[2.1rem] md:ml-[25rem] 
						lg:ml-[0px]
					`}
				>
					<Logo className="text-blue-zodiac" />
					<span className="sr-only">Логотип сайта Maroon</span>
				</Link>
				{width >= 1366 && (
					<ul className="flex items-center justify-start gap-x-[3.5rem] mr-[5.1rem]">
						{mainNavigation.map(({ label, url }) => (
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
				)}
				<ul className="flex items-center justify-start gap-x-[2rem] md:gap-x-[3rem]">
					{userActions.map(({ label, Icon, iconWidth, iconHeight, url }) => (
						<li key={label}>
							<NavLink to={url}>
								<Icon
									className={iconWidth + " " + iconHeight + " text-blue-zodiac"}
								/>
								<span className="sr-only">{label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};
// Header FC.

export default Header;
// Exporting our Header widget.
