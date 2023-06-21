import { useState, FC, useRef, useLayoutEffect, useEffect, FormEvent } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { useScreenSize } from "shared/lib/hooks";
import { Button, Accordion, Checkbox } from "shared/ui";

import {
	displayFilter,
	hideFilter,
	displayOpenFilterButton,
	hideOpenFilterButton,
	displayCloseFilterButton,
	hideCloseFilterButton,
} from "./model";

import { FilterProps, Filters } from "./types";

import { ReactComponent as Cross } from "./assets/cross.svg";

import styles from "./styles.module.scss";

const Filter: FC<FilterProps> = ({ className }) => {
	const initialFilters: Filters = {
		filters: {
			"main-category": null,
			"secondary-category": null,
			"skin-type-category": null,
		},
	};
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

	const { width } = useScreenSize();

	const dispatch: ThunkDispatch<productModel.RootState, null, AnyAction> = useDispatch();

	// TODO Should be fixed
	const products = useSelector((state: productModel.RootState) => state.products.filteredData);
	// TODO Should be fixed

	useEffect(() => {
		console.log(selectedFilters);
	}, [selectedFilters]);

	// useEffect(() => {
	// 	console.log(selectedFilters);
	// });

	// useEffect(() => {
	// 	console.log("Filtered products");
	// 	console.log(products);
	// });

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

	function addFilter({
		prevFilters,
		selectedFilter,
		category,
	}: {
		prevFilters: Filters;
		selectedFilter: string;
		category: "secondary-category" | "skin-type-category";
	}) {
		const updatedFilters = { ...prevFilters.filters };

		if (updatedFilters[category] === null) {
			updatedFilters[category] = [selectedFilter];
		} else if (Array.isArray(updatedFilters[category])) {
			if (!updatedFilters[category]?.includes(selectedFilter)) {
				updatedFilters[category]?.push(selectedFilter);
			}
		}

		return {
			...prevFilters,
			filters: updatedFilters,
		};
	}

	function removeFilter({
		prevFilters,
		selectedFilter,
		category,
	}: {
		prevFilters: Filters;
		selectedFilter: string;
		category: "secondary-category" | "skin-type-category";
	}) {
		const updatedFilters = { ...prevFilters.filters };

		if (Array.isArray(updatedFilters[category])) {
			updatedFilters[category] = (updatedFilters[category] as Array<string>).filter(
				(filter) => filter !== selectedFilter,
			);

			if (updatedFilters[category]?.length === 0) {
				updatedFilters[category] = null;
			}
		}

		return {
			...prevFilters,
			filters: updatedFilters,
		};
	}
	// TODO So far we have two problems.
	// First stupid check for !isCheckboxChecke, it should be true than we add otherwise we remove filter.
	// Second because of React.StrictMode we have additional rerender and we eventually are adding duplicate filters.
	function handleSecondaryCategorySelect(selectedFilter: string, isCheckboxChecked: boolean) {
		console.log(isCheckboxChecked);
		if (!isCheckboxChecked) {
			setSelectedFilters((prevFilters) =>
				addFilter({ prevFilters, selectedFilter, category: "secondary-category" }),
			);
		} else {
			setSelectedFilters((prevFilters) =>
				removeFilter({ prevFilters, selectedFilter, category: "secondary-category" }),
			);
		}
	}

	function handleSkinTypeCategorySelect(selectedFilter: string, isCheckboxChecked: boolean) {
		console.log(isCheckboxChecked);
		if (!isCheckboxChecked) {
			setSelectedFilters((prevFilters) =>
				addFilter({ prevFilters, selectedFilter, category: "skin-type-category" }),
			);
		} else {
			setSelectedFilters((prevFilters) =>
				removeFilter({ prevFilters, selectedFilter, category: "skin-type-category" }),
			);
		}
	}

	function handleFormSubmit(event: FormEvent) {
		event.preventDefault();
		console.log("submit button clicked");
		// dispatch(productModel.getFilteredProductsAsync(selectedFilters));
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
						{width < 768 && (
							<Accordion triggerName={"Уход для лица"} triggerType={"legend"}>
								<div className={"flex flex-col gap-y-[1.4rem]"}>
									<Checkbox
										htmlFor={"face-cream"}
										name={"Крема"}
										id={"face-cream"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"face-serum"}
										name={"Сыворотки"}
										id={"face-serum"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"face-mask"}
										name={"Маски"}
										id={"face-mask"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"face-foam"}
										name={"Пенки"}
										id={"face-foam"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"face-tonic"}
										name={"Тоники"}
										id={"face-tonic"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										className={"mb-[2.9rem]"}
										htmlFor={"face-powder"}
										name={"Пудры"}
										id={"face-powder"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
								</div>
							</Accordion>
						)}
						{width >= 768 && (
							<div>
								<legend className={"mb-[1.9rem] lg:mb-[1.8rem]"}>
									<span
										className={
											"font-medium font-mPlus text-sm-18px text-blue-zodiac-950"
										}
									>
										Уход для лица
									</span>
								</legend>
								<div className={"overflow-hidden"}>
									<div className={"flex flex-col gap-y-[1.4rem] lg:gap-y-[1rem]"}>
										<Checkbox
											htmlFor={"face-cream"}
											name={"Крема"}
											id={"face-cream"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"face-serum"}
											name={"Сыворотки"}
											id={"face-serum"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"face-mask"}
											name={"Маски"}
											id={"face-mask"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"face-foam"}
											name={"Пенки"}
											id={"face-foam"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"face-tonic"}
											name={"Тоники"}
											id={"face-tonic"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											className={"mb-[0rem]"}
											htmlFor={"face-powder"}
											name={"Пудры"}
											id={"face-powder"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
									</div>
								</div>
							</div>
						)}
					</fieldset>
					<fieldset
						className={
							"md:col-start-2 md:col-end-3 lg:row-start-1 lg:row-end-3 " +
							styles.resetStyles
						}
					>
						{width < 768 && (
							<Accordion triggerName={"Уход для тела"} triggerType={"legend"}>
								<div className={"flex flex-col gap-y-[1.4rem]"}>
									<Checkbox
										htmlFor={"body-cream"}
										name={"Крема"}
										id={"body-cream"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"body-oil"}
										name={"Масла"}
										id={"body-oil"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"body-scrub"}
										name={"Скрабы"}
										id={"body-scrub"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"body-soap"}
										name={"Мыло"}
										id={"body-soap"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										htmlFor={"body-bath-bomb"}
										name={"Бомбочки для ванны"}
										id={"body-bath-bomb"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
									<Checkbox
										className={"mb-[2.9rem]"}
										htmlFor={"body-bath-salt"}
										name={"Соль для ванны"}
										id={"body-bath-salt"}
										onFilterSelect={handleSecondaryCategorySelect}
									/>
								</div>
							</Accordion>
						)}
						{width >= 768 && (
							<div>
								<legend className={"mb-[1.9rem] lg:mb-[1.8rem]"}>
									<span
										className={
											"font-medium font-mPlus text-sm-18px text-blue-zodiac-950"
										}
									>
										Уход для тела
									</span>
								</legend>
								<div className={"overflow-hidden"}>
									<div className={"flex flex-col gap-y-[1.4rem] lg:gap-y-[1rem]"}>
										<Checkbox
											htmlFor={"body-cream"}
											name={"Крема"}
											id={"body-cream"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"body-oil"}
											name={"Масла"}
											id={"body-oil"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"body-scrub"}
											name={"Скрабы"}
											id={"body-scrub"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"body-soap"}
											name={"Мыло"}
											id={"body-soap"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											htmlFor={"body-bath-bomb"}
											name={"Бомбочки для ванны"}
											id={"body-bath-bomb"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
										<Checkbox
											className={"mb-[0rem]"}
											htmlFor={"body-bath-salt"}
											name={"Соль для ванны"}
											id={"body-bath-salt"}
											onFilterSelect={handleSecondaryCategorySelect}
										/>
									</div>
								</div>
							</div>
						)}
					</fieldset>
					<fieldset
						className={
							"md:col-start-3 md:col-end-4 lg:row-start-1 lg:row-end-2 " +
							styles.resetStyles
						}
					>
						{width < 768 && (
							<Accordion
								className={"pb-[4.3rem]"}
								triggerName={"Тип кожи"}
								triggerType={"legend"}
							>
								<div className={"flex flex-col gap-y-[1.4rem]"}>
									<Checkbox
										htmlFor={"skin-normal"}
										name={"Нормальная"}
										id={"skin-normal"}
										onFilterSelect={handleSkinTypeCategorySelect}
									/>
									<Checkbox
										htmlFor={"skin-dry"}
										name={"Сухая"}
										id={"skin-dry"}
										onFilterSelect={handleSkinTypeCategorySelect}
									/>
									<Checkbox
										htmlFor={"skin-fat"}
										name={"Жирная"}
										id={"skin-fat"}
										onFilterSelect={handleSkinTypeCategorySelect}
									/>
									<Checkbox
										className={"mb-[0.3rem]"}
										htmlFor={"skin-combined"}
										name={"Комбинированная"}
										id={"skin-combined"}
										onFilterSelect={handleSkinTypeCategorySelect}
									/>
								</div>
							</Accordion>
						)}
						{width >= 768 && (
							<div>
								<legend className={"mb-[1.9rem] lg:mb-[1.8rem]"}>
									<span
										className={
											"font-medium font-mPlus text-sm-18px text-blue-zodiac-950"
										}
									>
										Тип кожи
									</span>
								</legend>
								<div className={"overflow-hidden"}>
									<div className={"flex flex-col gap-y-[1.4rem] lg:gap-y-[1rem]"}>
										<Checkbox
											htmlFor={"skin-normal"}
											name={"Нормальная"}
											id={"skin-normal"}
											onFilterSelect={handleSkinTypeCategorySelect}
										/>
										<Checkbox
											htmlFor={"skin-dry"}
											name={"Сухая"}
											id={"skin-dry"}
											onFilterSelect={handleSkinTypeCategorySelect}
										/>
										<Checkbox
											htmlFor={"skin-fat"}
											name={"Жирная"}
											id={"skin-fat"}
											onFilterSelect={handleSkinTypeCategorySelect}
										/>
										<Checkbox
											className={"mb-[0rem]"}
											htmlFor={"skin-combined"}
											name={"Комбинированная"}
											id={"skin-combined"}
											onFilterSelect={handleSkinTypeCategorySelect}
										/>
									</div>
								</div>
							</div>
						)}
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
