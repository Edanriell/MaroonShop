import { MutableRefObject } from "react";

export type MouseMoveEffectParameters = {
	event: any;
	cardContentRef: MutableRefObject<null>;
	cardHighlightRef: MutableRefObject<null>;
};

export type MouseOutEffectParameters = {
	cardContentRef: MutableRefObject<null>;
	cardHighlightRef: MutableRefObject<null>;
};
