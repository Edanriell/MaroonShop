import { FC, useLayoutEffect, useEffect, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import CreateProductForm from "features/create-product-form";
import UpdateProductForm from "features/update-product-form";
import DeleteProductForm from "features/delete-product-form";

import { sessionModel } from "entities/session";
import { productModel } from "entities/product";

import { Button, Modal } from "shared/ui";
import { User, Product } from "shared/api";

import { ProductsProps } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

const Profile: FC<ProductsProps> = ({ title }) => {
	const [filteredProducts, setFilteredProducts] = useState<Product[] | Product | null>(null);
	const [showCreateNewProductModal, setShowCreateNewProductModal] = useState<boolean>(false);
	const [showEditExistingProductModal, setEditExistingProductModal] = useState<boolean>(false);
	const [showDeleteExistingProductModal, setDeleteExistingProductModal] =
		useState<boolean>(false);
	const [currentlySelectedProduct, setCurrentlySelectedProduct] = useState<Product | null>(null);

	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const user = sessionModel.useUser();
	const isAuthorized = sessionModel.useIsAuthorized();

	const products = productModel.useProducts();

	useLayoutEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(sessionModel.checkAuth());
		}
	}, [dispatch]);

	useEffect(() => {
		dispatch(productModel.getProductsAsync());
	}, [dispatch]);

	const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
		const allProducts = Object.values(products);
		const searchTerm = event.target.value;

		if (searchTerm.trim() === "") {
			setFilteredProducts(null);
			return;
		}

		const filteredProducts = allProducts.filter((product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		setFilteredProducts(filteredProducts);
	};

	const handleCreateNewProductModalOpen = () => {
		setShowCreateNewProductModal(true);
	};

	const handleCreateNewProductModalClose = () => {
		setShowCreateNewProductModal(false);
	};

	const handleEditExistingProductModalOpen = ({
		selectedProduct,
	}: {
		selectedProduct: Product;
	}) => {
		setCurrentlySelectedProduct(selectedProduct);
		setEditExistingProductModal(true);
	};

	const handleEditExistingProductModalClose = () => {
		setEditExistingProductModal(false);
	};

	const handleDeleteExistingProductModalOpen = ({
		selectedProduct,
	}: {
		selectedProduct: Product;
	}) => {
		setCurrentlySelectedProduct(selectedProduct);
		setDeleteExistingProductModal(true);
	};

	const handleDeleteExistingProductModalClose = () => {
		setDeleteExistingProductModal(false);
	};

	const renderUnauthorizedUser = () => (
		<div>
			<p className={"font-raleway text-center text-sm-16px ml-[2rem] mr-[2rem]"}>
				Только автаризованные пользователи могут видеть эту страницу.
			</p>
			<div className={"mt-[6rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Есть аккаунт?</p>
				<Link to={"/login"} className={"font-mPlus font-semibold text-sm-12px"}>
					Войти
				</Link>
			</div>
			<div className={"mt-[2.4rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Нет аккаунта?</p>
				<Link to={"/registration"} className={"font-mPlus font-semibold text-sm-12px"}>
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);

	const renderAuthorizedUser = () => (
		<div>
			<p className={"font-raleway text-center text-sm-16px ml-[2rem] mr-[2rem]"}>
				Только автаризованные пользователи с правами администратора могут видеть эту
				страницу.
			</p>
		</div>
	);

	const renderAuthorizedAdmin = () => (
		<div className={"flex flex-col"}>
			<div className={"mr-[0] ml-[auto] mb-[4rem]"}>
				<Button
					type={"button"}
					text={"Добавить товар"}
					onClick={handleCreateNewProductModalOpen}
				/>
				{showCreateNewProductModal &&
					createPortal(
						<Modal
							title="Добавление нового товара"
							description=""
							onModalClose={handleCreateNewProductModalClose}
						>
							<CreateProductForm />
						</Modal>,
						document.body,
					)}
			</div>
			<div className={"mb-[4rem]"}>
				<form>
					<label className={"sr-only"} htmlFor="products-search">
						Поиск товаров
					</label>
					<input
						className={
							"w-full border-bombay-400 border-solid border-[0.1rem] bg-transparent h-[4rem] " +
							"font-raleway p-[2rem] text-sm-14px lining-nums"
						}
						type="text"
						placeholder="Поиск товаров"
						name="products-search"
						id="products-search"
						onChange={handleSearchTermChange}
					/>
				</form>
			</div>
			{filteredProducts && (filteredProducts as Product[]).length >= 1 && (
				<ul
					className={
						"flex flex-row justify-center items-center gap-[2rem] flex-wrap lg:gap-y-[2rem] " +
						styles.cardRowContainer
					}
				>
					{(filteredProducts as Product[]).map((product) => (
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
												"font-raleway text-md-18px text-center lining-nums"
											}
										>
											{product.name}
										</h3>
										<div
											className={"flex flex-row items-center gap-x-[0.5rem]"}
										>
											<p className={"font-raleway text-sm-12px"}>id:</p>
											<p
												className={
													"font-raleway text-center lining-nums text-sm-12px"
												}
											>
												{product.id}
											</p>
										</div>
									</div>
									<div
										className={
											"flex lg:flex-row flex-col items-center " +
											"gap-y-[2rem] lg:gap-x-[1rem] mb-[1rem] lg:mr-[1rem]"
										}
									>
										<Button
											type={"button"}
											text={"Редактировать"}
											onClick={() =>
												handleEditExistingProductModalOpen({
													selectedProduct: product,
												})
											}
										/>
										<Button
											type={"button"}
											text={"Удалить"}
											onClick={() =>
												handleDeleteExistingProductModalOpen({
													selectedProduct: product,
												})
											}
										/>
									</div>
								</div>
							</article>
						</li>
					))}
				</ul>
			)}
			{filteredProducts && (filteredProducts as Product[]).length === 0 && (
				<div className={"w-full"}>
					<p className={"font-raleway text-md-18px"}>
						По введенным критериям не найдено не одного товара.
					</p>
				</div>
			)}
			{!filteredProducts && (
				<ul
					className={
						"flex flex-row justify-center items-center gap-[2rem] flex-wrap lg:gap-y-[2rem] " +
						styles.cardRowContainer
					}
				>
					{Object.values(products).map((product) => (
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
												"font-raleway text-md-18px text-center lining-nums"
											}
										>
											{product.name}
										</h3>
										<div
											className={"flex flex-row items-center gap-x-[0.5rem]"}
										>
											<p className={"font-raleway text-sm-12px"}>id:</p>
											<p
												className={
													"font-raleway text-center lining-nums text-sm-12px"
												}
											>
												{product.id}
											</p>
										</div>
									</div>
									<div
										className={
											"flex lg:flex-row flex-col items-center " +
											"gap-y-[2rem] lg:gap-x-[1rem] mb-[1rem] lg:mr-[1rem]"
										}
									>
										<Button
											type={"button"}
											text={"Редактировать"}
											onClick={() =>
												handleEditExistingProductModalOpen({
													selectedProduct: product,
												})
											}
										/>

										<Button
											type={"button"}
											text={"Удалить"}
											onClick={() =>
												handleDeleteExistingProductModalOpen({
													selectedProduct: product,
												})
											}
										/>
									</div>
								</div>
							</article>
						</li>
					))}
					{showEditExistingProductModal &&
						createPortal(
							<Modal
								title="Редактирование данных товара"
								description=""
								onModalClose={handleEditExistingProductModalClose}
							>
								<UpdateProductForm selectedProduct={currentlySelectedProduct!} />
							</Modal>,
							document.body,
						)}
					{showDeleteExistingProductModal &&
						createPortal(
							<Modal
								title="Подтвердите удаление товара"
								description=""
								onModalClose={handleDeleteExistingProductModalClose}
							>
								<DeleteProductForm selectedProduct={currentlySelectedProduct!} />
							</Modal>,
							document.body,
						)}
				</ul>
			)}
		</div>
	);

	return (
		<section
			className={"flex flex-col items-center mt-[10rem] mb-[10rem] pl-[1.5rem] pr-[1.5rem]"}
		>
			<h2
				className={
					"font-raleway font-normal text-sm-28px text-center text-blue-zodiac-950 " +
					"md:text-md-36px mb-[6rem]"
				}
			>
				{title}
			</h2>
			{!isAuthorized && renderUnauthorizedUser()}
			{isAuthorized && (user as User).role !== "admin" && renderAuthorizedUser()}
			{isAuthorized && renderAuthorizedAdmin()}
		</section>
	);
};

export default Profile;
