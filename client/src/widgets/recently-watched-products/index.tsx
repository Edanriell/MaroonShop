import { FC, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { sessionModel } from "entities/session";

import { Product } from "shared/api";

import { useScreenSize } from "shared/lib/hooks";

import {
	RecentlyWatchedProductsMobileSlider,
	RecentlyWatchedProductsTabletSlider,
	RecentlyWatchedProductsDesktopSlider,
	RecentlyWatchedProductsError,
	RecentlyWatchedProductsLoading,
} from "./ui";

import { RecentlyWatchedProductsProps } from "./types";

const RecentlyWatchedProducts: FC<RecentlyWatchedProductsProps> = ({ title }) => {
	// Problem here if NO PRODUCTS 
	const [recentlyWatchedProducts, setRecentlyWatchedProducts] = useState<Product[] | []>([]);

	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const isDataLoading = productModel.useIsUserRecentlyWatchedDataLoading();

	const operationResultMessage = productModel.useUserRecentlyWatchedDataOperationResultMessage();

	const user = sessionModel.useUser();

	const isUserAuthorized = sessionModel.useIsAuthorized();

	const recentlyWatchedProductsFromServer = productModel.useRecentlyWatchedProducts();

	const { width } = useScreenSize();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useEffect(() => {
		if (isUserAuthorized) {
			dispatch(
				productModel.getRecentlyWatchedProductsAsync({
					productsCount: 14,
					userId: (user as any).id,
				}),
			);
		} else {
			const recentlyWatchedProductsJson = localStorage.getItem("lastWatchedProducts");

			if (recentlyWatchedProductsJson) {
				const clearedRecentlyWatchedProducts = JSON.parse(recentlyWatchedProductsJson)
					.sort((a: any, b: any) => {
						if (a.userViewsCount !== b.userViewsCount) {
							return b.userViewsCount - a.userViewsCount;
						}
						return b.viewDate - a.viewDate;
					})
					.map((product: any) => product.product);

				setRecentlyWatchedProducts(clearedRecentlyWatchedProducts);
			}
		}
	}, [reload, dispatch, isUserAuthorized, user]);

	useEffect(() => {
		if (Object.values(recentlyWatchedProductsFromServer).length > 0) {
			setRecentlyWatchedProducts(Object.values(recentlyWatchedProductsFromServer));
		}
	}, [recentlyWatchedProductsFromServer]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	if (isDataLoading) {
		return <RecentlyWatchedProductsLoading />;
	}

	if (operationResultMessage.error || recentlyWatchedProducts.length === 0) {
		return (
			<RecentlyWatchedProductsError
				errorMessage={
					operationResultMessage.error || "Вы пока не посмотрели не один товар."
				}
				onReloadButtonClick={handleReloadButtonClick}
			/>
		);
	}

	return (
		<article>
			<h2
				className={
					"min-w-[16rem] text-center font-raleway text-sm-28px-lh-35px font-medium " +
					"text-blue-zodiac-950 mb-[3.2rem] md:text-md-32px md:mb-[5.1rem] " +
					"ml-[4rem] mr-[4rem] md:max-w-none"
				}
			>
				{title}
			</h2>
			{width < 768 && (
				<RecentlyWatchedProductsMobileSlider
					recentlyWatchedProducts={recentlyWatchedProducts}
				/>
			)}
			{width >= 768 && width < 1366 && (
				<RecentlyWatchedProductsTabletSlider
					recentlyWatchedProducts={recentlyWatchedProducts}
				/>
			)}
			{width >= 1366 && (
				<RecentlyWatchedProductsDesktopSlider
					recentlyWatchedProducts={recentlyWatchedProducts}
				/>
			)}
		</article>
	);
};

export default RecentlyWatchedProducts;
