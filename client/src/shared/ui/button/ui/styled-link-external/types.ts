import { MutableRefObject, CSSProperties } from "react";

export type LinkExternalProps = {
	text: string;
	additionalClassNames: string;
	onButtonMouseEnter: () => void;
	onButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<HTMLDivElement | null>;
	buttonTextRef: MutableRefObject<HTMLSpanElement | null>;
	linkExternal: string;
	className: string;
	style?: CSSProperties;
};
