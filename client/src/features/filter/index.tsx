import { useState, FC, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

import { Button, Accordion, Checkbox } from "shared/ui";

import {
	displayFilter,
	hideFilter,
	displayOpenFilterButton,
	hideOpenFilterButton,
	displayCloseFilterButton,
	hideCloseFilterButton,
} from "./model";

import { FilterProps } from "./types";

import { ReactComponent as Cross } from "./assets/cross.svg";

import styles from "./styles.module.scss";

const Filter: FC<FilterProps> = ({ className }) => {
	const [isShown, setIsShown] = useState<boolean>(false);
	const [isOpenFilterButtonAnimationLocked, setIsOpenFilterButtonAnimationLocked] =
		useState<boolean>(true);

	const filterRef = useRef<HTMLFormElement | null>(null);
	const openFilterButtonRef = useRef<HTMLDivElement | null>(null);
	const closeFilterButtonRef = useRef<HTMLDivElement | null>(null);

	const [filterCtx] = useState(gsap.context(() => {}, filterRef));
	const [openFilterButtonCtx] = useState(gsap.context(() => {}, openFilterButtonRef));
	const [closeFilterButtonCtx] = useState(gsap.context(() => {}, closeFilterButtonRef));

	useLayoutEffect(() => {
		if (isShown && filterRef) displayFilter(filterRef);

		filterCtx.add("hide", () => {
			hideFilter(filterRef, () => setIsShown(false));
		});

		return () => {
			filterCtx.revert();
		};
	}, [filterCtx, isShown]);

	useLayoutEffect(() => {
		if (!isShown && openFilterButtonRef && !isOpenFilterButtonAnimationLocked)
			displayOpenFilterButton(openFilterButtonRef);

		openFilterButtonCtx.add("hide", () => {
			hideOpenFilterButton(openFilterButtonRef, () => setIsShown(true));
		});

		return () => {
			openFilterButtonCtx.revert();
		};
	}, [openFilterButtonCtx, isOpenFilterButtonAnimationLocked, isShown]);

	useLayoutEffect(() => {
		if (isShown && closeFilterButtonRef) displayCloseFilterButton(closeFilterButtonRef);

		closeFilterButtonCtx.add("hide", () => {
			hideCloseFilterButton(closeFilterButtonRef);
		});

		return () => {
			closeFilterButtonCtx.revert();
		};
	}, [closeFilterButtonCtx, isShown]);

	function handleButtonClick() {
		if (isShown) {
			filterCtx.hide();
			if (isOpenFilterButtonAnimationLocked) setIsOpenFilterButtonAnimationLocked(false);
			closeFilterButtonCtx.hide();
		} else {
			openFilterButtonCtx.hide();
		}
	}

	if (isShown) {
		return (
			<>
				<div
					ref={closeFilterButtonRef}
					className={"row-start-1 row-end-2 justify-self-end pr-[1.5rem] z-[14]"}
				>
					<button
						onClick={handleButtonClick}
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
					ref={filterRef}
					className={
						"grid col-start-1 col-end-3 row-start-2 row-end-3 " +
						"justify-self-stretch pt-[10.3rem] w-full pl-[3.5rem] pr-[3.5rem] " +
						"absolute top-0 left-0 bg-desert-storm-50 z-[12] pb-[6rem] " +
						styles.filterShadow
					}
					action="#"
					method="get"
				>
					<fieldset className={styles.resetStyles + " "}>
						<Accordion triggerName={"Уход для лица"} triggerType={"legend"}>
							<div className={"flex flex-col gap-y-[1.4rem]"}>
								<Checkbox htmlFor={"cream"} name={"Крема"} id={"cream"} />
								<Checkbox htmlFor={"serum"} name={"Сыворотки"} id={"serum"} />
								<Checkbox htmlFor={"mask"} name={"Маски"} id={"mask"} />
								<Checkbox htmlFor={"foam"} name={"Пенки"} id={"foam"} />
								<Checkbox htmlFor={"tonic"} name={"Тоники"} id={"tonic"} />
								<Checkbox
									className={"mb-[2.9rem]"}
									htmlFor={"powder"}
									name={"Пудры"}
									id={"powder"}
								/>
							</div>
						</Accordion>
					</fieldset>
					<fieldset className={styles.resetStyles + " "}>
						<Accordion triggerName={"Уход для тела"} triggerType={"legend"}>
							<div className={"flex flex-col gap-y-[1.4rem]"}>
								<Checkbox htmlFor={"cream"} name={"Крема"} id={"cream"} />
								<Checkbox htmlFor={"oil"} name={"Масла"} id={"oil"} />
								<Checkbox htmlFor={"scrub"} name={"Скрабы"} id={"scrub"} />
								<Checkbox htmlFor={"soap"} name={"Мыло"} id={"soap"} />
								<Checkbox
									htmlFor={"bath-bomb"}
									name={"Бомбочки для ванны"}
									id={"bath-bomb"}
								/>
								<Checkbox
									className={"mb-[2.9rem]"}
									htmlFor={"bath-salt"}
									name={"Соль для ванны"}
									id={"bath-salt"}
								/>
							</div>
						</Accordion>
					</fieldset>
					<fieldset className={styles.resetStyles + " "}>
						<Accordion
							className={"pb-[4.3rem]"}
							triggerName={"Тип кожи"}
							triggerType={"legend"}
						>
							<div className={"flex flex-col gap-y-[1.4rem]"}>
								<Checkbox htmlFor={"normal"} name={"Нормальная"} id={"normal"} />
								<Checkbox htmlFor={"dry"} name={"Сухая"} id={"dry"} />
								<Checkbox htmlFor={"fat"} name={"Жирная"} id={"fat"} />
								<Checkbox
									className={"mb-[0.3rem]"}
									htmlFor={"combined"}
									name={"Комбинированная"}
									id={"combined"}
								/>
							</div>
						</Accordion>
					</fieldset>
					<div
						className={
							"flex flex-row items-center justify-center gap-x-[2rem] gap-y-[2rem] flex-wrap"
						}
					>
						<Button
							className={styles.buttonPadding18}
							text={"Применить"}
							type="submit"
							borderColor={"#122947"}
							backgroundColor={"#122947"}
							textColor={"#FFF"}
						/>
						<Button className={styles.buttonPadding24} text={"Сбросить"} type="reset" />
					</div>
				</form>
			</>
		);
	}

	return (
		<div
			ref={openFilterButtonRef}
			className={"row-start-1 row-end-2 justify-self-end pr-[1.5rem] z-[14]"}
		>
			<Button onClick={handleButtonClick} text={"Фильтр"} className={className} />
		</div>
	);
};

export default Filter;
