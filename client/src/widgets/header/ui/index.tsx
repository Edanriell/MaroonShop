import { Link } from "react-router-dom";

import { useScreenSize } from "shared/lib/hooks";

import { Burger, PrimaryNavigation, Toolbar } from "./ui";

import { ReactComponent as Logo } from "./assets/logo.svg";

type Props = {
	headerUnderline?: boolean;
};

// TODO MAKE HEADER STICKY ! Also header must change color to #FFF.
// TODO sticky top-0 left-0
const Header = ({ headerUnderline = false }: Props) => {
	const { width } = useScreenSize();

	return (
		<header className={`relative z-10 bg-transparent`}>
			<div
				className={`
					flex items-center justify-between bg-transparent 
					py-[3rem] pl-[1.5rem] pr-[1.5rem]
					md:py-[4rem] md:pl-[4.5rem] md:pr-[4.5rem]
					lg:justify-end
				`}
			>
				{width < 1366 && <Burger />}
				<Link
					to="/"
					className={`
						w-[8.5rem] h-[1.3rem] relative z-10
						md:w-[13.1rem] md:h-[2.1rem] 
						lg:ml-[0px] lg:mr-auto
					`}
				>
					<Logo
						className={`
							duration-500 ease-out text-blue-zodiac-950 
							hover:text-blue-zodiac-800
						`}
					/>
					<span className={`sr-only`}>Логотип сайта Maroon</span>
				</Link>
				{width >= 1366 && <PrimaryNavigation />}
				<Toolbar />
			</div>
			{headerUnderline && (
				<div
					className={`
						border-b-[0.1rem] border-iron-200 relative 
						z-10
					`}
				></div>
			)}
		</header>
	);
};

export default Header;
