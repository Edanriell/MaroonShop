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

	// TODO How works ??
	const products = useSelector((state: productModel.RootState) => state.products);

	// TODO FIX THIS TRASH CODE
	const { data, filteredData } = products;
	// TODO FIX THIS TRASH CODE

	const [currentPage, setCurrentPage] = useState<number>(initialPage);

	// TODO FIX THIS TRASH CODE
	const [totalPages, setTotalPages] = useState<number>(0);
	// TODO FIX THIS TRASH CODE

	const productsPerPage = 12;
	// const totalPages = ;

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
	}, [currentPage, dispatch]);

	useEffect(() => {
		if (initialPage <= 0 || (initialPage > totalPages && totalPages !== 0)) {
			navigate("?page=1");
			setCurrentPage(1);
		} else {
			setCurrentPage(initialPage);
		}
	}, [totalPages, initialPage, currentPage, navigate]);

	// TODO FIX THIS TRASH CODE
	useEffect(() => {
		if (filteredData) {
			setTotalPages(Math.ceil(Object.values(filteredData).length / productsPerPage));
		} else {
			setTotalPages(Math.ceil(Object.values(data).length / productsPerPage));
		}
	}, [filteredData, data]);
	// TODO FIX THIS TRASH CODE

	const getPageProducts = () => {
		// TODO FIX THIS TRASH CODE
		const allProducts = getAllProducts();
		function getAllProducts() {
			if (filteredData) {
				return Object.values(filteredData);
			}
			return Object.values(data);
		}
		// TODO FIX THIS TRASH CODE

		const startIndex = (currentPage - 1) * productsPerPage;
		const endIndex = startIndex + productsPerPage;
		return allProducts.slice(startIndex, endIndex);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		navigate(`?page=${page}`);
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
