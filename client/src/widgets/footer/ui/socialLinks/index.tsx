import { FunctionComponent, SVGProps } from "react";

import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Facebook } from "./assets/facebook.svg";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { ReactComponent as Twitter } from "./assets/twitter.svg";

type SocialLinks = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconClasses: string;
	url: string;
	key: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const socialLinks: SocialLinks = [
	{
		label: "Наша страничка в Facebook",
		Icon: Facebook,
		iconClasses: `
			w-[1.1rem] h-[1.8rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Наша страничка в Instagram",
		Icon: Instagram,
		iconClasses: `
			w-[2rem] h-[2rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125
		`,
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Наша страничка в Twitter",
		Icon: Twitter,
		iconClasses: `
			w-[2rem] h-[1.7rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125
		`,
		url: "/",
		key: uuidv4(),
	},
];

const FooterSocialLinks = () => {
	return (
		<ul className="flex items-center justify-start gap-x-[3rem]">
			{socialLinks.map(({ label, Icon, iconClasses, url, key }) => (
				<li key={key}>
					<a href={url}>
						<Icon className={iconClasses} />
						<span className="sr-only">{label}</span>
					</a>
				</li>
			))}
		</ul>
	);
};

export default FooterSocialLinks;
