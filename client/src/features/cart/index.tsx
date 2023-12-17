import { FC } from "react";
import { useDispatch } from "react-redux";

import { userModel } from "entities/user";

import { Button } from "shared/ui";
import { Product } from "shared/api";

import { ReactComponent as RubleIcon } from "./assets/ruble.svg";

import styles from "./styles.module.scss";
import "./styles.scss";

const Cart: FC = () => {
	const dispatch = useDispatch();

	const products = userModel.useProductsFromCart();

	const totalPrice = products.reduce((acc, product: any) => {
		if (product.userSelected && typeof product.userSelected.price === "number") {
			acc += product.userSelected.price;
		}
		return acc;
	}, 0);

	const handleRemoveProductFromCartClick = ({ product }: { product: Product }) => {
		dispatch(userModel.removeProductFromCart(product));
	};

	return (
		<div className={"flex flex-col items-center"}>
			<ul
				className={
					"flex flex-row justify-center items-center gap-[2rem] flex-wrap lg:gap-y-[2rem] " +
					styles.cardRowContainer
				}
			>
				{products.map((product) => (
					<li key={product.id}>
						<article
							className={
								"flex lg:flex-row items-center w-full bg-transparent " +
								"border-bombay-400 border-solid border-[0.1rem] " +
								"lg:max-w-[90rem] flex-col gap-y-[2rem]"
							}
						>
							<picture>
								<source media="(min-width:1366px)" srcSet={product.image.lg} />
								<source media="(min-width:768px)" srcSet={product.image.md} />
								<source media="(min-width:320px)" srcSet={product.image.sm} />
								<img
									src={product.image.lg}
									alt={product.name}
									className={
										"w-[28rem] h-[24rem] lg:w-[16rem] md:w-[34.4rem] " +
										"md:h-[28rem] lg:h-[16rem] object-cover"
									}
								/>
							</picture>
							<div
								className={
									"flex lg:flex-row flex-col gap-y-[2rem] items-center justify-between"
								}
							>
								<div
									className={
										"flex flex-col items-center lg:w-[33.8rem] lg:gap-y-[0.5rem] " +
										"lg:ml-[4rem] lg:mr-[4rem]"
									}
								>
									<h3
										className={
											"font-raleway text-md-18px text-center lining-nums text-blue-zodiac-950"
										}
									>
										{product.name}
									</h3>
									<p
										className={
											"font-mPlus text-sm-14px-lh-20px lining-nums text-blue-zodiac-950"
										}
									>
										{(product as any).userSelected.quantity}
									</p>
								</div>
								<div
									className={
										"flex lg:flex-row flex-col items-center " +
										"gap-y-[2rem] lg:gap-x-[1rem] mb-[1rem] lg:mr-[1rem]"
									}
								>
									<Button
										type={"button"}
										text={"Удалить из корзины"}
										onClick={() =>
											handleRemoveProductFromCartClick({
												product,
											})
										}
									/>
								</div>
							</div>
						</article>
					</li>
				))}
			</ul>
			<div className={"flex flex-row items-center gap-x-[10rem] mt-[5rem]"}>
				<Button
					type="submit"
					text={"Оформить заказ"}
					borderColor={"#122947"}
					backgroundColor={"#122947"}
					textColor={"#FFF"}
				/>
				<div className={"flex flex-row items-center"}>
					<p className={"font-raleway lining-nums text-sm-16px-lh-23px mr-[0.25rem]"}>
						Полная сумма к оплате:{" "}
						<strong
							className={"font-raleway lining-nums text-sm-16px-lh-23px ml-[0.5rem]"}
						>
							{totalPrice}
						</strong>
					</p>
					<RubleIcon width={"1.2rem"} height={"1.2rem"} />
				</div>
			</div>
		</div>
	);
};

export default Cart;
