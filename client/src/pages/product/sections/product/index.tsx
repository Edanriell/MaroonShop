import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { Accordion, Button, Radio } from "shared/ui";

import styles from "./styles.module.scss";

const Product = () => {
	const store = useSelector((state: productModel.RootState) => state.products);
	const { dataLoading } = store;

	const { productId } = useParams();

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const product = productModel.useProduct(+productId!);

	useEffect(() => {
		dispatch(productModel.getProductByIdAsync(+productId!));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const priceContainerRef = useRef(null);

	if (dataLoading) {
		return <div>LOADING</div>;
	}

	if (!product) return null;

	return (
		<>
			<h1 className={"sr-only"}>{"Страница товара " + product.name}</h1>
			<article className={"px-[1.5rem] pt-[4rem] pb-[7.2rem]"}>
				<picture>
					<source media="(min-width:1366px)" srcSet={product.image.lg} />
					<source media="(min-width:768px)" srcSet={product.image.md} />
					<source media="(min-width:320px)" srcSet={product.image.sm} />
					<img
						className={"w-[90.625vw] h-[81.25vw] object-cover"}
						src={product.image.lg}
						alt={product.name}
					/>
				</picture>
				<div>
					<header className={"pt-[4.2rem] pb-[1.9rem]"}>
						<h2
							className={
								"font-raleway font-medium text-sm-28px text-blue-zodiac-950 pb-[1.5rem]"
							}
						>
							{product.name}
						</h2>
						<p className={"font-mPlus font-normal text-sm-16px text-manatee-500"}>
							CATEGORY
						</p>
					</header>
					<div>
						<div className={"pb-[3.3rem] gap-y-[0.9rem] flex flex-col"}>
							{product.description.map((text, index) => (
								<p
									key={index}
									className={
										"font-mPlus font-normal text-sm-16px text-blue-zodiac-950"
									}
								>
									{text}
								</p>
							))}
						</div>
						<div className={"border-t-[0.1rem] border-bombay-400 pt-[1.2rem]"}>
							<Accordion
								triggerName={"Состав"}
								triggerType={"div"}
								splitterColor={"bg-bombay-400"}
								contentWithinSplitter={true}
								triggerNameClasses={styles.textSm16Important}
							>
								<p
									className={
										"font-mPlus font-normal text-sm-14px text-blue-zodiac-950 text-left"
									}
								>
									{product.components}
								</p>
							</Accordion>
						</div>
						<Accordion
							triggerName={"Способ применения"}
							triggerType={"div"}
							splitterColor={"bg-bombay-400"}
							contentWithinSplitter={true}
							triggerNameClasses={styles.textSm16Important}
						>
							<p
								className={
									"font-mPlus font-normal text-sm-14px text-blue-zodiac-950 text-left"
								}
							>
								{product.usage}
							</p>
						</Accordion>
					</div>
					<footer className={"pt-[2.4rem]"}>
						<form action="#" method="get">
							<fieldset className={"border-none inline-flex items-center p-0"}>
								<legend className={"contents"}>
									<span
										className={
											"font-mPlus text-sm-16px font-medium text-blue-zodiac-950 " +
											"mr-[1.5rem] flex-shrink-0 flex-grow-0"
										}
									>
										Объем:
									</span>
								</legend>
								<Radio
									data={[product.quantity, product.price]}
									name={"Объем"}
									priceContainerRef={priceContainerRef}
								/>
							</fieldset>
							<div
								className={
									"flex flex-row items-center justify-between mt-[4.1rem] " +
									"min-[338px]:justify-normal min-[338px]:gap-x-[3.5rem]"
								}
							>
								<div
									ref={priceContainerRef}
									className={"flex flex-row items-center gap-x-[0.5rem]"}
								>
									<div className={"w-[5.99rem]"}></div>
								</div>
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
