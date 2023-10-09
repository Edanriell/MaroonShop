import { FC } from "react";

import { Button } from "shared/ui";

import { BestSellingProductsErrorProps } from "./types";

const BestSellingProductsError: FC<BestSellingProductsErrorProps> = ({
	onReloadButtonClick,
	errorMessage,
}) => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-raleway text-sm-14px mb-[1rem] md:text-md-18px font-medium"}>
				{errorMessage}
			</p>
			<Button
				text={"Обновить"}
				onClick={onReloadButtonClick}
				borderColor={"#122947"}
				backgroundColor={"#122947"}
				textColor={"#FFF"}
			/>
		</div>
	);
};

export default BestSellingProductsError;
