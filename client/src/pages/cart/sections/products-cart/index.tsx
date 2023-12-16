import { FC } from "react";

import Cart from "features/cart";

import { userModel } from "entities/user";

import { ReactComponent as CartImage } from "./assets/empty-cart.svg";

import { ProductsCartProps } from "./types";

const ProductsCart: FC<ProductsCartProps> = ({ title }) => {
	const productsInCart = userModel.useProductsFromCart();

	return (
		<div
			className={
				"pl-[1.5rem] pr-[1.5rem] md:pr-[4.5rem] md:pl-[4.5rem] relative " +
				"pt-[30vh] pb-[30vh]"
			}
		>
			<div
				className={"lg:pr-[2.3rem] lg:pl-[2.3rem] lg:mr-auto lg:ml-auto lg:max-w-[120rem]"}
			>
				<div
					className={
						"mb-[4rem] flex flex-col items-center justify-between md:mb-[3.6rem] lg:mb-[4.9rem]"
					}
				>
					<h2
						className={
							"font-raleway font-normal text-sm-28px text-left text-blue-zodiac-950 " +
							"md:text-md-36px justify-self-start row-start-1 row-end-2 pl-[1.5rem] " +
							"z-[14] md:pl-[0rem] mb-[4rem]"
						}
					>
						{title}
					</h2>
					{productsInCart.length === 0 && (
						<div className={"flex flex-col items-center"}>
							<p
								className={
									"font-mPlus font-normal text-sm-18px text-center text-blue-zodiac-950 " +
									"mb-[4rem]"
								}
							>
								В корзине пока пусто.
							</p>
							<CartImage width={"68rem"} />
						</div>
					)}
					{productsInCart.length >= 1 && <Cart />}
				</div>
			</div>
		</div>
	);
};

export default ProductsCart;
