import { useState, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
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

	const products = productModel.useProducts();
	const filteredProducts = productModel.useFilteredProducts();

	const [currentPage, setCurrentPage] = useState<number>(initialPage);
	const [totalPages, setTotalPages] = useState<number>(0);

	const productsPerPage: 12 = 12;

	const isDataLoading = productModel.useIsDataLoading();
	const operationResultMessage = productModel.useOperationResultMessage();

	useEffect(() => {
		dispatch(productModel.setFilteredProducts({}));
	}, [dispatch]);

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
	}, [reload, dispatch]);

	useEffect(() => {
		if (initialPage <= 0 || (initialPage > totalPages && totalPages !== 0)) {
			navigate("?page=1");
			setCurrentPage(1);
		} else {
			setCurrentPage(initialPage);
		}
	}, [totalPages, initialPage, currentPage, navigate]);

	useEffect(() => {
		if (filteredProducts && JSON.stringify(filteredProducts) !== "{}") {
			setTotalPages(Math.ceil(Object.values(filteredProducts).length / productsPerPage));
		} else {
			setTotalPages(Math.ceil(Object.values(products).length / productsPerPage));
		}
	}, [filteredProducts, products]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		navigate(`?page=${page}`);
	};

	const handleReloadButtonClick = () => {
		setReload(Math.random());
	};

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
				<CatalogLoading dataLoading={isDataLoading} />
				<CatalogError
					dataLoading={isDataLoading}
					operationResultMessage={operationResultMessage}
					onReloadButtonClick={handleReloadButtonClick}
				/>
				<CatalogProducts
					filteredProducts={filteredProducts}
					products={products}
					currentPage={currentPage}
					productsPerPage={productsPerPage}
					dataLoading={isDataLoading}
					operationResultMessage={operationResultMessage}
				/>
				<CatalogPagination
					dataLoading={isDataLoading}
					operationResultMessage={operationResultMessage}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Catalog;
