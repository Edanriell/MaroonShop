export type Product = {
	id: number;
	name: string;
	description: Array<String>;
	components: string;
	usage: string;
	type: {
		main: string;
		secondary: string;
		skin: Array<string>;
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
