import { FC, useState, useRef, useEffect, ChangeEvent } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

import { displayInputCircle, hideInputCircle, changeLabelColor } from "./model/index";

import { CheckboxProps } from "./types";

import styles from "./styles.module.scss";

const Checkbox: FC<CheckboxProps> = ({ htmlFor, name, id, className, onFilterSelect }) => {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const inputCircleRef = useRef<HTMLDivElement | null>(null);
	const inputLabelRef = useRef<HTMLLabelElement | null>(null);

	const [inputCircleCtx] = useState(gsap.context(() => {}, inputCircleRef));
	const [inputLabelCtx] = useState(gsap.context(() => {}, inputLabelRef));

	useEffect(() => {
		if (isChecked === true) {
			displayInputCircle(inputCircleRef);
		}

		inputCircleCtx.add("hide", () => {
			hideInputCircle(inputCircleRef, () => setIsChecked(false));
		});
	}, [inputCircleCtx, isChecked]);

	useEffect(() => {
		if (isChecked === true) {
			changeLabelColor({
				startColor: "#9A9DA0",
				endColor: "#122947",
				elementRef: inputLabelRef,
			});
		}

		inputLabelCtx.add("change", () => {
			changeLabelColor({
				startColor: "#122947",
				endColor: "#9A9DA0",
				elementRef: inputLabelRef,
			});
		});
	}, [inputLabelCtx, isChecked]);

	const labelClasses = classNames({
		"text-blue-zodiac-950": isChecked,
		"text-manatee-500": !isChecked,
	});

	function handleCheckboxToggle(event: ChangeEvent) {
		if (event.currentTarget === event.target) {
			if (!isChecked) {
				setIsChecked(true);
			} else {
				inputLabelCtx.change();
				inputCircleCtx.hide();
			}
		}
	}

	function handleCheckboxCheck(
		event: ChangeEvent,
		onFilterSelect?: CheckboxProps["onFilterSelect"],
	) {
		handleCheckboxToggle(event);

		if (onFilterSelect) {
			const selectedFilter = id;
			const isCheckboxChecked = isChecked;

			if (event.currentTarget === event.target) {
				onFilterSelect(selectedFilter, isCheckboxChecked);
			}
		}
	}

	return (
		<div className={"flex flex-row-reverse items-center justify-end " + className}>
			<label
				ref={inputLabelRef}
				className={
					labelClasses + " cursor-pointer font-mPlus font-normal text-sm-16px ml-[1rem]"
				}
				htmlFor={htmlFor}
			>
				{name}
			</label>
			<div className={"flex flex-row relative cursor-pointer"}>
				<input
					onChange={(event) => handleCheckboxCheck(event, onFilterSelect)}
					className={styles.input}
					type="checkbox"
					name={name}
					id={id}
					checked={isChecked}
				/>
				<div ref={inputCircleRef} className={styles.inputCircle}></div>
			</div>
		</div>
	);
};

export default Checkbox;
