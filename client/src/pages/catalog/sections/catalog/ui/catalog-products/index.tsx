import { FC } from "react";

import { ProductCard } from "entities/product";

import { CatalogProductsProps, CatalogProductsWrapperProps } from "./types";

const CatalogProductsWrapper: FC<CatalogProductsWrapperProps> = ({ children }) => {
	return (
		<ul
			className={
				"flex flex-row flex-wrap items-center gap-y-[3rem] gap-x-[3rem] " +
				"justify-center md:grid md:grid-cols-two lg:grid-cols-4"
			}
		>
			{children}
		</ul>
	);
};

const CatalogProducts: FC<CatalogProductsProps> = ({
	filteredProducts,
	products,
	currentPage,
	productsPerPage,
	dataLoading,
}) => {
	function getProducts() {
		if (filteredProducts) return Object.values(filteredProducts);
		return Object.values(products);
	}

	function getPageProducts() {
		const products = getProducts();
		const startIndex = (currentPage - 1) * productsPerPage;
		const endIndex = startIndex + productsPerPage;
		return products.slice(startIndex, endIndex);
	}

	return (
		<>
			{!dataLoading && filteredProducts && "error" in filteredProducts && (
				<div
					className={
						"col-start-1 col-end-[-1] items-center justify-center " +
						"font-raleway font-medium text-sm-18px text-blue-zodiac-950 " +
						"text-center mt-[12rem] md:mt-[14rem] md:text-[2rem] lg:text-[2.4rem]"
					}
				>
					По вашему запросу не найдено не одного товара.
				</div>
			)}
			{!dataLoading && products && !(filteredProducts && "error" in filteredProducts) && (
				<CatalogProductsWrapper>
					{getPageProducts().map((product) => (
						<li className="w-full" key={product.id}>
							<ProductCard data={product} cardType="advanced" />
						</li>
					))}
				</CatalogProductsWrapper>
			)}
		</>
	);
};

export default CatalogProducts;
