export type ProductCardProps = {
	data: import("shared/api").Product;
	cardType: ProductCardTypes;
};

export type ProductCardTypes = "basic" | "advanced";
