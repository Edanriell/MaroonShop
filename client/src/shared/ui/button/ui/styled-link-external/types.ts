import { MutableRefObject } from "react";

export type LinkExternalProps = {
	text: string;
	commonButtonClasses: string;
	handleButtonMouseEnter: () => void;
	handleButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
	linkExternal: string;
	classes: string;
};
