import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useNavigate, useLocation } from "react-router-dom";

import Filter from "features/filter";

import { productModel } from "entities/product";

import { CatalogPagination, CatalogProducts, CatalogLoading, CatalogError } from "./ui";

import { CatalogProps } from "./types";

const Catalog: FC<CatalogProps> = ({ title }) => {
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);
	const pageParam = searchParams.get("page");
	const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

	const store = useSelector((state: productModel.RootState) => state.products);
	const { dataLoading } = store;

	const products = productModel.useProducts();
	const filteredProducts = productModel.useFilteredProducts();

	const [currentPage, setCurrentPage] = useState<number>(initialPage);
	const [totalPages, setTotalPages] = useState<number>(0);

	const productsPerPage: 12 = 12;

	const isProductsEmpty = productModel.isProductsEmpty(products);
	const isFilteredProductsEmpty = productModel.isFilteredProductsEmpty(filteredProducts);

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	useEffect(() => {
		if (initialPage <= 0 || (initialPage > totalPages && totalPages !== 0)) {
			navigate("?page=1");
			setCurrentPage(1);
		} else {
			setCurrentPage(initialPage);
		}
	}, [totalPages, initialPage, currentPage, navigate]);

	useEffect(() => {
		if (filteredProducts) {
			setTotalPages(Math.ceil(Object.values(filteredProducts).length / productsPerPage));
		} else {
			setTotalPages(Math.ceil(Object.values(products).length / productsPerPage));
		}
	}, [filteredProducts, products]);

	function handlePageChange(page: number) {
		setCurrentPage(page);
		navigate(`?page=${page}`);
	}

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	return (
		<div
			className={
				"pt-[3rem] pb-[7rem] md:pr-[4.5rem] " +
				"md:pl-[4.5rem] md:pt-[3.6rem] md:pb-[11rem] " +
				"relative lg:pt-[3.7rem] lg:pb-[13rem]"
			}
		>
			<div
				className={"lg:pr-[2.3rem] lg:pl-[2.3rem] lg:mr-auto lg:ml-auto lg:max-w-[120rem]"}
			>
				<div
					className={
						"mb-[4rem] flex flex-row items-center justify-between md:mb-[3.6rem] lg:mb-[4.9rem]"
					}
				>
					<h2
						className={
							"font-raleway font-normal text-sm-28px text-left text-blue-zodiac-950 " +
							"md:text-md-36px justify-self-start row-start-1 row-end-2 pl-[1.5rem] " +
							"z-[14] md:pl-[0rem]"
						}
					>
						{title}
					</h2>
					<Filter className={"md:pl-[4.1rem] md:pr-[4.1rem]"} />
				</div>
			</div>
			<div
				className={
					"pl-[1.5rem] pr-[1.5rem] md:pl-[0rem] md:pr-[0rem] lg:pr-[2.3rem] " +
					"lg:pl-[2.3rem] lg:mr-auto lg:ml-auto lg:max-w-[120rem]"
				}
			>
				<CatalogLoading dataLoading={dataLoading} />
				<CatalogError
					dataLoading={dataLoading}
					isProductsEmpty={isProductsEmpty}
					isFilteredProductsEmpty={isFilteredProductsEmpty}
					onReloadButtonClick={handleReloadButtonClick}
				/>
				<CatalogProducts
					filteredProducts={filteredProducts}
					products={products}
					currentPage={currentPage}
					productsPerPage={productsPerPage}
					dataLoading={dataLoading}
				/>
				<CatalogPagination
					dataLoading={dataLoading}
					isProductsEmpty={isProductsEmpty}
					filteredProducts={filteredProducts}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Catalog;
