import { FC } from "react";

import { ReactComponent as Line } from "./assets/line.svg";
import { ReactComponent as LeftArrow } from "./assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "./assets/right-arrow.svg";

import { CatalogPaginationProps } from "./types";

const CatalogPagination: FC<CatalogPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	function handlePreviousPageChange() {
		if (currentPage === 1) return;
		onPageChange(currentPage - 1);
	}

	function handleNextPageChange() {
		if (currentPage === totalPages) return;
		onPageChange(currentPage + 1);
	}

	return (
		<div className="mt-[3.5rem] flex flex-row items-center justify-between">
			<div className="flex flex-row items-center">
				<span className="font-medium font-mPlus text-sm-14px-lh-20px text-blue-950">
					{currentPage}
				</span>
				<Line className="w-[3rem] h-[0.1rem] text-blue-zodiac-950 mr-[0.8rem] ml-[0.8rem]" />
				<span className="font-medium font-mPlus text-sm-14px-lh-20px text-manatee-500">
					{totalPages}
				</span>
			</div>
			<div className="flex flex-row items-center gap-x-[3rem]">
				<button
					onClick={handlePreviousPageChange}
					type="button"
					disabled={currentPage === 1}
				>
					<LeftArrow className="w-[2.4rem] h-[1.1rem] text-blue-950" />
					<span className="sr-only">Предыдущие товары</span>
				</button>
				<button
					onClick={handleNextPageChange}
					type="button"
					disabled={currentPage === totalPages}
				>
					<RightArrow className="w-[2.4rem] h-[1.1rem] text-blue-950" />
					<span className="sr-only">Следующие товары</span>
				</button>
			</div>
		</div>
	);
};

export default CatalogPagination;
