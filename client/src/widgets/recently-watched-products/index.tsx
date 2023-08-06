import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import {
	MobileSlider,
	TabletSlider,
	DesktopSlider,
	RecentlyWatchedProductsError,
	RecentlyWatchedProductsLoading,
} from "./ui";

import { RecentlyWatchedProductsProps } from "./types";

const RecentlyWatchedProducts: FC<RecentlyWatchedProductsProps> = ({ title }) => {
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const store = useSelector((state: productModel.RootState) => state.products);
	const { dataLoading } = store;

	const mostViewedProducts = productModel.useMostViewedProducts({ maxProductsCount: 20 });

	const isEmpty = productModel.isMostViewedProductsEmpty(mostViewedProducts);

	const { width } = useScreenSize();

	useEffect(() => {
		// Change to fetching recent watcher products later.
		dispatch(productModel.getProductsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	if (dataLoading) {
		return <RecentlyWatchedProductsLoading />;
	}

	if (!dataLoading && isEmpty) {
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
			{width < 768 && <MobileSlider mostViewedProducts={mostViewedProducts} />}
			{width >= 768 && width < 1366 && (
				<TabletSlider mostViewedProducts={mostViewedProducts} />
			)}
			{width >= 1366 && <DesktopSlider mostViewedProducts={mostViewedProducts} />}
		</article>
	);
};

export default RecentlyWatchedProducts;
