import { MutableRefObject, CSSProperties } from "react";

export type ButtonProps = {
	type?: any;
	text: string;
	additionalClassNames: string;
	onButtonMouseEnter: () => void;
	onButtonMouseLeave: () => void;
	buttonRef: MutableRefObject<null>;
	buttonBoxRef: MutableRefObject<HTMLDivElement | null>;
	buttonTextRef: MutableRefObject<HTMLSpanElement | null>;
	className: string;
	onClick?: () => void;
	style?: CSSProperties;
};
