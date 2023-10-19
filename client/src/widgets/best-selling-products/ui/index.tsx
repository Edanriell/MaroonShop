import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import {
	BestSellingProductsSliderMobile,
	BestSellingProductsSliderUniversal,
	BestSellingProductsLoading,
	BestSellingProductsError,
} from "./ui";

const BestSellingProducts = () => {
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const bestSellingProducts = productModel.useFilteredProducts();

	const isDataLoading = productModel.useIsFilteredDataLoading();
	const operationResultMessage = productModel.useFilteredDataOperationResultMessage();

	const { width } = useScreenSize();

	useEffect(() => {
		dispatch(productModel.getBestSellingProductsAsync({ sells: 400, productsCount: 20 }));
	}, [reload, dispatch]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	if (isDataLoading) return <BestSellingProductsLoading />;
	if (operationResultMessage.error)
		return (
			<BestSellingProductsError
				onReloadButtonClick={handleReloadButtonClick}
				errorMessage={operationResultMessage.error}
			/>
		);

	if (width >= 768)
		return <BestSellingProductsSliderUniversal bestSellingProducts={bestSellingProducts} />;
	return <BestSellingProductsSliderMobile bestSellingProducts={bestSellingProducts} />;
};

export default BestSellingProducts;
