import { FC } from "react";

import { Button } from "shared/ui";

import { BestsellersErrorProps } from "./types";

const BestsellersError: FC<BestsellersErrorProps> = ({ onReloadButtonClick }) => {
	return (
		<div
			className={
				"flex flex-col items-center md:absolute " +
				"md:top-[50%] md:left-[50%] md:translate-x-[-50%] " +
				"md:tranlsate-y-[-50%]"
			}
		>
			<p className={"font-raleway text-sm-14px mb-[1rem] md:text-md-18px font-medium"}>
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
	);
};

export default BestsellersError;
