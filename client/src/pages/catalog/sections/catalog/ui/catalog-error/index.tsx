import { FC } from "react";

import { Button } from "shared/ui";

import { CatalogErrorProps } from "./types";

const CatalogError: FC<CatalogErrorProps> = ({
	dataLoading,
	isProductsEmpty,
	isFilteredProductsEmpty,
	onReloadButtonClick,
}) => {
	return (
		<>
			{!dataLoading && isProductsEmpty && isFilteredProductsEmpty && (
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
						Не удалось загрузить товары.
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
