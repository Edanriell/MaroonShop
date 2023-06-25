import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { BestsellersSlider } from "widgets/bestsellers-slider";

import { productModel } from "entities/product";

import { ProductsLoading, ProductsNotFound, BestsellersNotFound } from "./ui";

const SliderWrapper = () => {
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const products = useSelector((state: productModel.RootState) => state.products.data);
	const isLoading = useSelector((state: productModel.RootState) => state.products.dataLoading);

	const isEmpty = productModel.isProductsEmpty(products);
	const bestsellers = productModel.getBestsellers(products);

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	if (isLoading) return <ProductsLoading />;
	if (isEmpty) return <ProductsNotFound onReloadButtonClick={handleReloadButtonClick} />;
	if (bestsellers.length === 0) return <BestsellersNotFound />;

	return <BestsellersSlider bestSellers={bestsellers} />;
};

export default SliderWrapper;
