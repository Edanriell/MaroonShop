import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { Accordion, Button } from "shared/ui";

const Product = () => {
	const [productPrice, setProductPrice] = useState<number | null>(null);

	const store = useSelector((state: productModel.RootState) => state.products);
	const { dataLoading } = store;

	const { productId } = useParams();

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const product = productModel.useProduct(+productId!);

	useEffect(() => {
		dispatch(productModel.getProductByIdAsync(+productId!));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(product);

	if (dataLoading) {
		return <div>LOADING</div>;
	}

	if (!product) return null;

	return (
		<>
			<h1 className={"sr-only"}>{"Страница товара " + product.name}</h1>
			<article>
				<picture>
					<source media="(min-width:1366px)" srcSet={product.image.lg} />
					<source media="(min-width:768px)" srcSet={product.image.md} />
					<source media="(min-width:320px)" srcSet={product.image.sm} />
					<img src={product.image.lg} alt={product.name} />
				</picture>
				<div>
					<header>
						<h2>{product.name}</h2>
						<p>CATEGORY</p>
					</header>
					<div>
						<div>
							{product.description.map((text, index) => (
								<p key={index}>{text}</p>
							))}
						</div>
						<Accordion triggerName={"Состав"} triggerType={"div"}>
							<p>{product.components}</p>
						</Accordion>
						<Accordion triggerName={"Способ применения"} triggerType={"div"}>
							<p>{product.usage}</p>
						</Accordion>
					</div>
					<footer>
						<form action="#" method="get">
							<fieldset>
								<legend>
									<span>Объем:</span>
								</legend>
								{product.quantity.map((quantity, index) => (
									<div key={index}>
										<label htmlFor={`${product.price[index]}`}>
											{quantity}
										</label>
										<div key={index}>
											<input
												type="radio"
												name={product.name}
												id={`${product.price[index]}`}
											/>
										</div>
									</div>
								))}
							</fieldset>
							<div>
								{productPrice && <b>{productPrice}</b>}
								<Button text={"Добавить в корзину"} />
							</div>
						</form>
					</footer>
				</div>
			</article>
		</>
	);
};

export default Product;
