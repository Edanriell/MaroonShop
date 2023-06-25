import { FC } from "react";

import { ReactComponent as Cross } from "./assets/cross.svg";

import { FiltersCloseButtonProps } from "./types";

const FiltersCloseButton: FC<FiltersCloseButtonProps> = ({
	isFiltersShown,
	closeFilterButtonRef,
	onFilterButtonClick,
	isFiltersCloseButtonLocked,
}) => {
	return (
		<>
			{isFiltersShown && (
				<div
					ref={closeFilterButtonRef}
					className={
						"row-start-1 row-end-2 justify-self-end pr-[1.5rem] z-[14] " +
						"md:pr-[0rem]"
					}
				>
					<button
						onClick={onFilterButtonClick}
						className={"mt-[1.4rem] mb-[1.4rem]"}
						type="button"
						disabled={isFiltersCloseButtonLocked}
					>
						<Cross
							className={
								"w-[1.4rem] h-[1.4rem] md:w-[1.8rem] md:h-[1.8rem] text-blue-zodiac-950"
							}
						/>
						<span className={"sr-only"}>Закрыть фильтры</span>
					</button>
				</div>
			)}
		</>
	);
};

export default FiltersCloseButton;
