import { FunctionComponent, SVGProps } from "react";

export type UserActions = Array<{
	label: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
	iconWidth: string;
	iconHeight: string;
	url: string;
	id: string;
}>;
