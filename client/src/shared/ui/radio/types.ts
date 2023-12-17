import { MutableRefObject, Dispatch, SetStateAction } from "react";

export type RadioProps = {
	name: string;
	data: Array<any>;
	priceContainerRef?: MutableRefObject<HTMLDivElement | null>;
	onQuantityAndPriceSelect: Dispatch<SetStateAction<any>>;
};
