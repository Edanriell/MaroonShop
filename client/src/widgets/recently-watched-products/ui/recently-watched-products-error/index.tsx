import { FC } from "react";

import { Button } from "shared/ui";

import { RecentlyWatchedProductsErrorProps } from "./types";

const RecentlyWatchedProductsError: FC<RecentlyWatchedProductsErrorProps> = ({
	errorMessage,
	onReloadButtonClick,
}) => {
	return (
		<div
			className={
				"flex flex-col items-center justify-center col-start-1 " +
				"col-end-[-1] mt-[12rem] mb-[12rem] md:mt-[28rem] md:mb-[28rem] " +
				"lg:mt-[14rem] lg:mb-[14rem]"
			}
		>
			<p
				className={
					"font-raleway text-sm-18px mb-[1.5rem] md:text-[2.2rem] " +
					"font-medium text-center"
				}
			>
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

export default RecentlyWatchedProductsError;
