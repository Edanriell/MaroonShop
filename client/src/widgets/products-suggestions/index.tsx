import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { useScreenSize } from "shared/lib/hooks";

import { Button } from "shared/ui";

import { MobileSlider, TabletSlider, DesktopSlider } from "./ui";

import { ProductsSuggestionsProps } from "./types";

const ProductsSuggestions: FC<ProductsSuggestionsProps> = ({ title }) => {
	const [reload, setReload] = useState<number>(Math.random());

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const store = useSelector((state: productModel.RootState) => state.products);
	const { dataLoading } = store;

	const mostViewedProducts = productModel.useMostViewedProducts({ maxProductsCount: 20 });

	const isEmpty = productModel.isMostViewedProductsEmpty(mostViewedProducts);

	const { width } = useScreenSize();

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	function handleReloadButtonClick() {
		setReload(Math.random());
	}

	return (
		<article className={"mb-[8rem]"}>
			<h2
				className={
					"text-center font-raleway text-sm-28px-lh-35px font-medium text-blue-zodiac-950 mb-[3.2rem]"
				}
			>
				{title}
			</h2>
			{width < 768 && <MobileSlider mostViewedProducts={mostViewedProducts} />}
			{width < 768 && <TabletSlider mostViewedProducts={mostViewedProducts} />}
			{width < 768 && <DesktopSlider mostViewedProducts={mostViewedProducts} />}
		</article>
	);
};

export default ProductsSuggestions;