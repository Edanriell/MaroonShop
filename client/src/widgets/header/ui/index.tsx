import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { useScreenSize, useScrollPosition } from "shared/lib/hooks";

import { Burger, PrimaryNavigation, Toolbar } from "./ui";

import { ReactComponent as Logo } from "./assets/logo.svg";

import { HeaderProps } from "./types";

const HeaderBar = () => <div className={"border-b-[0.1rem] border-iron-200 relative z-10"}></div>;

const Header: FC<HeaderProps> = ({ headerUnderline = false }) => {
	const { width } = useScreenSize();
	const { scrollPosition } = useScrollPosition();

	const headerHighlightClass = classNames({
		"bg-white shadow-header": scrollPosition > 0,
	});

	return (
		<header
			className={
				"z-20 bg-transparent sticky top-0 " +
				"left-0 duration-500 ease-out " +
				headerHighlightClass
			}
		>
			<div
				className={
					"flex items-center justify-between bg-transparent " +
					"py-[3rem] pl-[1.5rem] pr-[1.5rem] " +
					"md:py-[4rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
					"lg:justify-end lg:pl-[9.8rem] lg:pr-[9.8rem]"
				}
			>
				{width < 1366 && <Burger />}
				<Link
					to="/"
					className={
						"w-[8.5rem] h-[1.3rem] relative z-10 " +
						"md:w-[13.1rem] md:h-[2.1rem] " +
						"lg:ml-[0px] lg:mr-auto"
					}
				>
					<Logo
						className={
							"duration-500 ease-out text-blue-zodiac-950 " +
							"hover:text-blue-zodiac-800"
						}
					/>
					<span className={"sr-only"}>Логотип сайта Maroon</span>
				</Link>
				{width >= 1366 && <PrimaryNavigation />}
				<Toolbar />
			</div>
			{headerUnderline && <HeaderBar />}
		</header>
	);
};

export default Header;
