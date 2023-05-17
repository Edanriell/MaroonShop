import { FunctionComponent, SVGProps } from "react";

export type SocialLink = {
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconWidth: string;
	iconHeight: string;
	url: string;
	id: string;
};

export type SocialLinksProps = {
	classes: string;
};
