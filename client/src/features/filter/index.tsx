import { useState, FC, useRef, useLayoutEffect, FormEvent } from "react";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { Button } from "shared/ui";

import { BodyFilters, FaceFilters, SkinTypeFilters } from "./ui";

import {
	initialFilters,
	addSelectedFilter,
	removeUnselectedFilter,
	displayFilter,
	hideFilter,
	displayOpenFilterButton,
	hideOpenFilterButton,
	displayCloseFilterButton,
	hideCloseFilterButton,
	FilterCategory,
} from "./model";

import { FilterProps, Filters } from "./types";

import { ReactComponent as Cross } from "./assets/cross.svg";

import styles from "./styles.module.scss";

const Filter: FC<FilterProps> = ({ className }) => {
	const [selectedFilters, setSelectedFilters] = useState<Filters>(initialFilters);

	const [isFiltersShown, setIsFiltersShown] = useState<boolean>(false);

	const [isOpenFilterButtonAnimationLocked, setIsOpenFilterButtonAnimationLocked] =
		useState<boolean>(true);

	const filterRef = useRef<HTMLFormElement | null>(null);
	const openFilterButtonRef = useRef<HTMLDivElement | null>(null);
	const closeFilterButtonRef = useRef<HTMLDivElement | null>(null);

	const [filterCtx] = useState(gsap.context(() => {}, filterRef));
	const [openFilterButtonCtx] = useState(gsap.context(() => {}, openFilterButtonRef));
	const [closeFilterButtonCtx] = useState(gsap.context(() => {}, closeFilterButtonRef));

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	useLayoutEffect(() => {
		if (isFiltersShown && filterRef) displayFilter(filterRef);

		filterCtx.add("hide", () => {
			hideFilter(filterRef, () => setIsFiltersShown(false));
		});

		return () => {
			filterCtx.revert();
		};
	}, [filterCtx, isFiltersShown]);

	useLayoutEffect(() => {
		if (!isFiltersShown && openFilterButtonRef && !isOpenFilterButtonAnimationLocked)
			displayOpenFilterButton(openFilterButtonRef);

		openFilterButtonCtx.add("hide", () => {
			hideOpenFilterButton(openFilterButtonRef, () => setIsFiltersShown(true));
		});

		return () => {
			openFilterButtonCtx.revert();
		};
	}, [openFilterButtonCtx, isOpenFilterButtonAnimationLocked, isFiltersShown]);

	useLayoutEffect(() => {
		if (isFiltersShown && closeFilterButtonRef) displayCloseFilterButton(closeFilterButtonRef);

		closeFilterButtonCtx.add("hide", () => {
			hideCloseFilterButton(closeFilterButtonRef);
		});

		return () => {
			closeFilterButtonCtx.revert();
		};
	}, [closeFilterButtonCtx, isFiltersShown]);

	function handleFilterButtonClick() {
		if (isFiltersShown) {
			filterCtx.hide();
			if (isOpenFilterButtonAnimationLocked) setIsOpenFilterButtonAnimationLocked(false);
			closeFilterButtonCtx.hide();
		} else {
			openFilterButtonCtx.hide();
		}
	}

	function handleSecondaryCategorySelect(selectedFilter: string, isCheckboxChecked: boolean) {
		if (isCheckboxChecked) {
			setSelectedFilters((prevFilters) =>
				addSelectedFilter({
					prevFilters,
					selectedFilter,
					category: FilterCategory["secondary-category"],
				}),
			);
		} else {
			setSelectedFilters((prevFilters) =>
				removeUnselectedFilter({
					prevFilters,
					selectedFilter,
					category: FilterCategory["secondary-category"],
				}),
			);
		}
	}

	function handleSkinTypeCategorySelect(selectedFilter: string, isCheckboxChecked: boolean) {
		if (isCheckboxChecked) {
			setSelectedFilters((prevFilters) =>
				addSelectedFilter({
					prevFilters,
					selectedFilter,
					category: FilterCategory["skin-type-category"],
				}),
			);
		} else {
			setSelectedFilters((prevFilters) =>
				removeUnselectedFilter({
					prevFilters,
					selectedFilter,
					category: FilterCategory["skin-type-category"],
				}),
			);
		}
	}

	function handleFormSubmit(event: FormEvent) {
		event.preventDefault();

		dispatch(productModel.getFilteredProductsAsync(selectedFilters));
	}

	if (isFiltersShown) {
		return (
			<>
				<div
					ref={closeFilterButtonRef}
					className={
						"row-start-1 row-end-2 justify-self-end pr-[1.5rem] z-[14] " +
						"md:pr-[0rem]"
					}
				>
					<button
						onClick={handleFilterButtonClick}
						className={"mt-[1.4rem] mb-[1.4rem]"}
						type="button"
					>
						<Cross
							className={
								"w-[1.4rem] h-[1.4rem] md:w-[1.8rem] md:h-[1.8rem] text-blue-zodiac-950"
							}
						/>
						<span className={"sr-only"}>Закрыть фильтры</span>
					</button>
				</div>
				<form
					onSubmit={(event) => handleFormSubmit(event)}
					ref={filterRef}
					className={
						"grid col-start-1 col-end-3 row-start-2 row-end-3 " +
						"justify-self-stretch pt-[10.3rem] w-full pl-[3.5rem] pr-[3.5rem] " +
						"absolute top-0 left-0 bg-desert-storm-50 z-[12] pb-[6rem] " +
						"md:pt-[11.7rem] md:pb-[12rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
						"md:grid-cols-3-auto md:grid-rows-2-auto md:gap-y-[4.6rem] md:gap-x-[6rem] " +
						"lg:justify-center lg:gap-y-[0rem] lg:gap-x-[8rem] " +
						styles.filterShadow
					}
					action="#"
					method="get"
				>
					<fieldset
						className={
							"grid md:col-start-1 md:col-end-2 lg:row-start-1 lg:row-end-3 " +
							styles.resetStyles
						}
					>
						<BodyFilters onFilterSelect={handleSecondaryCategorySelect} />
					</fieldset>
					<fieldset
						className={
							"md:col-start-2 md:col-end-3 lg:row-start-1 lg:row-end-3 " +
							styles.resetStyles
						}
					>
						<FaceFilters onFilterSelect={handleSecondaryCategorySelect} />
					</fieldset>
					<fieldset
						className={
							"md:col-start-3 md:col-end-4 lg:row-start-1 lg:row-end-2 " +
							styles.resetStyles
						}
					>
						<SkinTypeFilters onFilterSelect={handleSkinTypeCategorySelect} />
					</fieldset>
					<div
						className={
							"flex flex-row items-center justify-center gap-x-[2rem] " +
							"gap-y-[2rem] flex-wrap md:col-start-1 md:col-end-4 " +
							"lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 " +
							"lg:self-end"
						}
					>
						<Button
							className={styles.applyChangesButtonPadding}
							text={"Применить"}
							type="submit"
							borderColor={"#122947"}
							backgroundColor={"#122947"}
							textColor={"#FFF"}
						/>
						<Button
							className={styles.resetButtonPadding}
							text={"Сбросить"}
							type="reset"
						/>
					</div>
				</form>
			</>
		);
	}

	return (
		<div
			ref={openFilterButtonRef}
			className={"row-start-1 row-end-2 justify-self-end pr-[1.5rem] z-[14] md:pr-[0rem]"}
		>
			<Button onClick={handleFilterButtonClick} text={"Фильтр"} className={className} />
		</div>
	);
};

export default Filter;
