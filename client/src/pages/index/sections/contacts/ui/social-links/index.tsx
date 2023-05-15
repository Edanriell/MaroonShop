import { ReactComponent as FacebookIcon } from "./assets/facebook-icon.svg";
import { ReactComponent as InstagramIcon } from "./assets/instagram-icon.svg";
import { ReactComponent as TwitterIcon } from "./assets/twitter-icon.svg";

// TODO FIX ALL BUTTONS paddings
const SocialLinks = () => {
	return (
		<ul className="flex flex-row">
			<li>
				<a href="/">
					<FacebookIcon className="" />
				</a>
			</li>
			<li>
				<a href="/">
					<InstagramIcon className="" />
				</a>
			</li>
			<li>
				<a href="/">
					<TwitterIcon className="" />
				</a>
			</li>
		</ul>
	);
};

export default SocialLinks;
