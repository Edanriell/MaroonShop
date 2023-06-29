import { MutableRefObject } from "react";

export type RadioProps = {
	name: string;
	data: Array<any>;
	priceContainerRef?: MutableRefObject<HTMLDivElement | null>;
};
