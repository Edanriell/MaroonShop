import { useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { sessionModel } from "entities/session";

import { Accordion, Button, Radio } from "shared/ui";

import { getProductType } from "shared/lib/functions";

import { ProductLoading, ProductError } from "./ui";

import styles from "./styles.module.scss";

const Product = () => {
	// If user is not authorized we save info about product in local storage
	// In format lastViewedProducts = [{viewDate, viewsCount, product}]
	// we make a request to server with id we have it done "product" save info in local storage
	// if product is not found create one if it is than we just update the product viewDate
	// If user is authorized we get lastViewedProducts from it;s user data from DB
	// and use it

	// perfect place to increment views
	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const { productId } = useParams();

	const isDataLoading = productModel.useIsFilteredDataLoading();

	const operationResultMessage = productModel.useFilteredDataOperationResultMessage();

	const [product] = Object.values(productModel.useProduct());

	const isUserAuthorized = sessionModel.useIsAuthorized();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useLayoutEffect(() => {
		if (isUserAuthorized) {
			console.log("Authorized");
		} else {
			if (!product) return;
			if (!localStorage.getItem("lastViewedProducts")) {
				const lastViewedProducts = [];

				const lastViewedProduct = {
					viewDate: Date.now(),
					userViewsCount: 1,
					product,
				};

				lastViewedProducts.push(lastViewedProduct);

				localStorage.setItem("lastViewedProducts", JSON.stringify(lastViewedProducts));
			} else {
				const lastViewedProducts = JSON.parse(localStorage.getItem("lastViewedProducts")!);

				const currentlyViewedProductIndex = lastViewedProducts.findIndex(
					(lastViewedProduct: any) => lastViewedProduct.product?.id === product?.id,
				);

				if (currentlyViewedProductIndex !== -1) {
					const currentlyViewedProduct = lastViewedProducts.find(
						(lastViewedProduct: any) => lastViewedProduct.product?.id === product?.id,
					);

					currentlyViewedProduct.viewDate = Date.now();
					currentlyViewedProduct.userViewsCount++;

					lastViewedProducts[currentlyViewedProductIndex] = currentlyViewedProduct;
					// console.log(currentlyViewedProduct);
				} else {
					const currentlyViewedProduct = {
						viewDate: Date.now(),
						userViewsCount: 1,
						product,
					};

					lastViewedProducts.push(currentlyViewedProduct);
				}

				localStorage.removeItem("lastViewedProducts");
				localStorage.setItem("lastViewedProducts", JSON.stringify(lastViewedProducts));

				console.log(lastViewedProducts);
				console.log(currentlyViewedProductIndex);
			}
		}
	}, [isUserAuthorized, product]);

	useEffect(() => {
		dispatch(productModel.getProductByIdAsync(productId!));
	}, [productId, dispatch]);

	const priceContainerRef = useRef(null);

	if (isDataLoading) {
		return <ProductLoading />;
	}

	if (operationResultMessage.error)
		return <ProductError errorMessage={operationResultMessage.error} />;

	if (!product) return null;

	return (
		<>
			<h1 className={"sr-only"}>{"Страница товара " + product.name}</h1>
			<article
				className={
					"px-[1.5rem] pt-[4rem] pb-[7.2rem] md:px-[4.5rem] md:pb-[11.1rem] " +
					"lg:px-[9.8rem] lg:pb-[13.15rem] lg:grid lg:grid-cols-[minmax(61rem,_63rem)_7.1rem_37rem_10rem] " +
					"lg:justify-center"
				}
			>
				<picture>
					<source media="(min-width:1366px)" srcSet={product.image.lg} />
					<source media="(min-width:768px)" srcSet={product.image.md} />
					<source media="(min-width:320px)" srcSet={product.image.sm} />
					<img
						className={
							"w-full h-[81.25vw] object-cover md:h-[61.197916666666664vw] " +
							"lg:col-start-1 lg:col-end-2 lg:h-[64.7rem]"
						}
						src={product.image.lg}
						alt={product.name}
					/>
				</picture>
				<div className={"lg:col-start-3 lg:col-end-4"}>
					<header
						className={
							"pt-[4.2rem] pb-[1.9rem] md:pt-[5.15rem] md:pb-[3.35rem] " +
							"lg:pt-[4rem] lg:pb-[3.4rem]"
						}
					>
						<h2
							className={
								"font-raleway font-medium text-sm-28px text-blue-zodiac-950 " +
								"pb-[0.1rem] md:text-md-32px md:pb-[0.05rem] lg:pb-[0.15rem] " +
								"lg:text-lg-32px-lh-40px"
							}
						>
							{product.name}
						</h2>
						<p className={"font-mPlus font-normal text-sm-16px text-manatee-500"}>
							{getProductType({
								mainType: product.category.main,
								secondaryType: product.category.secondary,
							})}
						</p>
					</header>
					<div>
						<div
							className={
								"pb-[3.3rem] gap-y-[0.9rem] flex flex-col md:gap-y-[0.85rem] md:pb-[3.85rem] " +
								"lg:gap-y-[0.9rem]"
							}
						>
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
								splitterColor={styles.splitter}
								contentWithinSplitter={true}
								triggerNameClasses={styles.triggerNameText}
								accordionContentClasses={"pt-[0.9rem] pb-[0.2rem] md:pt-[0.8rem]"}
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
							splitterColor={styles.splitter}
							contentWithinSplitter={true}
							triggerNameClasses={styles.triggerNameText}
							accordionContentClasses={"pt-[0.9rem] pb-[0.2rem] md:pt-[0.8rem]"}
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
					<footer className={"pt-[2.4rem] md:pt-[2.75rem] lg:pt-[2.65rem]"}>
						<form action="#" method="get">
							<fieldset className={"border-none inline-flex items-center p-0"}>
								<legend className={"contents"}>
									<span
										className={
											"font-mPlus text-sm-16px font-medium text-blue-zodiac-950 " +
											"mr-[1.5rem] flex-shrink-0 flex-grow-0 md:text-md-18px"
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
									"min-[338px]:justify-normal min-[338px]:gap-x-[3.5rem] " +
									"md:min-[338px]:gap-x-[5rem] lg:mt-[3.8rem]"
								}
							>
								<div
									ref={priceContainerRef}
									className={"flex flex-row items-center gap-x-[0.5rem]"}
								>
									<div className={"w-[5.99rem] md:w-[6.91rem]"}></div>
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
