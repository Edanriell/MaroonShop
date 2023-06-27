export type ProductCategories = {
	"main": string;
	"secondary": string;
	"skin-type": Array<string>;
};

export type Product = {
	id: number;
	name: string;
	description: Array<String>;
	components: string;
	usage: string;
	category: ProductCategories;
	image: {
		lg: string;
		md: string;
		sm: string;
	};
	price: Array<number>;
	quantity: Array<string>;
	views: number;
	sells: number;
};
