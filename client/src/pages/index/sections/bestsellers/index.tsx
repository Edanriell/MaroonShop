import { useDispatch } from "react-redux";

import { productModel } from "entities/product";
import { Button } from "shared/ui";
import { BestsellersSlider } from "./ui";
import { BestsellersProps } from "./types";

// TODO Add spinner and Products not found !
const Bestsellers = ({ title }: BestsellersProps) => {
	const dispatch = useDispatch();

	const { isFetching } = productModel.getProductsAsync()(dispatch);
	const bestSellers = productModel.getBestsellers();
	const isEmpty = productModel.isProductsEmpty();

	const SliderWrapper = () => {
		if (isFetching) return <div>Loading...</div>;

		if (isEmpty) return <div>Products not found</div>;

		if (bestSellers.length == 0) return <div>Bestsellers not found</div>;

		return <BestsellersSlider bestSellers={bestSellers} />;
	};

	return (
		<div
			className={
				"pt-[7.2rem] pb-[8rem] relative md:grid md:grid-rows-5-auto " +
				"md:grid-cols-bestsellers-two md:gap-x-[4rem] md:pl-[4.5rem] md:pr-[0rem] " +
				"md:mr-[auto] md:ml-[auto] md:pt-[12rem] md:pb-[12rem] lg:pt-[14rem] " +
				"lg:pb-[14rem] lg:gap-x-[8.6rem] lg:pl-[9.8rem]"
			}
		>
			<header
				className={
					"flex flex-col gap-y-[1.15rem] mb-[4.45rem] items-center md:col-start-1 " +
					"md:col-end-2 md:row-start-1 md:row-end-3 md:gap-y-[1.4rem] md:mb-0 " +
					"md:items-start md:mt-[4.6rem] lg:gap-y-[1.3rem] lg:mt-[4.65rem]"
				}
			>
				<h2
					className={
						"font-medium font-raleway text-sm-28px text-blue-zodiac-950 " +
						"md:text-md-32px-lh-42px"
					}
				>
					{title}
				</h2>
				<p
					className={
						"font-normal font-mPLus text-sm-16px text-blue-zodiac-950 " +
						"min-w-[19rem] text-center md:text-md-18px md:text-left md:w-full " +
						"pl-[5rem] pr-[5rem] md:pl-[0rem] md:pr-[0rem]"
					}
				>
					Легендарные продукты, завоевавшие любовь наших клиентов
				</p>
			</header>
			<div className={"md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-6"}>
				<SliderWrapper />
			</div>
			<div
				className={
					"mt-[4rem] text-center md:col-start-1 md:col-end-2 md:row-start-3 " +
					"md:row-end-4 md:text-left md:mt-[3.35rem] lg:mt-[3.3rem]"
				}
			>
				<Button
					classes={"md:pr-[2.3rem] md:pl-[2.3rem] lg:pr-[2.3rem] lg:pl-[2.3rem]"}
					type="link-internal"
					text="Смотреть все"
					linkInternal="/"
				/>
			</div>
		</div>
	);
};

export default Bestsellers;
