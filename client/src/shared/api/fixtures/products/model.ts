export type Product = {
	id: number;
	name: string;
	description: Array<String>;
	components: string;
	usage: string;
	category: {
		"main": string;
		"secondary": string;
		"skin-type": Array<string>;
	};
	image: {
		lg: string;
		md: string;
		sm: string;
	};
	price: number;
	quantity: string;
	views: number;
	sells: number;
};
