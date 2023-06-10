import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useNavigate, useLocation } from "react-router-dom";

import Filter from "features/filter";

import { productModel, ProductCard } from "entities/product";

import { CatalogProps } from "./types";

const CatalogPagination = ({
	products,
	currentPage,
	productsPerPage,
	onPageChange,
}: {
	products: productModel.NormalizedProducts;
	currentPage: number;
	productsPerPage: number;
	onPageChange: (page: number) => void;
}) => {
	const allProducts = Object.values(products);
	const totalPages = Math.ceil(allProducts.length / productsPerPage);
	const pageButtons = [];

	for (let page = 1; page <= totalPages; page++) {
		pageButtons.push(
			<button key={page} onClick={() => onPageChange(page)} disabled={page === currentPage}>
				{page}
			</button>,
		);
	}

	return <>{pageButtons}</>;
};

const Catalog: FC<CatalogProps> = ({ title }) => {
	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const navigate = useNavigate();
	const location = useLocation();

	const searchParams = new URLSearchParams(location.search);
	const pageParam = searchParams.get("page");
	const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

	const products = useSelector((state: productModel.RootState) => state.products);
	const { data } = products;

	const [currentPage, setCurrentPage] = useState<number>(initialPage);
	const productsPerPage = 12;
	const totalPages = Math.ceil(Object.values(data).length / productsPerPage);

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

	const getPageProducts = () => {
		const allProducts = Object.values(data);
		const startIndex = (currentPage - 1) * productsPerPage;
		const endIndex = startIndex + productsPerPage;
		return allProducts.slice(startIndex, endIndex);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		navigate(`?page=${page}`);
	};

	return (
		<div className={"pt-[3rem] pb-[7rem] pl-[1.5rem] pr-[1.5rem]"}>
			<div className={"mb-[4rem] flex flex-row justify-between"}>
				<div className={"flex-shrink-0 flex-grow-0"}>
					<h2
						className={
							"font-raleway font-normal text-sm-28px text-left text-blue-zodiac-950"
						}
					>
						{title}
					</h2>
				</div>
				<div className={"flex-shrink-0 flex-grow-0"}>
					<Filter />
				</div>
			</div>
			<div>
				<div>
					{getPageProducts().map((product) => (
						<ProductCard key={product.id} data={product} />
					))}
				</div>
				<CatalogPagination
					products={data}
					currentPage={currentPage}
					productsPerPage={productsPerPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default Catalog;
