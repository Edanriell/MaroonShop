import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

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
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const recentlyWatchedProducts = productModel.useRecentlyWatchedProducts();

	const isDataLoading = productModel.useIsUserLastViewedDataLoading();

	const operationResultMessage = productModel.useUserLastViewedDataOperationResultMessage();

	const { width } = useScreenSize();

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
	}, [reload, dispatch]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	if (isDataLoading) {
		return <RecentlyWatchedProductsLoading />;
	}

	if (operationResultMessage.error) {
		return <RecentlyWatchedProductsError onReloadButtonClick={handleReloadButtonClick} />;
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
				<RecentlyWatchedProductsMobileSlider mostViewedProducts={mostViewedProducts} />
			)}
			{width >= 768 && width < 1366 && (
				<RecentlyWatchedProductsTabletSlider mostViewedProducts={mostViewedProducts} />
			)}
			{width >= 1366 && (
				<RecentlyWatchedProductsDesktopSlider mostViewedProducts={mostViewedProducts} />
			)}
		</article>
	);
};

export default RecentlyWatchedProducts;
