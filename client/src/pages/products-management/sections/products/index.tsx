import {
	FC,
	useLayoutEffect,
	useEffect,
	ChangeEvent,
	useState,
	useReducer,
	FormEvent,
} from "react";
// import { FC, useState, useLayoutEffect, useReducer, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import classNames from "classnames";

import { sessionModel } from "entities/session";
import { productModel } from "entities/product";

import { Button, Modal, Snackbar, Input } from "shared/ui";
import { useDebounce } from "shared/lib/hooks";
import { User, Product } from "shared/api";

import { reducer, initialFormState } from "./model/store";
import {
	changingNameAction,
	changingSurnameAction,
	changingAddressAction,
	changingEmailAction,
} from "./model/actions";
import { isFormValid } from "./model";

import { ProductsProps } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

const Profile: FC<ProductsProps> = ({ title }) => {
	const [filteredProducts, setFilteredProducts] = useState<Product[] | Product | null>(null);
	const [showCreateNewProductModal, setShowCreateNewProductModal] = useState<boolean>(false);
	const [showEditExistingProductModal, setEditExistingProductModal] = useState<boolean>(false);
	const [showDeleteExistingProductModal, setDeleteExistingProductModal] =
		useState<boolean>(false);

	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const [state, formDispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

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

	/////
	// useLayoutEffect(() => {
	// 	formDispatch(changingNameAction((user as User)?.name || ""));
	// 	formDispatch(changingSurnameAction((user as User)?.surname || ""));
	// 	formDispatch(changingAddressAction((user as User)?.address || ""));
	// 	formDispatch(changingEmailAction((user as User)?.email || ""));
	// }, [operationResultMessage.error, user]);

	// const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	formDispatch(changingNameAction(event.target.value));
	// };

	// const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	formDispatch(changingSurnameAction(event.target.value));
	// };

	// const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	formDispatch(changingAddressAction(event.target.value));
	// };

	// const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	formDispatch(changingEmailAction(event.target.value));
	// };

	// const handleLogoutClick = () => {
	// 	dispatch(sessionModel.logout());
	// };

	// const handleResetClick = () => {
	// 	setIsProfileDataEditable(!isProfileDataEditable);

	// 	formDispatch(changingNameAction((user as User)?.name || ""));
	// 	formDispatch(changingSurnameAction((user as User)?.surname || ""));
	// 	formDispatch(changingAddressAction((user as User)?.address || ""));
	// 	formDispatch(changingEmailAction((user as User)?.email || ""));
	// };

	// const handleProfileEditClick = () => {
	// 	setIsProfileDataEditable(!isProfileDataEditable);
	// };

	// const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();

	// 	if ((user as User).name !== state.nameInput.value) {
	// 		dispatch(
	// 			userModel.updateUserData({
	// 				id: (user as User).id,
	// 				name: state.nameInput.value,
	// 			}),
	// 		);
	// 	}

	// 	if ((user as User).surname !== state.surnameInput.value) {
	// 		dispatch(
	// 			userModel.updateUserData({
	// 				id: (user as User).id,
	// 				surname: state.surnameInput.value,
	// 			}),
	// 		);
	// 	}

	// 	if ((user as User).address !== state.addressInput.value) {
	// 		dispatch(
	// 			userModel.updateUserData({
	// 				id: (user as User).id,
	// 				address: state.addressInput.value,
	// 			}),
	// 		);
	// 	}

	// 	if ((user as User).email !== state.emailInput.value) {
	// 		dispatch(
	// 			userModel.updateUserData({
	// 				id: (user as User).id,
	// 				email: state.emailInput.value,
	// 			}),
	// 		);
	// 	}

	// 	dispatch(userModel.clearOperationResultMessage(null));
	// };

	// const nameInputClasses = classNames({
	// 	inputInvalid:
	// 		state.nameInput.validLength === false || state.nameInput.validPattern === false,
	// });

	// const surnameInputClasses = classNames({
	// 	inputInvalid:
	// 		state.surnameInput.validLength === false || state.surnameInput.validPattern === false,
	// });

	// const addressInputClasses = classNames({
	// 	inputInvalid: state.addressInput.validLength === false,
	// });

	// const emailInputClasses = classNames({
	// 	inputInvalid:
	// 		state.emailInput.validLength === false || state.emailInput.validPattern === false,
	// });

	// const submitButtonClasses = classNames({
	// 	submitButtonInvalid: !isFormValid(state),
	// });
	////

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

	const handleEditExistingProductModalOpen = () => {
		setEditExistingProductModal(true);
	};

	const handleEditExistingProductModalClose = () => {
		setEditExistingProductModal(false);
	};

	const handleDeleteExistingProductModalOpen = () => {
		setDeleteExistingProductModal(true);
	};

	const handleDeleteExistingProductModalClose = () => {
		setDeleteExistingProductModal(false);
	};

	const handleCreateNewProductFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// if ((user as User).name !== state.nameInput.value) {
		// 	dispatch(
		// 		userModel.updateUserData({
		// 			id: (user as User).id,
		// 			name: state.nameInput.value,
		// 		}),
		// 	);
		// }

		// if ((user as User).surname !== state.surnameInput.value) {
		// 	dispatch(
		// 		userModel.updateUserData({
		// 			id: (user as User).id,
		// 			surname: state.surnameInput.value,
		// 		}),
		// 	);
		// }

		// if ((user as User).address !== state.addressInput.value) {
		// 	dispatch(
		// 		userModel.updateUserData({
		// 			id: (user as User).id,
		// 			address: state.addressInput.value,
		// 		}),
		// 	);
		// }

		// if ((user as User).email !== state.emailInput.value) {
		// 	dispatch(
		// 		userModel.updateUserData({
		// 			id: (user as User).id,
		// 			email: state.emailInput.value,
		// 		}),
		// 	);
		// }

		// dispatch(userModel.clearOperationResultMessage(null));
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
							<form onSubmit={handleCreateNewProductFormSubmit}>
								<div className={"flex flex-col items-center gap-y-[1rem]"}>
									<Input
										type="text"
										inputId="product-name"
										inputName="product-name"
										labelContent="Название товара"
										labelFor="product-name"
										// inputValue={state.productNameInput.value}
										// onInputChange={handleProductNameChange}
										className={styles.input}
									/>
									{/* {debouncedState.productNameInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое название товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productNameInput.validPattern === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле название товара должно содержать только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
									<Input
										type="text"
										inputId="product-components"
										inputName="product-components"
										labelContent="Компоненты товара"
										labelFor="product-components"
										// inputValue={state.productComponentsInput.value}
										// onInputChange={handleProductComponentsChange}
										className={styles.input}
									/>
									{/* {debouncedState.productComponentsInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={
													"Слишком короткое перечесление компонентов товара."
												}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productComponentsInput.validPattern === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле компоненты товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
									<Input
										type="text"
										inputId="product-description"
										inputName="product-description"
										labelContent="Описание товара"
										labelFor="product-description"
										// inputValue={state.productDescriptionInput.value}
										// readOnly={!isProfileDataEditable}
										// onInputChange={handleProductDescriptionChange}
										className={styles.input}
									/>
									{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
									<Input
										type="text"
										inputId="product-usage"
										inputName="product-usage"
										labelContent="Использование товара"
										labelFor="product-usage"
										// inputValue={state.productDescriptionInput.value}
										// readOnly={!isProfileDataEditable}
										// onInputChange={handleProductDescriptionChange}
										className={styles.input}
									/>
									{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
									<div className="flex flex-row items-center gap-x-[1rem]">
										<Input
											type="text"
											inputId="product-image-small"
											inputName="product-image-small"
											labelContent="Картинка товара мальенкая"
											labelFor="product-image-small"
											// inputValue={state.productDescriptionInput.value}
											// readOnly={!isProfileDataEditable}
											// onInputChange={handleProductDescriptionChange}
											className={styles.input}
										/>
										{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
										<Input
											type="text"
											inputId="product-image-medium"
											inputName="pproduct-image-medium"
											labelContent="Картинка товара среднаяя"
											labelFor="product-image-medium"
											// inputValue={state.productDescriptionInput.value}
											// readOnly={!isProfileDataEditable}
											// onInputChange={handleProductDescriptionChange}
											className={styles.input}
										/>
										{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
										<Input
											type="text"
											inputId="product-image-large"
											inputName="product-image-large"
											labelContent="Картинка товара большая"
											labelFor="product-image-large"
											// inputValue={state.productDescriptionInput.value}
											// readOnly={!isProfileDataEditable}
											// onInputChange={handleProductDescriptionChange}
											className={styles.input}
										/>
										{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
									</div>
									<div className={"flex flex-row items center gap-x-[1rem]"}>
										<select
											className={
												"border-none font-semibold " +
												"p-0 font-raleway " +
												"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
												"hover:bg-athens-gray-100 focus:bg-athens-gray-100 " +
												"text-blue-zodiac-950 max-h-[5.5rem] " +
												styles.input
											}
											name="main-type"
											id="main-type"
										>
											<option value="body">Для тела</option>
											<option value="face">Для лица</option>
										</select>
										<select
											className={
												"border-none font-semibold " +
												"p-0 font-raleway " +
												"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
												"hover:bg-athens-gray-100 focus:bg-athens-gray-100 " +
												"text-blue-zodiac-950 max-h-[5.5rem] " +
												styles.input
											}
											name="secondary-type"
											id="secondary-type"
										>
											<option value="face-cream">крем для лица</option>
											<option value="face-serum">cыворотка для лица</option>
											<option value="face-mask">маска для лица</option>
											<option value="face-foam">пенка для лица</option>
											<option value="face-tonic">тоник для лица</option>
											<option value="face-powder">минеральная пудра</option>
											<option value="body-cream">крем для тела</option>
											<option value="body-oil">масло для тела</option>
											<option value="body-scrub">скраб для тела</option>
											<option value="body-soap">мыло ручной работы</option>
											<option value="body-bath-bomb">
												бомбочка для ванны
											</option>
											<option value="body-bath-salt">соль для ванны</option>
										</select>
										<select
											className={
												"border-none font-semibold " +
												"p-0 font-raleway " +
												"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
												"hover:bg-athens-gray-100 focus:bg-athens-gray-100 " +
												"text-blue-zodiac-950 max-h-[5.5rem] " +
												styles.input
											}
											name="skin-type"
											id="skin-type"
											multiple
										>
											<option value="skin-dry">сухая кожа</option>
											<option value="skin-normal">нолрмальная кожа</option>
											<option value="skin-fat">жирная кожа</option>
											<option value="skin-combined">
												комбинированая кожа
											</option>
										</select>
									</div>
									<div className="flex flex-row items-center gap-x-[1rem]">
										<Input
											type="text"
											inputId="product-price"
											inputName="product-price"
											labelContent="Цена товара"
											labelFor="product-price"
											// inputValue={state.productDescriptionInput.value}
											// readOnly={!isProfileDataEditable}
											// onInputChange={handleProductDescriptionChange}
											className={styles.input}
										/>
										{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
										<Input
											type="text"
											inputId="product-quantity"
											inputName="product-quantity"
											labelContent="Количество товара"
											labelFor="product-quantity"
											// inputValue={state.productDescriptionInput.value}
											// readOnly={!isProfileDataEditable}
											// onInputChange={handleProductDescriptionChange}
											className={styles.input}
										/>
										{/* {debouncedState.productDescriptionInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={"Слишком короткое описание товара."}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productDescriptionInput.validPattern ===
										false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле описание товара может содержать 
													только кириллицу или латиницу.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)} */}
									</div>
									<Button
										className={"mt-[5rem]"}
										type="submit"
										text={"Создать"}
									/>
								</div>
								{/* {operationResultMessage.success &&
									createPortal(
										<Snackbar
											type={"success"}
											message={operationResultMessage.success}
											autoCloseDuration={"4000"}
										/>,
										document.getElementById("snackbars-container") as Element,
									)}
								{operationResultMessage.error &&
									createPortal(
										<Snackbar
											type={"error"}
											message={operationResultMessage.error}
											autoCloseDuration={"4000"}
										/>,
										document.getElementById("snackbars-container") as Element,
									)} */}
							</form>
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
											onClick={handleEditExistingProductModalOpen}
										/>
										<Button
											type={"button"}
											text={"Удалить"}
											onClick={handleDeleteExistingProductModalOpen}
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
											onClick={handleEditExistingProductModalOpen}
										/>

										<Button
											type={"button"}
											text={"Удалить"}
											onClick={handleDeleteExistingProductModalOpen}
										/>
									</div>
								</div>
							</article>
						</li>
					))}
					{showEditExistingProductModal &&
						createPortal(
							<Modal
								title="Редактирование товара"
								description="123"
								onModalClose={handleEditExistingProductModalClose}
							>
								<div>Content2</div>
							</Modal>,
							document.body,
						)}
					{showDeleteExistingProductModal &&
						createPortal(
							<Modal
								title="Удаление товара"
								description=""
								onModalClose={handleDeleteExistingProductModalClose}
							>
								<div>Content3</div>
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
