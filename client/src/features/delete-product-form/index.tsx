import { FC, ChangeEvent, useReducer, FormEvent } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

import { productModel } from "entities/product";

import { Button, Snackbar, Input } from "shared/ui";
import { useDebounce } from "shared/lib/hooks";

import { reducer, initialFormState } from "./model/store";
import { changingProductNameAction } from "./model/actions";
import { isFormValid } from "./model";

import { DeleteProductFormProps } from "./types";

import styles from "./styles.module.scss";
import "./styles.scss";

const DeleteProductForm: FC<DeleteProductFormProps> = ({ selectedProduct }) => {
	const [state, formDispatch] = useReducer(reducer, initialFormState);
	const [debouncedState] = useDebounce(state, 2000);

	const handleProductNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		formDispatch(changingProductNameAction(event.target.value));
	};

	const productNameInputClasses = classNames({
		inputInvalid:
			state.productNameInput.validLength === false ||
			state.productNameInput.validPattern === false ||
			!(selectedProduct.name === state.productNameInput.value),
	});

	const submitButtonClasses = classNames({
		"button-disabled":
			!isFormValid(state) || !(selectedProduct.name === state.productNameInput.value),
	});

	const handleCreateNewProductFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		productModel.deleteExistingProductAsync({
			productId: selectedProduct.id,
			productName: state.productNameInput.value,
		});
	};

	return (
		<form onSubmit={handleCreateNewProductFormSubmit}>
			<div className={"flex flex-col items-center gap-y-[1rem]"}>
				<Input
					type="text"
					inputId="product-name"
					inputName="product-name"
					labelContent={`Введите полное название товара: ${selectedProduct.name}`}
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
				<Button
					className={submitButtonClasses + " mt-[5rem]"}
					type="submit"
					text={"Удалить"}
					borderColor={"#122947"}
					backgroundColor={"#122947"}
					textColor={"#FFF"}
					disabled={
						!isFormValid(state) ||
						!(selectedProduct.name === state.productNameInput.value)
					}
				/>
			</div>
		</form>
	);
};

export default DeleteProductForm;
