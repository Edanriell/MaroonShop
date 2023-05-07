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
		<div className="container pt-[8rem] pb-[8rem] relative">
			<header className="flex flex-col gap-x-[2.5rem] mb-[5rem] items-center">
				<h2 className="font-medium font-raleway text-sm-28px text-blue-zodiac-950">
					{title}
				</h2>
				<p className="font-normal font-mPLus text-sm-16px text-blue-zodiac-950 w-[19rem] text-center">
					Легендарные продукты, завоевавшие любовь наших клиентов
				</p>
			</header>
			<BestsellersSlider bestSellers={bestSellers} />
			<div className="mt-[4rem] text-center">
				<Button type="link" text="Смотреть все" link="/" />
			</div>
		</div>
	);
};

export default Bestsellers;
