import { MutableRefObject } from "react";

export type MouseMoveEffectParameters = {
	event: any;
	cardContentRef: MutableRefObject<HTMLDivElement | null>;
	cardHighlightRef: MutableRefObject<HTMLDivElement | null>;
};

export type MouseOutEffectParameters = {
	cardContentRef: MutableRefObject<HTMLDivElement | null>;
	cardHighlightRef: MutableRefObject<HTMLDivElement | null>;
};
