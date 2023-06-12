import { MutableRefObject } from "react";

export type HoverEffectParameters = {
	buttonBoxRef: MutableRefObject<HTMLDivElement | null>;
	buttonTextRef: MutableRefObject<HTMLSpanElement | null>;
	buttonRef: MutableRefObject<null>;
};
