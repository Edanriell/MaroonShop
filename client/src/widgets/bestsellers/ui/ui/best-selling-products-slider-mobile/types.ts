import { productModel } from "entities/product";

export type BestSellingProductsSliderMobileProps = {
	bestSellingProducts: productModel.NormalizedProducts;
	className?: string;
};
