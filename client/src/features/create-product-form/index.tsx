import { FC, ChangeEvent, useReducer, FormEvent } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

import { productModel } from "entities/product";

import { Button, Snackbar, Input } from "shared/ui";
import { useDebounce } from "shared/lib/hooks";

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

import styles from "./styles.module.scss";
import "./styles.scss";

const CreateProductForm: FC = () => {
	const [state, formDispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

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
		inputInvalid:
			state.skinTypeInput.validLength === false || state.skinTypeInput.validPattern === false,
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

	const submitButtonClasses = classNames({
		"button-disabled": !isFormValid(state),
	});

	const handleCreateNewProductFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		productModel.createNewProductAsync({
			productName: state.productNameInput.value,
			productComponents: state.productComponentsInput.value,
			productDescription: state.productDescriptionInput.value,
			productUsage: state.productUsageInput.value,
			productImageSmall: state.productImageSmallInput.value,
			productImageMedium: state.productImageMediumInput.value,
			productImageLarge: state.productImageLargeInput.value,
			mainType: state.mainTypeSelect.value,
			secondaryType: state.secondaryTypeSelect.value,
			skinType: state.skinTypeInput.value,
			productPrice: state.productPriceInput.value,
			productQuantity: state.productQuantityInput.value,
		});
	};

	return (
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
						document.getElementById("snackbars-container") as Element,
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
						document.getElementById("snackbars-container") as Element,
					)}
				<Input
					type="text"
					inputId="product-components"
					inputName="product-components"
					labelContent="Компоненты товара"
					labelFor="product-components"
					inputValue={state.productComponentsInput.value}
					onInputChange={handleProductComponentsChange}
					className={styles.input + " " + productComponentsInputClasses}
				/>
				{debouncedState.productComponentsInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткое перечесление компонентов товара."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
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
						document.getElementById("snackbars-container") as Element,
					)}
				<Input
					type="text"
					inputId="product-description"
					inputName="product-description"
					labelContent="Описание товара"
					labelFor="product-description"
					inputValue={state.productDescriptionInput.value}
					onInputChange={handleProductDescriptionChange}
					className={styles.input + " " + productDescriptionInputClasses}
				/>
				{debouncedState.productDescriptionInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткое описание товара."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				{debouncedState.productDescriptionInput.validPattern === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={`
                        Поле описание товара может содержать 
                        только кириллицу или латиницу, точку и запятую.
                    `}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
					)}
				<Input
					type="text"
					inputId="product-usage"
					inputName="product-usage"
					labelContent="Использование товара"
					labelFor="product-usage"
					inputValue={state.productUsageInput.value}
					onInputChange={handleProductUsageChange}
					className={styles.input + " " + productUsageInputClasses}
				/>
				{debouncedState.productUsageInput.validLength === false &&
					createPortal(
						<Snackbar
							type={"error"}
							message={"Слишком короткое описание способа приминение товара."}
							autoCloseDuration={"4000"}
						/>,
						document.getElementById("snackbars-container") as Element,
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
						document.getElementById("snackbars-container") as Element,
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
							onInputChange={handleProductImageSmallChange}
							className={styles.input + " " + productImageSmallInputClasses}
						/>
					</div>
					{debouncedState.productImageSmallInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Слишком короткая ссылка на картинку товара."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.productImageSmallInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`
                        Указанна неверная ссылка.
                    `}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					<div className="w-full max-w-[17.332rem]">
						<Input
							type="text"
							inputId="product-image-medium"
							inputName="pproduct-image-medium"
							labelContent="Картинка среднаяя"
							labelFor="product-image-medium"
							inputValue={state.productImageMediumInput.value}
							onInputChange={handleProductImageMediumChange}
							className={styles.input + " " + productImageMediumInputClasses}
						/>
					</div>
					{debouncedState.productImageMediumInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Слишком короткая ссылка на картинку товара."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.productImageMediumInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`
                        Указанна неверная ссылка.
                    `}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					<div className="w-full max-w-[17.332rem]">
						<Input
							type="text"
							inputId="product-image-large"
							inputName="product-image-large"
							labelContent="Картинка большая"
							labelFor="product-image-large"
							inputValue={state.productImageLargeInput.value}
							onInputChange={handleProductImageLargeChange}
							className={styles.input + " " + productImageLargeInputClasses}
						/>
					</div>
					{debouncedState.productImageLargeInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Слишком короткая ссылка на картинку товара."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.productImageLargeInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`
                        Указанна неверная ссылка.
                    `}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
				</div>
				<div
					className={
						"flex flex-row justify-center gap-x-[1rem] gap-y-[1rem] flex-wrap w-full"
					}
				>
					<div className={"w-full max-w-[17.332rem] max-h-[5.5rem] h-[5.5rem]"}>
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
							document.getElementById("snackbars-container") as Element,
						)}
					<div className={"w-full max-w-[17.332rem] max-h-[5.5rem] h-[5.5rem] "}>
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
							<option value="face-serum">Сыворотка для лица</option>
							<option value="face-mask">Маска для лица</option>
							<option value="face-foam">Пенка для лица</option>
							<option value="face-tonic">Тоник для лица</option>
							<option value="face-powder">Минеральная пудра</option>
							<option value="body-cream">Крем для тела</option>
							<option value="body-oil">Масло для тела</option>
							<option value="body-scrub">Скраб для тела</option>
							<option value="body-soap">Мыло ручной работы</option>
							<option value="body-bath-bomb">Бомбочка для ванны</option>
							<option value="body-bath-salt">Соль для ванны</option>
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
							document.getElementById("snackbars-container") as Element,
						)}
					<div className={"w-full max-w-[17.332rem] max-h-[5.5rem] h-[5.5rem] flex"}>
						<Input
							type="text"
							inputId="skin-type"
							inputName="skin-type"
							labelContent="Тип кожи"
							labelFor="skin-type"
							inputValue={state.skinTypeInput.value}
							onInputChange={handleProductSkinTypeChange}
							className={styles.input + " " + skinTypeSelectClasses}
						/>
					</div>
					{debouncedState.skinTypeInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Указан слишком короткий тип кожи."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.skinTypeInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`
                        Типом кожи может быть только "Сухая кожа | Нормальная кожа | 
                        Жирная кожа | Комбинированная кожа".
                    `}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
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
							onInputChange={handleProductPriceChange}
							className={styles.input + " " + productPriceInputClasses}
						/>
					</div>
					{debouncedState.productPriceInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Цена товара слишком короткая."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.productPriceInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`
                        Цена товара должна быть указанна в формате[цена-1, цена-2. 
                        Числа должны быть целыми.
                    `}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					<div className={"w-full max-w-[26.5rem]"}>
						<Input
							type="text"
							inputId="product-quantity"
							inputName="product-quantity"
							labelContent="Количество товара"
							labelFor="product-quantity"
							inputValue={state.productQuantityInput.value}
							onInputChange={handleProductQuantityChange}
							className={styles.input + " " + productQuantityInputClasses}
						/>
					</div>
					{debouncedState.productQuantityInput.validLength === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={"Указанно слишком короткое количество товара."}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
					{debouncedState.productQuantityInput.validPattern === false &&
						createPortal(
							<Snackbar
								type={"error"}
								message={`
									Количество товара должно быть указанно в 
									формате цело число[g | ml], например 500g, 1000ml.
                    			`}
								autoCloseDuration={"4000"}
							/>,
							document.getElementById("snackbars-container") as Element,
						)}
				</div>
				<Button
					className={submitButtonClasses + " mt-[5rem]"}
					type="submit"
					text={"Создать"}
					borderColor={"#122947"}
					backgroundColor={"#122947"}
					textColor={"#FFF"}
					disabled={!isFormValid(state)}
				/>
			</div>
		</form>
	);
};

export default CreateProductForm;
