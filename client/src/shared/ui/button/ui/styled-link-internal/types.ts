import { MutableRefObject } from "react";

export type LinkInternalProps = {
	text: string;
	commonButtonClasses: string;
	handleButtonMouseEnter: () => void;
	handleButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<null>;
	buttonTextRef: MutableRefObject<null>;
	linkInternal: string;
	classes: string;
};
