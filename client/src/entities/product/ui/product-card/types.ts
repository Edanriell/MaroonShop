export type ProductCardProps = {
	data: import("shared/api").Product;
	cardType: ProductCardTypes;
	className?: string;
	backgroundImageClassName?: string;
};

export type ProductCardTypes = "basic" | "advanced";
