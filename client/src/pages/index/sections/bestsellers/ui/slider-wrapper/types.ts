import { Product } from "shared/api";

export type SliderWrapperProps = {
	isFetching: boolean;
	isEmpty: boolean;
	bestSellers: Product[];
	onReload: () => void;
};
