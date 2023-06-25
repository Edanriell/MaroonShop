import { FC } from "react";

import { Button } from "shared/ui";

import { FiltersOpenButtonProps } from "./types";

const FiltersOpenButton: FC<FiltersOpenButtonProps> = ({
	isFiltersShown,
	openFilterButtonRef,
	onFilterButtonClick,
	className,
	isFiltersOpenButtonLocked,
}) => {
	return (
		<>
			{!isFiltersShown && (
				<div
					ref={openFilterButtonRef}
					className={
						"row-start-1 row-end-2 justify-self-end pr-[1.5rem] z-[14] md:pr-[0rem]"
					}
				>
					<Button
						onClick={onFilterButtonClick}
						disabled={isFiltersOpenButtonLocked}
						text={"Фильтр"}
						className={className}
					/>
				</div>
			)}
		</>
	);
};

export default FiltersOpenButton;
