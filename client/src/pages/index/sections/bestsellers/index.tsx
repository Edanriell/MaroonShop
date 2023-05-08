import { useDispatch } from "react-redux";

import { productModel } from "entities/product";

import { Button } from "shared/ui";
import { BestsellersSlider } from "./ui";

type Props = {
	title: string;
};

const Bestsellers = ({ title }: Props) => {
	const dispatch = useDispatch();

	const { isFetching } = productModel.getProductsAsync()(dispatch);
	const bestSellers = productModel.getBestsellers();
	const isEmpty = productModel.isProductsEmpty();

	if (isFetching) return <div>Loading...</div>;

	if (isEmpty) return <div>Products not found</div>;

	return (
		<div className="container pt-[8rem] pb-[8rem] relative md:grid md:grid-rows-5-auto md:grid-cols-bestsellers-two md:gap-x-[4rem] md:pl-[4.5rem] md:pr-[0rem] md:mr-[auto] md:ml-[auto] md:pt-[12rem] md:pb-[12rem]">
			<header className="flex flex-col gap-y-[2.5rem] mb-[5rem] items-center md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 md:gap-y-[1.4rem] md:mb-0 md:items-start md:mt-[4.6rem]">
				<h2 className="font-medium font-raleway text-sm-28px text-blue-zodiac-950 md:text-md-32px-lh-42px">
					{title}
				</h2>
				<p className="font-normal font-mPLus text-sm-16px text-blue-zodiac-950 w-[19rem] text-center md:text-md-18px md:text-left md:w-full">
					Легендарные продукты, завоевавшие любовь наших клиентов
				</p>
			</header>
			<div className="md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-6">
				<BestsellersSlider classes="" bestSellers={bestSellers} />
			</div>
			<div className="mt-[4rem] text-center md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 md:text-left md:mt-[3.3rem]">
				<Button type="link" text="Смотреть все" link="/" />
			</div>
		</div>
	);
};

export default Bestsellers;
