import { useEffect, useRef, useLayoutEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import classNames from "classnames";

import { productModel } from "entities/product";
import { userModel } from "entities/user";
import { sessionModel } from "entities/session";

import { Product as ProductType } from "shared/api";
import { Accordion, Button, Radio } from "shared/ui";
import { getProductType } from "shared/lib/functions";

import { ProductLoading, ProductError } from "./ui";

import { ProductAndQuantity, initialProductAndQuantity } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

const Product: FC = () => {
	const [userSelectedPriceAndQuantity, setUserSelectedPriceAndQuantity] =
		useState<ProductAndQuantity>(initialProductAndQuantity);
	const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
	const [currentlySelectedProductPrice, setCurrentlySelectedProductPrice] = useState<
		number | undefined
	>();

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const { productId } = useParams();

	const isDataLoading = productModel.useIsFilteredDataLoading();

	const operationResultMessage = productModel.useFilteredDataOperationResultMessage();

	const [product] = Object.values(productModel.useProduct());

	const user = sessionModel.useUser();

	const isUserAuthorized = sessionModel.useIsAuthorized();

	const priceContainerRef = useRef(null);

	const currentProductsPlacedInCart = userModel.useProductsFromCart();

	const isAddToCartButtonDisabled =
		userSelectedPriceAndQuantity.userSelected.quantity === "" &&
		userSelectedPriceAndQuantity.userSelected.price === 0 &&
		!currentProductsPlacedInCart.find(
			(productInCart: any) => productInCart?.id === product?.id,
		);

	const addToCartButtonClasses = classNames({
		addToCartButtonDisabled:
			userSelectedPriceAndQuantity.userSelected.quantity === "" &&
			userSelectedPriceAndQuantity.userSelected.price === 0 &&
			!currentProductsPlacedInCart.find(
				(productInCart: any) => productInCart?.id === product?.id,
			),
	});

	function createPrice(currentSelectedProduct: any, isPriceInvisible: boolean) {
		const RubleSvg = `
		<svg class="${styles.rubleSvg} ${
			isPriceInvisible ? "invisible" : ""
		}" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.12195 17V13.7619H0V12.2143H2.12195V10.0952H0V8.28571H2.12195V0H6.70732C8.8374
			0 10.4146 0.420635 11.439 1.26191C12.4797 2.10317 13 3.3254 13 4.92857C13 6.54762 12.439
			7.81746 11.3171 8.7381C10.1951 9.64286 8.54471 10.0952 6.36585
			10.0952H4.31707V12.2143H8.34146V13.7619H4.31707V17H2.12195ZM4.31707 8.28571H6.04878C7.52845 8.28571
			8.6748 8.04762 9.4878 7.57143C10.3171 7.09524 10.7317 6.2381 10.7317 5C10.7317 3.92064 10.3902
			3.11905 9.70732 2.59524C9.02439 2.07143 7.95935 1.80952 6.51219 1.80952H4.31707V8.28571Z"
			fill="#122947"/>
		</svg>
	`;

		const priceElement = `
		<b class="font-mPlus font-medium text-sm-22px text-blue-zodiac-950 md:text-md-26px ${
			isPriceInvisible ? "invisible" : ""
		}">
			${isPriceInvisible ? "000" : (currentSelectedProduct as any)?.userSelected.price}
		</b>
	`;

		(priceContainerRef.current as any).innerHTML = `${priceElement} ${RubleSvg}`;
	}

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useEffect(() => {
		if (!product) return;

		const currentSelectedProduct = currentProductsPlacedInCart.find(
			(productInCart: any) => productInCart.id === product.id,
		);

		if (currentSelectedProduct) {
			setCurrentlySelectedProductPrice((currentSelectedProduct as any).userSelected.price);
			setIsProductInCart(true);
		} else {
			setCurrentlySelectedProductPrice(undefined);
			setIsProductInCart(false);
		}
	}, [currentProductsPlacedInCart, product]);

	useEffect(() => {
		if (!product) return;

		if (
			userSelectedPriceAndQuantity.userSelected.quantity === "" &&
			userSelectedPriceAndQuantity.userSelected.price === 0
		) {
			const currentSelectedProduct = currentProductsPlacedInCart.find(
				(productInCart: any) => productInCart?.id === product?.id,
			);

			if (!currentSelectedProduct) {
				createPrice(currentSelectedProduct, true);
			} else {
				createPrice(currentSelectedProduct, false);
			}
		}
	}, [currentProductsPlacedInCart, product, userSelectedPriceAndQuantity]);

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
			const modifiedProduct = { ...product, ...userSelectedPriceAndQuantity };
			dispatch(userModel.addProductToCart(modifiedProduct as unknown as ProductType));
		} else {
			setUserSelectedPriceAndQuantity({
				userSelected: { price: 0, quantity: "" },
			});
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
									onQuantityAndPriceSelect={setUserSelectedPriceAndQuantity}
									currentlySelectedProductPrice={currentlySelectedProductPrice}
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
									className={addToCartButtonClasses}
									disabled={isAddToCartButtonDisabled}
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
