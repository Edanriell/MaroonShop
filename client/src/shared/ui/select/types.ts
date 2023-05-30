import { ReactNode } from "react";

export type SelectProps = {
	selectName: string;
	selectId: string;
	labelContent: string;
	labelFor: string;
	children: ReactNode;
	classes?: string;
	[x: string]: any;
};
