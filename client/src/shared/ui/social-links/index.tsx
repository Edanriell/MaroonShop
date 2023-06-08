import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Facebook } from "./assets/facebook.svg";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { ReactComponent as Twitter } from "./assets/twitter.svg";

import { SocialLink, SocialLinksProps } from "./types";

// TODO FIX links when will be creating corresponding pages.
const socialLinks: Array<SocialLink> = [
	{
		label: "Наша страничка в Facebook",
		Icon: Facebook,
		iconWidth: "w-[1.1rem]",
		iconHeight: "h-[1.8rem]",
		url: "/",
		id: uuidv4(),
	},
	{
		label: "Наша страничка в Instagram",
		Icon: Instagram,
		iconWidth: "w-[2rem]",
		iconHeight: "h-[2rem]",
		url: "/",
		id: uuidv4(),
	},
	{
		label: "Наша страничка в Twitter",
		Icon: Twitter,
		iconWidth: "w-[2rem]",
		iconHeight: "h-[1.7rem]",
		url: "/",
		id: uuidv4(),
	},
];

const SocialLinks: FC<SocialLinksProps> = ({ classes = "" }) => {
	return (
		<ul className={classes}>
			{socialLinks.map(({ label, Icon, iconWidth, iconHeight, url, id }) => (
				<li key={id}>
					<a href={url}>
						<Icon
							className={
								iconWidth +
								" " +
								iconHeight +
								" " +
								"text-blue-zodiac-950 " +
								"duration-500 ease-out hover:text-blue-zodiac-800 hover:scale-125"
							}
						/>
						<span className={"sr-only"}>{label}</span>
					</a>
				</li>
			))}
		</ul>
	);
};

export default SocialLinks;
