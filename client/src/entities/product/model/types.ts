import { Product } from "shared/api";

export type NormalizedProducts = Record<number, Product>;

export type RootState = {
	products: {
		data: NormalizedProducts;
		queryConfig?: QueryConfig | undefined;
	};
};

// TODO Rethink QueryConfig type when time comes.
export type QueryConfig = {
	id?: number;
	type?: {
		main: string;
		secondary: string;
		skin: string[];
	};
};
