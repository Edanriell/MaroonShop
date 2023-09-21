import { FC } from "react";

import { ReactComponent as Line } from "./assets/line.svg";
import { ReactComponent as LeftArrow } from "./assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "./assets/right-arrow.svg";

import { CatalogPaginationProps } from "./types";

const CatalogPagination: FC<CatalogPaginationProps> = ({
	dataLoading,
	operationResultMessage,
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePreviousPageChange = () => {
		if (currentPage === 1) return;
		onPageChange(currentPage - 1);
	};

	const handleNextPageChange = () => {
		if (currentPage === totalPages) return;
		onPageChange(currentPage + 1);
	};

	const canDisplayCatalogPagination = () => !dataLoading && !operationResultMessage.error;

	return (
		<>
			{canDisplayCatalogPagination() && (
				<div
					className={
						"mt-[3.5rem] flex flex-row items-center justify-between md:mt-[5rem] " +
						"md:justify-between"
					}
				>
					<div
						className={
							"flex flex-row items-center md:justify-center md:w-full md:pl-[8.5rem]"
						}
					>
						<span
							className={
								"font-medium font-mPlus text-sm-14px-lh-20px text-blue-950 " +
								"md:text-md-18px"
							}
						>
							{currentPage}
						</span>
						<Line
							className={
								"w-[3rem] h-[0.1rem] text-blue-zodiac-950 mr-[0.8rem] " +
								"ml-[0.8rem] md:w-[5rem] md:mr-[1rem] md:ml-[1rem]"
							}
						/>
						<span
							className={
								"font-medium font-mPlus text-sm-14px-lh-20px text-manatee-500 " +
								"md:text-md-18px"
							}
						>
							{totalPages}
						</span>
					</div>
					{totalPages >= 2 && (
						<div
							className={
								"flex flex-row items-center gap-x-[3rem] md:gap-x-[3.2rem] md:justify-self-end"
							}
						>
							<button
								onClick={handlePreviousPageChange}
								type="button"
								disabled={currentPage === 1}
							>
								<LeftArrow
									className={
										"w-[2.4rem] h-[1.1rem] text-blue-950 md:w-[2.6rem] md:h-[1.2rem] " +
										"ease-in-out duration-[250ms] hover:scale-[1.1] " +
										"active:translate-x-[-0.4rem] active:scale-[1.1]"
									}
								/>
								<span className={"sr-only"}>Предыдущие товары</span>
							</button>
							<button
								onClick={handleNextPageChange}
								type="button"
								disabled={currentPage === totalPages}
							>
								<RightArrow
									className={
										"w-[2.4rem] h-[1.1rem] text-blue-950 md:w-[2.6rem] md:h-[1.2rem] " +
										"ease-in-out duration-[250ms] hover:scale-[1.1] " +
										"active:translate-x-[0.4rem] active:scale-[1.1]"
									}
								/>
								<span className={"sr-only"}>Следующие товары</span>
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default CatalogPagination;
