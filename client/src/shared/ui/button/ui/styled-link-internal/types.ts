import { MutableRefObject, CSSProperties } from "react";

export type LinkInternalProps = {
	text: string;
	additionalClassNames: string;
	onButtonMouseEnter: () => void;
	onButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<HTMLDivElement | null>;
	buttonTextRef: MutableRefObject<HTMLSpanElement | null>;
	linkInternal: string;
	className: string;
	style?: CSSProperties;
};
