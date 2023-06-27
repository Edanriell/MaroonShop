import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import {
	MobileSlider,
	UniversalSlider,
	BestsellersLoading,
	BestsellersError,
	BestsellersNotFound,
} from "./ui";

const Bestsellers = () => {
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const store = useSelector((state: productModel.RootState) => state.products);
	const { dataLoading } = store;

	const products = productModel.useProducts();
	const bestsellers = productModel.useBestsellers({ sells: 100 });

	const isEmpty = productModel.isProductsEmpty(products);

	const { width } = useScreenSize();

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	if (dataLoading) return <BestsellersLoading />;
	if (isEmpty) return <BestsellersError onReloadButtonClick={handleReloadButtonClick} />;
	if (bestsellers.length === 0) return <BestsellersNotFound />;

	if (width >= 768) return <UniversalSlider bestSellers={bestsellers} className={""} />;

	return <MobileSlider bestSellers={bestsellers} className={""} />;
};

export default Bestsellers;
