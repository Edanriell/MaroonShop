import {
	FC,
	useLayoutEffect,
	useEffect,
	ChangeEvent,
	useState,
	useReducer,
	FormEvent,
} from "react";

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
	changingProductNameAction,
	changingProductComponentsAction,
	changingProductsDescriptionAction,
	changingProductUsageAction,
	changingProductImageSmallAction,
	changingProductImageMediumAction,
	changingProductImageLargeAction,
	changingProductMainTypeAction,
	changingProductSecondaryTypeAction,
	changingProductSkinTypeAction,
	changingProductPriceAction,
	changingProductQuantityAction,
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
	const [skinType, setSkinType] = useState<Array<string>>([]);

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

	// useLayoutEffect(() => {
	// 	formDispatch(changingNameAction((user as User)?.name || ""));
	// 	formDispatch(changingSurnameAction((user as User)?.surname || ""));
	// 	formDispatch(changingAddressAction((user as User)?.address || ""));
	// 	formDispatch(changingEmailAction((user as User)?.email || ""));
	// }, [operationResultMessage.error, user]);

	const handleProductNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductNameAction(event.target.value));
	};

	const handleProductComponentsChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductComponentsAction(event.target.value));
	};

	const handleProductDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductsDescriptionAction(event.target.value));
	};

	const handleProductUsageChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductUsageAction(event.target.value));
	};

	const handleProductImageSmallChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductImageSmallAction(event.target.value));
	};

	const handleProductImageMediumChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductImageMediumAction(event.target.value));
	};

	const handleProductImageLargeChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductImageLargeAction(event.target.value));
	};

	const handleProductMainTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		formDispatch(changingProductMainTypeAction(event.target.value));
	};

	const handleProductSecondaryTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		formDispatch(changingProductSecondaryTypeAction(event.target.value));
	};

	const handleProductSkinTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		console.log(event.target.value);
		console.log(state.skinTypeSelect.value);
		// const handleSkintypeChange = () => {};
		formDispatch(changingProductSkinTypeAction(event.target.value));
	};

	const handleProductPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductPriceAction(event.target.value));
	};

	const handleProductQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductQuantityAction(event.target.value));
	};

	const productNameInputClasses = classNames({
		inputInvalid:
			state.productNameInput.validLength === false ||
			state.productNameInput.validPattern === false,
	});

	const productComponentsInputClasses = classNames({
		inputInvalid:
			state.productComponentsInput.validLength === false ||
			state.productComponentsInput.validPattern === false,
	});

	const productDescriptionInputClasses = classNames({
		inputInvalid:
			state.productDescriptionInput.validLength === false ||
			state.productDescriptionInput.validPattern === false,
	});

	const productUsageInputClasses = classNames({
		inputInvalid:
			state.productUsageInput.validLength === false ||
			state.productUsageInput.validPattern === false,
	});

	const productImageSmallInputClasses = classNames({
		inputInvalid:
			state.productImageSmallInput.validLength === false ||
			state.productImageSmallInput.validPattern === false,
	});

	const productImageMediumInputClasses = classNames({
		inputInvalid:
			state.productImageMediumInput.validLength === false ||
			state.productImageMediumInput.validPattern === false,
	});

	const productImageLargeInputClasses = classNames({
		inputInvalid:
			state.productImageLargeInput.validLength === false ||
			state.productImageLargeInput.validPattern === false,
	});

	const mainTypeSelectClasses = classNames({
		inputInvalid: state.mainTypeSelect.validOption === false,
	});

	const secondaryTypeSelectClasses = classNames({
		inputInvalid: state.secondaryTypeSelect.validOption === false,
	});

	const skinTypeSelectClasses = classNames({
		inputInvalid: state.skinTypeSelect.validOption === false,
	});

	const productPriceInputClasses = classNames({
		inputInvalid:
			state.productPriceInput.validLength === false ||
			state.productPriceInput.validPattern === false,
	});

	const productQuantityInputClasses = classNames({
		inputInvalid:
			state.productQuantityInput.validLength === false ||
			state.productQuantityInput.validPattern === false,
	});

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

		dispatch(productModel.createNewProductAsync());

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
										inputValue={state.productNameInput.value}
										onInputChange={handleProductNameChange}
										className={styles.input + " " + productNameInputClasses}
									/>
									{debouncedState.productNameInput.validLength === false &&
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
										)}
									<Input
										type="text"
										inputId="product-components"
										inputName="product-components"
										labelContent="Компоненты товара"
										labelFor="product-components"
										inputValue={state.productComponentsInput.value}
										onInputChange={handleProductComponentsChange}
										className={
											styles.input + " " + productComponentsInputClasses
										}
									/>
									{debouncedState.productComponentsInput.validLength === false &&
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
													только кириллицу или латиницу. Компоненты 
													перечисляются через запятую.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									<Input
										type="text"
										inputId="product-description"
										inputName="product-description"
										labelContent="Описание товара"
										labelFor="product-description"
										inputValue={state.productDescriptionInput.value}
										// readOnly={!isProfileDataEditable}
										onInputChange={handleProductDescriptionChange}
										className={
											styles.input + " " + productDescriptionInputClasses
										}
									/>
									{debouncedState.productDescriptionInput.validLength === false &&
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
													только кириллицу или латиницу, точку и запятую.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									<Input
										type="text"
										inputId="product-usage"
										inputName="product-usage"
										labelContent="Использование товара"
										labelFor="product-usage"
										inputValue={state.productUsageInput.value}
										// readOnly={!isProfileDataEditable}
										onInputChange={handleProductUsageChange}
										className={styles.input + " " + productUsageInputClasses}
									/>
									{debouncedState.productUsageInput.validLength === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={
													"Слишком короткое описание способа приминение товара."
												}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									{debouncedState.productUsageInput.validPattern === false &&
										createPortal(
											<Snackbar
												type={"error"}
												message={`
													Поле способ применение товара может содержать 
													только кириллицу или латиницу, точку и запятую.
												`}
												autoCloseDuration={"4000"}
											/>,
											document.getElementById(
												"snackbars-container",
											) as Element,
										)}
									<div
										className={
											"flex flex-row items-center justify-center gap-x-[1rem] " +
											"gap-y-[1rem] flex-wrap w-full"
										}
									>
										<div className="w-full max-w-[17.332rem]">
											<Input
												type="text"
												inputId="product-image-small"
												inputName="product-image-small"
												labelContent="Картинка мальенкая"
												labelFor="product-image-small"
												inputValue={state.productImageSmallInput.value}
												// readOnly={!isProfileDataEditable}
												onInputChange={handleProductImageSmallChange}
												className={
													styles.input +
													" " +
													productImageSmallInputClasses
												}
											/>
										</div>
										{debouncedState.productImageSmallInput.validLength ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={
														"Слишком короткая ссылка на картинку товара."
													}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										{debouncedState.productImageSmallInput.validPattern ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Указанна неверная ссылка.
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										<div className="w-full max-w-[17.332rem]">
											<Input
												type="text"
												inputId="product-image-medium"
												inputName="pproduct-image-medium"
												labelContent="Картинка среднаяя"
												labelFor="product-image-medium"
												inputValue={state.productImageMediumInput.value}
												// readOnly={!isProfileDataEditable}
												onInputChange={handleProductImageMediumChange}
												className={
													styles.input +
													" " +
													productImageMediumInputClasses
												}
											/>
										</div>
										{debouncedState.productImageMediumInput.validLength ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={
														"Слишком короткая ссылка на картинку товара."
													}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										{debouncedState.productImageMediumInput.validPattern ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Указанна неверная ссылка.
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										<div className="w-full max-w-[17.332rem]">
											<Input
												type="text"
												inputId="product-image-large"
												inputName="product-image-large"
												labelContent="Картинка большая"
												labelFor="product-image-large"
												inputValue={state.productImageLargeInput.value}
												// readOnly={!isProfileDataEditable}
												onInputChange={handleProductImageLargeChange}
												className={
													styles.input +
													" " +
													productImageLargeInputClasses
												}
											/>
										</div>
										{debouncedState.productImageLargeInput.validLength ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={
														"Слишком короткая ссылка на картинку товара."
													}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										{debouncedState.productImageLargeInput.validPattern ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Указанна неверная ссылка.
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
									</div>
									<div
										className={
											"flex flex-row justify-center gap-x-[1rem] gap-y-[1rem] flex-wrap w-full"
										}
									>
										<div
											className={
												"w-full max-w-[17.332rem] max-h-[5.5rem] h-[5.5rem]"
											}
										>
											<select
												className={
													"border-none font-semibold " +
													"p-0 font-raleway " +
													"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
													"hover:bg-athens-gray-100 focus:bg-athens-gray-100 " +
													"text-blue-zodiac-950 max-h-[5.5rem] pl-[1rem] " +
													"pr-[1rem] pt-[1rem] pb-[1rem] max-w-[17.332rem] w-full " +
													styles.inputHeightFixed +
													" " +
													mainTypeSelectClasses
												}
												name="main-type"
												id="main-type"
												onChange={handleProductMainTypeChange}
												value={state.mainTypeSelect.value}
											>
												<option value="body">Для тела</option>
												<option value="face">Для лица</option>
											</select>
										</div>
										{debouncedState.mainTypeSelect.validOption === false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Не выбран основной тип товара.
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										<div
											className={
												"w-full max-w-[17.332rem] max-h-[5.5rem] h-[5.5rem] "
											}
										>
											<select
												className={
													"border-none font-semibold " +
													"p-0 font-raleway " +
													"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
													"hover:bg-athens-gray-100 focus:bg-athens-gray-100 " +
													"text-blue-zodiac-950 max-h-[5.5rem] pl-[1rem] " +
													"pr-[1rem] pt-[1rem] pb-[1rem] max-w-[17.332rem] w-full " +
													styles.inputHeightFixed +
													" " +
													secondaryTypeSelectClasses
												}
												name="secondary-type"
												id="secondary-type"
												onChange={handleProductSecondaryTypeChange}
												value={state.secondaryTypeSelect.value}
											>
												<option value="face-cream">Крем для лица</option>
												<option value="face-serum">
													Сыворотка для лица
												</option>
												<option value="face-mask">Маска для лица</option>
												<option value="face-foam">Пенка для лица</option>
												<option value="face-tonic">Тоник для лица</option>
												<option value="face-powder">
													Минеральная пудра
												</option>
												<option value="body-cream">Крем для тела</option>
												<option value="body-oil">Масло для тела</option>
												<option value="body-scrub">Скраб для тела</option>
												<option value="body-soap">
													Мыло ручной работы
												</option>
												<option value="body-bath-bomb">
													Бомбочка для ванны
												</option>
												<option value="body-bath-salt">
													Соль для ванны
												</option>
											</select>
										</div>
										{debouncedState.secondaryTypeSelect.validOption === false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Не выбран подтип товара.
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										<div
											className={
												"w-full max-w-[17.332rem] max-h-[5.5rem] h-[5.5rem] flex"
											}
										>
											{/* Here we need an array of values for value prop*/}
											{/* Problems with regex */}
											<select
												className={
													"border-none font-semibold " +
													"p-0 font-raleway " +
													"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
													"hover:bg-athens-gray-100 focus:bg-athens-gray-100 " +
													"text-blue-zodiac-950 max-h-[5.5rem] pl-[1rem] " +
													"pr-[1rem] pt-[1rem] pb-[1rem] max-w-[17.332rem] w-full " +
													styles.inputHeightFixed +
													" " +
													skinTypeSelectClasses
												}
												name="skin-type"
												id="skin-type"
												onChange={handleProductSkinTypeChange}
												value={state.skinTypeSelect.value}
												// value={["skin-dry", "skin-fat"]}
												multiple
											>
												<option value="skin-dry">Сухая кожа</option>
												<option value="skin-normal">
													Нолрмальная кожа
												</option>
												<option value="skin-fat">Жирная кожа</option>
												<option value="skin-combined">
													Комбинированая кожа
												</option>
											</select>
										</div>
										{debouncedState.skinTypeSelect.validOption === false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Не выбран тип кожи.
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
									</div>
									<div
										className={
											"flex flex-row items-center justify-center " +
											"gap-x-[1rem] gap-y-[1rem] flex-wrap w-full"
										}
									>
										<div className={"w-full max-w-[26.5rem]"}>
											<Input
												type="text"
												inputId="product-price"
												inputName="product-price"
												labelContent="Цена товара"
												labelFor="product-price"
												inputValue={state.productPriceInput.value}
												// readOnly={!isProfileDataEditable}
												onInputChange={handleProductPriceChange}
												className={
													styles.input + " " + productPriceInputClasses
												}
											/>
										</div>
										{debouncedState.productPriceInput.validLength === false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={"Цена товара слишком короткая."}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										{debouncedState.productPriceInput.validPattern === false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Цена товара должна быть указанна в формате [цена-1], [цена-2].
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										<div className={"w-full max-w-[26.5rem]"}>
											<Input
												type="text"
												inputId="product-quantity"
												inputName="product-quantity"
												labelContent="Количество товара"
												labelFor="product-quantity"
												inputValue={state.productQuantityInput.value}
												// readOnly={!isProfileDataEditable}
												onInputChange={handleProductQuantityChange}
												className={
													styles.input + " " + productQuantityInputClasses
												}
											/>
										</div>
										{debouncedState.productQuantityInput.validLength ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={
														"Указанно слишком короткое количество товара."
													}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
										{debouncedState.productQuantityInput.validPattern ===
											false &&
											createPortal(
												<Snackbar
													type={"error"}
													message={`
													Количество товара должно быть указанно в 
													формате [количество-1],[количество-2].
												`}
													autoCloseDuration={"4000"}
												/>,
												document.getElementById(
													"snackbars-container",
												) as Element,
											)}
									</div>
									<Button
										className={"mt-[5rem]"}
										type="submit"
										text={"Создать"}
										disabled={!isFormValid(state)}
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
