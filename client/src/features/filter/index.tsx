import { useState, FC, useRef, useLayoutEffect, FormEvent } from "react";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

import { Button } from "shared/ui";

import {
	BodyFilters,
	FaceFilters,
	SkinTypeFilters,
	FiltersCloseButton,
	FiltersOpenButton,
} from "./ui";

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

import styles from "./styles.module.scss";

const Filter: FC<FilterProps> = ({ className }) => {
	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	const [selectedFilters, setSelectedFilters] = useState<Filters>(initialFilters);
	const [isFiltersReset, setIsFiltersReset] = useState<boolean>(false);

	const [isFiltersShown, setIsFiltersShown] = useState<boolean>(false);

	const filterRef = useRef<HTMLFormElement | null>(null);
	const openFilterButtonRef = useRef<HTMLDivElement | null>(null);
	const closeFilterButtonRef = useRef<HTMLDivElement | null>(null);

	const [filterCtx] = useState(gsap.context(() => {}, filterRef));
	const [openFilterButtonCtx] = useState(gsap.context(() => {}, openFilterButtonRef));
	const [closeFilterButtonCtx] = useState(gsap.context(() => {}, closeFilterButtonRef));

	const [isFiltersCloseButtonLocked, setIsFiltersCloseButtonLocked] = useState<boolean>(false);
	const [isFiltersOpenButtonLocked, setIsFiltersOpenButtonLocked] = useState<boolean>(false);

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
		if (!isFiltersShown && openFilterButtonRef) displayOpenFilterButton(openFilterButtonRef);

		openFilterButtonCtx.add("hide", () => {
			hideOpenFilterButton(
				openFilterButtonRef,
				() => setIsFiltersShown(true),
				() => setIsFiltersOpenButtonLocked(false),
			);
		});

		return () => {
			openFilterButtonCtx.revert();
		};
	}, [openFilterButtonCtx, isFiltersShown]);

	useLayoutEffect(() => {
		if (isFiltersShown && closeFilterButtonRef) displayCloseFilterButton(closeFilterButtonRef);

		closeFilterButtonCtx.add("hide", () => {
			hideCloseFilterButton(closeFilterButtonRef, () => setIsFiltersCloseButtonLocked(false));
		});

		return () => {
			closeFilterButtonCtx.revert();
		};
	}, [closeFilterButtonCtx, isFiltersShown]);

	function handleFilterButtonClick() {
		if (isFiltersShown) {
			setIsFiltersCloseButtonLocked(true);
			filterCtx.hide();
			closeFilterButtonCtx.hide();
		} else {
			setIsFiltersOpenButtonLocked(true);
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

	function handleFiltersSelect(event: FormEvent) {
		event.preventDefault();
		dispatch(
			productModel.getFilteredProductsByCategoriesAsync({
				secondaryCategory: selectedFilters.filters["secondary-category"],
				skinTypeCategory: selectedFilters.filters["skin-type-category"],
			}),
		);
		setIsFiltersReset(false);
	}

	function handleFiltersReset() {
		dispatch(productModel.setFilteredData({}));
		dispatch(productModel.clearFilterOperationResultMessage(null));
		setSelectedFilters(initialFilters);
		setIsFiltersReset(true);
	}

	return (
		<>
			<FiltersCloseButton
				onFilterButtonClick={handleFilterButtonClick}
				isFiltersShown={isFiltersShown}
				closeFilterButtonRef={closeFilterButtonRef}
				isFiltersCloseButtonLocked={isFiltersCloseButtonLocked}
			/>
			<FiltersOpenButton
				isFiltersShown={isFiltersShown}
				openFilterButtonRef={openFilterButtonRef}
				onFilterButtonClick={handleFilterButtonClick}
				className={className}
				isFiltersOpenButtonLocked={isFiltersOpenButtonLocked}
			/>
			<form
				onSubmit={(event) => handleFiltersSelect(event)}
				ref={filterRef}
				className={
					"grid col-start-1 col-end-3 row-start-2 row-end-3 " +
					"justify-self-stretch pt-[10.3rem] w-full pl-[3.5rem] pr-[3.5rem] " +
					"absolute top-0 left-0 bg-desert-storm-50 z-[12] pb-[6rem] " +
					"md:pt-[11.7rem] md:pb-[12rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
					"md:grid-cols-3-auto md:grid-rows-2-auto md:gap-y-[4.6rem] md:gap-x-[6rem] " +
					"lg:justify-center lg:gap-y-[0rem] lg:gap-x-[8rem] hidden " +
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
					<BodyFilters
						onFilterSelect={handleSecondaryCategorySelect}
						isFiltersReset={isFiltersReset}
					/>
				</fieldset>
				<fieldset
					className={
						"md:col-start-2 md:col-end-3 lg:row-start-1 lg:row-end-3 " +
						styles.resetStyles
					}
				>
					<FaceFilters
						onFilterSelect={handleSecondaryCategorySelect}
						isFiltersReset={isFiltersReset}
					/>
				</fieldset>
				<fieldset
					className={
						"md:col-start-3 md:col-end-4 lg:row-start-1 lg:row-end-2 " +
						styles.resetStyles
					}
				>
					<SkinTypeFilters
						onFilterSelect={handleSkinTypeCategorySelect}
						isFiltersReset={isFiltersReset}
					/>
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
						onClick={handleFiltersReset}
						className={styles.resetButtonPadding}
						text={"Сбросить"}
						type="reset"
					/>
				</div>
			</form>
		</>
	);
};

export default Filter;
