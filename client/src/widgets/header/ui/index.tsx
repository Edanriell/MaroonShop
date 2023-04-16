import { Link } from "react-router-dom";
// Importing NavLink and Link components, to be able to visit other pages of the website.
// Main difference between NavLink and Link components lays in classes, when we use NavLink component we can highlight
// page that we are at the moment.

import classNames from "classnames";
// Importing classNames for conditional classes.

import { useScreenSize } from "shared/lib/hooks";
// Importing custom hook, which helps us with conditional component rendering
// based on window inner width.

import Burger from "./burger";
// Importing BurgerMenu component.
import PrimaryNavigation from "./primaryNavigation";
// Importing PrimaryNavigation component.
import Toolbar from "./toolbar";
// Importing Toolbar component;

import { ReactComponent as Logo } from "./assets/logo.svg";
// Importing bunch of SVG's. If we import them straight without ReactComponent we will get "links"
// not an actual SVG (<svg></svg>). In that case we will need to use an img tag with src.

type Props = {
	headerUnderline?: boolean;
};
// Header component props types.

const Header = ({ headerUnderline = false }: Props) => {
	const { width } = useScreenSize();
	// Using custom hook useScreenSize. We get the current window inner width from it.

	const headerClasses = classNames(
		headerUnderline
			? `bg-transparent border-b-[0.1rem] border-gainsboro relative`
			: `bg-transparent relative`,
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
				{width >= 1366 && <PrimaryNavigation />}
				<Toolbar />
			</div>
		</header>
	);
};
// Header FC.

export default Header;
// Exporting our Header widget.
