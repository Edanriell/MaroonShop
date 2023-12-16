import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { userModel } from "entities/user";
import { sessionModel } from "entities/session";

import { Accordion, Button, Radio } from "shared/ui";
import { getProductType } from "shared/lib/functions";

import { ProductLoading, ProductError } from "./ui";

import styles from "./styles.module.scss";

const Product = () => {
	const [isProductInCart, setIsProductInCart] = useState<boolean>(false);

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const { productId } = useParams();

	const isDataLoading = productModel.useIsFilteredDataLoading();

	const operationResultMessage = productModel.useFilteredDataOperationResultMessage();

	const [product] = Object.values(productModel.useProduct());

	const user = sessionModel.useUser();

	const isUserAuthorized = sessionModel.useIsAuthorized();

	const priceContainerRef = useRef(null);

	const currentProductsPlacedInCart = userModel.useProductsFromCart();

	useEffect(() => {
		if (!product) return;

		if (
			currentProductsPlacedInCart.find(
				(productInCart: any) => productInCart.id === product.id,
			)
		) {
			setIsProductInCart(true);
		} else {
			setIsProductInCart(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentProductsPlacedInCart]);

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!product) return;
		if (isUserAuthorized) {
			dispatch(
				productModel.updateRecentlyWatchedProductsAsync({
					userId: (user as any).id,
					productsCount: 14,
					currentlyWatchedProduct: product,
				}),
			);
		} else {
			if (!localStorage.getItem("lastWatchedProducts")) {
				const lastWatchedProducts = [];

				const lastWatchedProduct = {
					viewDate: Date.now(),
					userViewsCount: 1,
					product,
				};

				lastWatchedProducts.push(lastWatchedProduct);

				localStorage.setItem("lastWatchedProducts", JSON.stringify(lastWatchedProducts));
			} else {
				const lastWatchedProducts = JSON.parse(
					localStorage.getItem("lastWatchedProducts")!,
				);

				const currentlyWatchedProductIndex = lastWatchedProducts.findIndex(
					(lastWatchedProduct: any) => lastWatchedProduct.product?.id === product?.id,
				);

				if (currentlyWatchedProductIndex !== -1) {
					const currentlyWatchedProduct = lastWatchedProducts.find(
						(lastWatchedProduct: any) => lastWatchedProduct.product?.id === product?.id,
					);

					currentlyWatchedProduct.viewDate = Date.now();
					currentlyWatchedProduct.userViewsCount++;

					lastWatchedProducts[currentlyWatchedProductIndex] = currentlyWatchedProduct;
				} else {
					const currentlyWatchedProduct = {
						viewDate: Date.now(),
						userViewsCount: 1,
						product,
					};

					lastWatchedProducts.push(currentlyWatchedProduct);
				}

				localStorage.removeItem("lastWatchedProducts");
				localStorage.setItem("lastWatchedProducts", JSON.stringify(lastWatchedProducts));
			}
		}
	}, [isUserAuthorized, product, dispatch, user]);

	useEffect(() => {
		dispatch(productModel.getProductByIdAsync(productId!));
	}, [productId, dispatch]);

	useEffect(() => {
		if (!product) return;

		productModel.updateProductViewsAsync({ productId: productId! });
	}, [product, productId]);

	const handleProductClick = () => {
		if (!isProductInCart) {
			dispatch(userModel.addProductToCart(product));
		} else {
			dispatch(userModel.removeProductFromCart(product));
		}
	};

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
								<Button
									onClick={handleProductClick}
									text={
										isProductInCart ? "Убрать из корзины" : "Добавить в корзину"
									}
								/>
							</div>
						</form>
					</footer>
				</div>
			</article>
		</>
	);
};

export default Product;
