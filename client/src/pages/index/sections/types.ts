import { ReactNode } from "react";

export type IndexPageSections = Array<{
	id: string;
	Section: any;
	title?: string;
	srOnlyTitle?: string;
	classes?: string;
}>;

export type SectionWrapperProps = {
	srTitle?: string;
	title?: string;
	classes?: string;
	children: ReactNode;
};
