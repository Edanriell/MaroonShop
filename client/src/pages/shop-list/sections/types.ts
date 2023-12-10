import { ReactNode } from "react";

export type ShopListPageSections = Array<{
	id: string;
	Section: any;
	sectionProperties?: {
		street: string;
		city: string;
		phoneNumber: string;
		phoneNumberHref: string;
		emailAddress: string;
		emailAddressHref: string;
		coordinates: [number, number];
	};
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
