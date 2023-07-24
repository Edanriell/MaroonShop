export type ProductCardProps = {
	data: import("shared/api").Product;
	cardType: ProductCardTypes;
	className?: string;
};

export type ProductCardTypes = "basic" | "advanced";
