import { FC, useLayoutEffect, useEffect, ChangeEvent, useState } from "react";
// import { FC, useState, useLayoutEffect, useReducer, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
// import classNames from "classnames";

import { sessionModel } from "entities/session";
import { productModel } from "entities/product";
// import { userModel } from "entities/user";

// import { Button, Input, Snackbar } from "shared/ui";
import { Button, Modal } from "shared/ui";
// import { useDebounce } from "shared/lib/hooks";
import { User, Product } from "shared/api";

// import { reducer, initialFormState } from "./model/store";
// import {
// 	changingNameAction,
// 	changingSurnameAction,
// 	changingAddressAction,
// 	changingEmailAction,
// } from "./model/actions";
// import { isFormValid } from "./model";

import { ProductsProps } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

const Profile: FC<ProductsProps> = ({ title }) => {
	const [filteredProducts, setFilteredProducts] = useState<Product[] | Product | null>(null);
	const [showCreateNewProductModal, setShowCreateNewProductModal] = useState<boolean>(false);
	const [showEditExistingProductModal, setEditExistingProductModal] = useState<boolean>(false);
	const [showDeleteExistingProductModal, setDeleteExistingProductModal] =
		useState<boolean>(false);
	// const [isProfileDataEditable, setIsProfileDataEditable] = useState<boolean>(false);

	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	// const [state, formDispatch] = useReducer(reducer, initialFormState);
	// const [debouncedState] = useDebounce(state, 2000);

	const user = sessionModel.useUser();
	const isAuthorized = sessionModel.useIsAuthorized();

	const products = productModel.useProducts();
	// const operationResultMessage = userModel.useOperationResultMessage();

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

	const handleEditExistingProductModalOpen = () => {
		setEditExistingProductModal(true);
		console.log(123);
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
		// <form onSubmit={handleFormSubmit}>
		// 	<div
		// 		className={
		// 			"flex flex-col items-center gap-y-[1rem] sm:w-[24rem] md:w-[32rem] lg:w-[42rem]"
		// 		}
		// 	>
		// 		<Input
		// 			type="text"
		// 			inputId="name"
		// 			inputName="name"
		// 			labelContent="Имя"
		// 			labelFor="name"
		// 			inputValue={state.nameInput.value}
		// 			readOnly={!isProfileDataEditable}
		// 			onInputChange={handleNameChange}
		// 			className={styles.input + " " + nameInputClasses}
		// 		/>
		// 		{debouncedState.nameInput.validLength === false &&
		// 			createPortal(
		// 				<Snackbar
		// 					type={"error"}
		// 					message={"Слишком короткое имя."}
		// 					autoCloseDuration={"4000"}
		// 				/>,
		// 				document.getElementById("snackbars-container") as Element,
		// 			)}
		// 		{debouncedState.nameInput.validPattern === false &&
		// 			createPortal(
		// 				<Snackbar
		// 					type={"error"}
		// 					message={`Поле имя должно содержать только кириллицу или латиницу.`}
		// 					autoCloseDuration={"4000"}
		// 				/>,
		// 				document.getElementById("snackbars-container") as Element,
		// 			)}
		// 		<Input
		// 			type="text"
		// 			inputId="surname"
		// 			inputName="surname"
		// 			labelContent="Фамилия"
		// 			labelFor="surname"
		// 			inputValue={state.surnameInput.value}
		// 			readOnly={!isProfileDataEditable}
		// 			onInputChange={handleSurnameChange}
		// 			className={styles.input + " " + surnameInputClasses}
		// 		/>
		// 		{debouncedState.surnameInput.validLength === false &&
		// 			createPortal(
		// 				<Snackbar
		// 					type={"error"}
		// 					message={"Слишком короткая фамилия."}
		// 					autoCloseDuration={"4000"}
		// 				/>,
		// 				document.getElementById("snackbars-container") as Element,
		// 			)}
		// 		{debouncedState.surnameInput.validPattern === false &&
		// 			createPortal(
		// 				<Snackbar
		// 					type={"error"}
		// 					message={`Поле фамилия должно содержать только кириллицу или латиницу.`}
		// 					autoCloseDuration={"4000"}
		// 				/>,
		// 				document.getElementById("snackbars-container") as Element,
		// 			)}
		// 		<Input
		// 			type="text"
		// 			inputId="address"
		// 			inputName="address"
		// 			labelContent="Адрес"
		// 			labelFor="address"
		// 			inputValue={state.addressInput.value}
		// 			readOnly={!isProfileDataEditable}
		// 			onInputChange={handleAddressChange}
		// 			className={styles.input + " " + addressInputClasses}
		// 		/>
		// 		{debouncedState.addressInput.validLength === false &&
		// 			createPortal(
		// 				<Snackbar
		// 					type={"error"}
		// 					message={"Слишком короткий адрес."}
		// 					autoCloseDuration={"4000"}
		// 				/>,
		// 				document.getElementById("snackbars-container") as Element,
		// 			)}
		// 		<div
		// 			className={
		// 				"flex flex-col sm:w-[24rem] md:w-[32rem] lg:w-[42rem] gap-y-[0.5rem]"
		// 			}
		// 		>
		// 			<Input
		// 				type="email"
		// 				inputId="email"
		// 				inputName="email"
		// 				labelContent="Адрес электронной почты"
		// 				labelFor="email"
		// 				inputValue={state.emailInput.value}
		// 				readOnly={!isProfileDataEditable}
		// 				onInputChange={handleEmailChange}
		// 				className={styles.input + " " + emailInputClasses}
		// 			/>
		// 			{(user as User)?.isActivated ? (
		// 				<p className={"font-raleway text-sm-12px ml-[0.2rem] text-green-900"}>
		// 					Адрес электронной почты подтвержден.
		// 				</p>
		// 			) : (
		// 				<p className={"font-raleway text-sm-12px ml-[0.2rem] text-red-900"}>
		// 					Адрес электронной почты не подтвержден.
		// 				</p>
		// 			)}
		// 			{debouncedState.emailInput.validLength === false &&
		// 				createPortal(
		// 					<Snackbar
		// 						type={"error"}
		// 						message={"Слишком короткий адрес электронной почты."}
		// 						autoCloseDuration={"4000"}
		// 					/>,
		// 					document.getElementById("snackbars-container") as Element,
		// 				)}
		// 			{debouncedState.emailInput.validPattern === false &&
		// 				createPortal(
		// 					<Snackbar
		// 						type={"error"}
		// 						message={`Адрес электронной почты должен включать локальное имя
		// 							(текст, который идет перед символом @), затем символ @ и имя домена
		// 							(текст, который идет после символа @).`}
		// 						autoCloseDuration={"8000"}
		// 					/>,
		// 					document.getElementById("snackbars-container") as Element,
		// 				)}
		// 		</div>
		// 		{(user as User).role === "admin" && (
		// 			<div className={"flex flex-row items-center mt-[2rem]"}>
		// 				<Button
		// 					type={"link-internal"}
		// 					text={"Управление товарами"}
		// 					linkInternal={`/products-management`}
		// 				/>
		// 			</div>
		// 		)}
		// 		<div className={"flex flex-row items-center gap-x-[1rem]"}>
		// 			<Button
		// 				className={"mt-[5rem] " + submitButtonClasses}
		// 				type={isProfileDataEditable ? "button" : "submit"}
		// 				text={isProfileDataEditable ? "Сохранить" : "Редактировать"}
		// 				disabled={!isFormValid(state)}
		// 				onClick={handleProfileEditClick}
		// 			/>
		// 			<Button
		// 				className={"mt-[5rem]"}
		// 				type="button"
		// 				text={isProfileDataEditable ? "Отмена" : "Выйти"}
		// 				onClick={isProfileDataEditable ? handleResetClick : handleLogoutClick}
		// 			/>
		// 		</div>
		// 	</div>
		// 	{operationResultMessage.success &&
		// 		createPortal(
		// 			<Snackbar
		// 				type={"success"}
		// 				message={operationResultMessage.success}
		// 				autoCloseDuration={"4000"}
		// 			/>,
		// 			document.getElementById("snackbars-container") as Element,
		// 		)}
		// 	{operationResultMessage.error &&
		// 		createPortal(
		// 			<Snackbar
		// 				type={"error"}
		// 				message={operationResultMessage.error}
		// 				autoCloseDuration={"4000"}
		// 			/>,
		// 			document.getElementById("snackbars-container") as Element,
		// 		)}
		// </form>
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
							<div>Content</div>
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
										{showEditExistingProductModal &&
											createPortal(
												<Modal
													title="Редактирование товара"
													description="123"
													onModalClose={
														handleEditExistingProductModalClose
													}
												>
													<div>Content2</div>
												</Modal>,
												document.body,
											)}
										<Button
											type={"button"}
											text={"Удалить"}
											onClick={handleDeleteExistingProductModalOpen}
										/>
										{showDeleteExistingProductModal &&
											createPortal(
												<Modal
													title="Удаление товара"
													description=""
													onModalClose={
														handleDeleteExistingProductModalClose
													}
												>
													<div>Content3</div>
												</Modal>,
												document.body,
											)}
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
											onClick={handleCreateNewProductModalOpen}
										/>
										{showCreateNewProductModal &&
											createPortal(
												<Modal
													key={product.id}
													title="Редактирование товара"
													description="123"
													onModalClose={handleCreateNewProductModalClose}
												>
													<div>Content2</div>
												</Modal>,
												document.body,
											)}
										<Button
											type={"button"}
											text={"Удалить"}
											onClick={handleDeleteExistingProductModalOpen}
										/>
										{showDeleteExistingProductModal &&
											createPortal(
												<Modal
													title="Удаление товара"
													description=""
													onModalClose={
														handleDeleteExistingProductModalClose
													}
												>
													<div>Content3</div>
												</Modal>,
												document.body,
											)}
									</div>
								</div>
							</article>
						</li>
					))}
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
