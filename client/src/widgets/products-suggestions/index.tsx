import { FC } from "react";

import { productModel, ProductCard } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import { ProductsSuggestionsProps } from "./types";

const ProductsSuggestions: FC<ProductsSuggestionsProps> = ({ title }) => {
	return (
		<article>
			<h2>{title}</h2>
		</article>
	);
};

export default ProductsSuggestions;
