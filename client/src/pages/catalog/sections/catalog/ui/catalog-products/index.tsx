import { FC } from "react";

import { ProductCard } from "entities/product";

import { Card3dFlip } from "shared/ui";
import { Product } from "shared/api";

import { CatalogProductsProps } from "./types";

const CatalogProducts: FC<CatalogProductsProps> = ({
	filteredProducts,
	products,
	currentPage,
	productsPerPage,
	dataLoading,
	operationResultMessage,
}) => {
	const getProducts = () => {
		if (filteredProducts && JSON.stringify(filteredProducts) !== "{}")
			return { filteredProducts: Object.values(filteredProducts) };
		return { products: Object.values(products) };
	};

	const getPageProducts = () => {
		const products = getProducts();
		const startIndex = (currentPage - 1) * productsPerPage;
		const endIndex = startIndex + productsPerPage;
		let pageProducts: Product[] = [];
		if (products.filteredProducts) {
			pageProducts = products.filteredProducts.slice(startIndex, endIndex);
		} else if (products.products) {
			pageProducts = products.products.slice(startIndex, endIndex);
		}
		return pageProducts;
	};

	const canDisplayCatalogProducts = () =>
		!dataLoading && !operationResultMessage.error && getPageProducts();

	return (
		<>
			{canDisplayCatalogProducts() && (
				<ul
					className={
						"flex flex-row flex-wrap items-center gap-y-[3rem] gap-x-[3rem] " +
						"justify-center md:grid md:grid-cols-two lg:grid-cols-4"
					}
				>
					{getPageProducts().map((product) => (
						<li className="w-full" key={product.id}>
							<Card3dFlip data={product}>
								<ProductCard data={product} cardType="advanced" />
							</Card3dFlip>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default CatalogProducts;
