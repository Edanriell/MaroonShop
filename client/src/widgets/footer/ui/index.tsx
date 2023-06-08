import { Link } from "react-router-dom";

import { SocialLinks } from "shared/ui";

import { SecondaryNavigation, Copyright } from "./ui";

import { ReactComponent as Logotype } from "./assets/logotype.svg";

const Footer = () => {
	return (
		<footer className={"bg-pampas-50 pt-[5rem] pb-[2.1rem] md:pt-[6rem] md:pb-[1.8rem]"}>
			<div className={"pb-[5rem] border-b-[0.1rem] border-alto-300 md:pb-[6rem]"}>
				<div
					className={
						"md:flex md:items-center md:justify-start " +
						"pl-[1.5rem] pr-[1.5rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
						"lg:max-w-[120rem] lg:pl-[2.2rem] lg:pr-[2.2rem] lg:ml-auto lg:mr-auto"
					}
				>
					<Link to="/">
						<Logotype
							className={
								"mb-[2.5rem] w-[8.3rem] h-[1.3rem] text-blue-zodiac-950 " +
								"hover:text-blue-zodiac-800 duration-500 ease-out " +
								"md:mb-[0rem] md:w-[13.1rem] md:h-[2.1rem]"
							}
						/>
					</Link>
					<SecondaryNavigation />
					<SocialLinks
						classes={
							"flex items-center justify-start gap-x-[3rem] " +
							"md:ml-auto md:gap-x-[2.5rem] lg:gap-x-[3rem]"
						}
					/>
				</div>
			</div>
			<Copyright />
		</footer>
	);
};

export default Footer;
