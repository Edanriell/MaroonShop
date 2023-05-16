import { ReactComponent as FacebookIcon } from "./assets/facebook-icon.svg";
import { ReactComponent as InstagramIcon } from "./assets/instagram-icon.svg";
import { ReactComponent as TwitterIcon } from "./assets/twitter-icon.svg";

const SocialLinks = () => {
	return (
		<ul className="flex flex-row items-center gap-x-[3rem]">
			<li>
				<a href="/">
					<FacebookIcon
						className="w-[1.1rem] h-[1.8rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125"
					/>
				</a>
			</li>
			<li>
				<a href="/">
					<InstagramIcon
						className="w-[2rem] h-[2rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125"
					/>
				</a>
			</li>
			<li>
				<a href="/">
					<TwitterIcon
						className="w-[2rem] h-[1.7rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125"
					/>
				</a>
			</li>
		</ul>
	);
};

export default SocialLinks;
