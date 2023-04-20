import { Link } from "react-router-dom";

import SecondaryNavigation from "./secondaryNavigation";
import SocialLinks from "./socialLinks";

import { ReactComponent as Logotype } from "./assets/logotype.svg";
import { ReactComponent as Copyright } from "./assets/copyright.svg";

const Footer = () => {
	return (
		<footer className="bg-pampas-50 pt-[5rem] pb-[2.5rem]">
			<div className="pb-[5rem] border-b-[0.1rem] border-alto-300">
				<div className="container">
					<Link to="/">
						<Logotype
							className={`
							mb-[3rem] w-[8.3rem] h-[1.3rem] text-blue-zodiac-950
							hover:text-blue-zodiac-800 duration-500 ease-out`}
						/>
					</Link>
					<SecondaryNavigation />
					<SocialLinks />
				</div>
			</div>
			<div className="container pt-[2.5rem]">
				<p className="flex items-center justify-start mb-[2rem]">
					<small className="font-normal font-mPlus text-sm-12px text-dusty-gray-500">
						Maroon
					</small>
					<Copyright className="w-[1.4rem] h-[1.4rem] ml-[0.5rem] mr-[0.5rem] text-silver-300" />
					<small className="font-normal font-mPlus text-sm-12px text-dusty-gray-500">
						2020 Все права защищены
					</small>
				</p>
				<Link to="/">
					<small
						className={`
						font-normal duration-500 ease-out font-mPlus 
						text-sm-12px text-dusty-gray-500 hover:text-dusty-gray-800
					`}
					>
						Политика конфиденциальности
					</small>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
