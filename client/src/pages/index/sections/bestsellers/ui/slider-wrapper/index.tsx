import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { BestsellersSlider } from "widgets/bestsellers-slider";

import { productModel } from "entities/product";

import { Spinner, Button } from "shared/ui";

const ProductsLoading = () => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-normal font-raleway text-sm-14px mb-[1rem] md:text-md-18px"}>
				Загрузка товаров
			</p>
			<Spinner width={"3rem"} height={"3rem"} color={"blue-zodiac-950"} />
		</div>
	);
};

const ProductsNotFound = ({ reload }: { reload: any }) => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-raleway text-sm-14px mb-[1rem] md:text-md-18px font-medium"}>
				Неудалось загрузить товары.
			</p>
			<Button text={"Обновить"} click={reload} />
		</div>
	);
};

const BestSellersNotFound = () => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-raleway text-sm-14px mb-[1rem] md:text-md-16px font-medium"}>
				Не найдено не одного бестселлера.
			</p>
		</div>
	);
};

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

	if (isLoading) return <ProductsLoading />;
	if (isEmpty) return <ProductsNotFound reload={() => setReload(Math.random())} />;
	if (bestsellers.length === 0) return <BestSellersNotFound />;

	return <BestsellersSlider bestSellers={bestsellers} />;
};

export default SliderWrapper;
