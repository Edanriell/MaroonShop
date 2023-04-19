import { Link } from "react-router-dom";

import SecondaryNavigation from "./secondaryNavigation";
import SocialLinks from "./socialLinks";

import { ReactComponent as Logotype } from "./assets/logotype.svg";
import { ReactComponent as Copyright } from "./assets/copyright.svg";

const Footer = () => {
	return (
		<footer>
			<div>
				<div className="container">
					<Logotype />
					<SecondaryNavigation />
					<SocialLinks />
				</div>
			</div>
			<div className="container">
				<p className="flex items-center justify-start">
					<small>Maroon</small>
					<Copyright />
					<small>2020 Все права защищены</small>
				</p>
				<Link to="/">
					<small>Политика конфиденциальности</small>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
