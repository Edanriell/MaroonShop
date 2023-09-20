import { FC } from "react";

import { Spinner } from "shared/ui";

import { CatalogLoadingProps } from "./types";

const CatalogLoading: FC<CatalogLoadingProps> = ({ dataLoading }) => {
	const canDisplayCatalogLoading = () => dataLoading;

	return (
		<>
			{canDisplayCatalogLoading() && (
				<div className="flex flex-col items-center justify-center mt-[12rem] md:mt-[14rem]">
					<p className="font-raleway font-medium text-sm-18px mb-[1rem] md:text-[2.2rem]">
						Загрузка товаров
					</p>
					<Spinner
						className={"w-[4.2rem] h-[4.2rem] md:w-[4.6rem] md:h-[4.6rem]"}
						width={"3rem"}
						height={"3rem"}
						color={"blue-zodiac-950"}
					/>
				</div>
			)}
		</>
	);
};

export default CatalogLoading;
