import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { productModel } from "entities/product";

import { Button } from "shared/ui";

type Props = {
	title: string;
};

function Bestsellers({ title }: Props) {
	const products = useSelector((state) => (state as any).products);

	useEffect(() => {
		console.log(products);
	});
	const dispatch = useDispatch();
	const { isFetching } = productModel.getProductsListAsync()(dispatch);
	const isEmpty = productModel.isProductsEmpty();
	if (isFetching) return <div>Loading...</div>;
	if (isEmpty) return <div>Products not found</div>;

	return (
		<div className="container pt-[6rem] pb-[8rem] relative">
			<header className="flex flex-col gap-x-[2.5rem] mb-[5rem]">
				<h2 className="font-medium font-raleway text-sm-28px text-blue-zodiac-950">
					{title}
				</h2>
				<p className="font-normal font-mPLus text-sm-16px text-blue-zodiac-950">
					Легендарные продукты, завоевавшие любовь наших клиентов
				</p>
			</header>
			{/* <ProductCard/> */}
			<Button type="link" text="Смотреть все" link="/" />
		</div>
	);
}

export default Bestsellers;
