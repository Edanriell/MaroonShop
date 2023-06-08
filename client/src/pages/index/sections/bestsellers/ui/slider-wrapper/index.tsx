import { useDispatch } from "react-redux";

import { BestsellersSlider } from "widgets/bestsellers-slider";

import { productModel } from "entities/product";

import { Spinner } from "shared/ui";

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

const ProductsNotFound = () => {
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
			<p className={"font-raleway text-sm-14px mb-[1rem] font-normal"}>
				Попробуйте обновить страницу.
			</p>
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
	const dispatch = useDispatch();

	const { isFetching } = productModel.getProductsAsync()(dispatch);
	const bestsellers = productModel.getBestsellers();
	const isEmpty = productModel.isProductsEmpty();

	if (isFetching) return <ProductsLoading />;

	if (isEmpty) return <ProductsNotFound />;

	if (bestsellers.length === 0) return <BestSellersNotFound />;

	return <BestsellersSlider bestSellers={bestsellers} />;
};

export default SliderWrapper;
