import { FunctionComponent, SVGProps } from "react";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Facebook } from "./assets/facebook.svg";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { ReactComponent as Twitter } from "./assets/twitter.svg";

type FooterSocialLinks = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconClasses: string;
	url: string;
	id: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const socialLinks: FooterSocialLinks = [
	{
		label: "Наша страничка в Facebook",
		Icon: Facebook,
		iconClasses: `
			w-[1.1rem] h-[1.8rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125
		`,
		url: "/",
		id: uuidv4(),
	},
	{
		label: "Наша страничка в Instagram",
		Icon: Instagram,
		iconClasses: `
			w-[2rem] h-[2rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125
		`,
		url: "/",
		id: uuidv4(),
	},
	{
		label: "Наша страничка в Twitter",
		Icon: Twitter,
		iconClasses: `
			w-[2rem] h-[1.7rem] text-blue-zodiac-950 duration-500 
			ease-out hover:text-blue-zodiac-800 hover:scale-125
		`,
		url: "/",
		id: uuidv4(),
	},
];

function SocialLinks() {
	return (
		<ul className="flex items-center justify-start gap-x-[3rem] lg:ml-auto">
			{socialLinks.map(({ label, Icon, iconClasses, url, id }) => (
				<li key={id}>
					<a href={url}>
						<Icon className={iconClasses} />
						<span className="sr-only">{label}</span>
					</a>
				</li>
			))}
		</ul>
	);
}

export default SocialLinks;
