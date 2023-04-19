import { FunctionComponent, SVGProps } from "react";

import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Facebook } from "./assets/facebook.svg";
import { ReactComponent as Instagram } from "./assets/instagram.svg";
import { ReactComponent as Twitter } from "./assets/twitter.svg";

type SocialLinks = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconClasses: "";
	url: string;
	key: string;
}>;

// TODO FIX links when will be creating corresponding pages.
const socialLinks: SocialLinks = [
	{
		label: "Наша страничка в Facebook",
		Icon: Facebook,
		iconClasses: "",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Наша страничка в Instagram",
		Icon: Instagram,
		iconClasses: "",
		url: "/",
		key: uuidv4(),
	},
	{
		label: "Наша страничка в Twitter",
		Icon: Twitter,
		iconClasses: "",
		url: "/",
		key: uuidv4(),
	},
];

const FooterSocialLinks = () => {
	return (
		<ul className="flex items-center justify-start">
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
