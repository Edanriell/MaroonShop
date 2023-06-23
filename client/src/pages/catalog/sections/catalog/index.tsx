import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useNavigate, useLocation } from "react-router-dom";

import Filter from "features/filter";

import { productModel, ProductCard } from "entities/product";

import { CatalogPagination } from "./ui";

import { CatalogProps } from "./types";

const Catalog: FC<CatalogProps> = ({ title }) => {
	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);
	const pageParam = searchParams.get("page");
	const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

	const products = useSelector((state: productModel.RootState) => state.products);
	const { data, filteredData, dataLoading } = products;

	const [currentPage, setCurrentPage] = useState<number>(initialPage);
	const [totalPages, setTotalPages] = useState<number>(0);

	const productsPerPage: 12 = 12;

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (initialPage <= 0 || (initialPage > totalPages && totalPages !== 0)) {
			navigate("?page=1");
			setCurrentPage(1);
		} else {
			setCurrentPage(initialPage);
		}
	}, [totalPages, initialPage, currentPage, navigate]);

	useEffect(() => {
		if (filteredData) {
			setTotalPages(Math.ceil(Object.values(filteredData).length / productsPerPage));
		} else {
			setTotalPages(Math.ceil(Object.values(data).length / productsPerPage));
		}
	}, [filteredData, data]);

	function getProducts() {
		if (filteredData) return Object.values(filteredData);
		return Object.values(data);
	}

	function getPageProducts() {
		const products = getProducts();
		const startIndex = (currentPage - 1) * productsPerPage;
		const endIndex = startIndex + productsPerPage;
		return products.slice(startIndex, endIndex);
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
		navigate(`?page=${page}`);
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
				<ul
					className={
						"flex flex-row flex-wrap items-center gap-y-[3rem] gap-x-[3rem] " +
						"justify-center md:grid md:grid-cols-two lg:grid-cols-4"
					}
				>
					{getPageProducts().map((product) => (
						<li className="w-full" key={product.id}>
							<ProductCard data={product} cardType="advanced" />
						</li>
					))}
				</ul>
				<CatalogPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Catalog;
