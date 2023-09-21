import { FC } from "react";

import { Button } from "shared/ui";

import { CatalogErrorProps } from "./types";

const CatalogError: FC<CatalogErrorProps> = ({
	dataLoading,
	operationResultMessage,
	onReloadButtonClick,
}) => {
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
					<Button
						text={"Обновить"}
						onClick={onReloadButtonClick}
						borderColor={"#122947"}
						backgroundColor={"#122947"}
						textColor={"#FFF"}
					/>
				</div>
			)}
		</>
	);
};

export default CatalogError;
