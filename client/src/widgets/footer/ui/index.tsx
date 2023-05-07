import { Link } from "react-router-dom";

import SecondaryNavigation from "./secondary-navigation";
import SocialLinks from "./social-links";
import Copyright from "./copyright";

import { ReactComponent as Logotype } from "./assets/logotype.svg";

const Footer = () => {
	return (
		<footer className="bg-pampas-50 pt-[5rem] pb-[2.5rem] md:pt-[6rem] md:pb-[2rem]">
			<div className="pb-[5rem] border-b-[0.1rem] border-alto-300 md:pb-[6rem]">
				<div className="container md:flex md:items-center md:justify-between lg:justify-start">
					<Link to="/">
						<Logotype
							className={`
							mb-[3rem] w-[8.3rem] h-[1.3rem] text-blue-zodiac-950
							hover:text-blue-zodiac-800 duration-500 ease-out
							md:mb-[0rem] md:w-[13.1rem] md:h-[2.1rem]`}
						/>
					</Link>
					<SecondaryNavigation />
					<SocialLinks />
				</div>
			</div>
			<Copyright />
		</footer>
	);
};

export default Footer;
