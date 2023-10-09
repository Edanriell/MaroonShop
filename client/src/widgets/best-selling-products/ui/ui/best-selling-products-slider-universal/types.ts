import { productModel } from "entities/product";

export type BestSellingProductsSliderUniversalProps = {
	bestSellingProducts: productModel.NormalizedProducts;
	className?: string;
};
