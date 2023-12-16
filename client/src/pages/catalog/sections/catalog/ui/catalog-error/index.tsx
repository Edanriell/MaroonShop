import { FC } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { Button } from "shared/ui";

import { CatalogErrorProps } from "./types";

const CatalogError: FC<CatalogErrorProps> = ({
	dataLoading,
	operationResultMessage,
	onReloadButtonClick,
}) => {
	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	let isErrorFatal = false;

	if (operationResultMessage.error === "Не получены критерии фильтрации товаров.") {
		isErrorFatal = false;
	} else if (
		operationResultMessage.error ===
		"По полученным критериям не удалось найти ни одного подходящего товара."
	) {
		isErrorFatal = false;
	} else {
		isErrorFatal = true;
	}

	function handleFiltersReset() {
		dispatch(productModel.setFilteredData({}));
		dispatch(productModel.clearFilterOperationResultMessage(null));
	}

	const canDisplayCatalogError = () => !dataLoading && operationResultMessage.error;

	return (
		<>
			{canDisplayCatalogError() && (
				<div
					className={
						"flex flex-col items-center justify-center col-start-1 " +
						"col-end-[-1] mt-[12rem] md:mt-[14rem]"
					}
				>
					<p
						className={
							"font-raleway text-sm-18px mb-[1.5rem] md:text-[2.2rem] " +
							"font-medium text-center"
						}
					>
						{operationResultMessage.error}
					</p>
					{isErrorFatal && (
						<Button
							text={"Обновить"}
							onClick={onReloadButtonClick}
							borderColor={"#122947"}
							backgroundColor={"#122947"}
							textColor={"#FFF"}
						/>
					)}
					{!isErrorFatal && (
						<Button
							text={"Сбросить"}
							onClick={handleFiltersReset}
							borderColor={"#122947"}
							backgroundColor={"#122947"}
							textColor={"#FFF"}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default CatalogError;
