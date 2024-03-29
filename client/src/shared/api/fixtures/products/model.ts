export type ProductCategories = {
	main: string;
	secondary: string;
	skinType: Array<string>;
};

export type Product = {
	id: string;
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
