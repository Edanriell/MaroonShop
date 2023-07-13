import { FC, useState, useEffect, ChangeEvent, useRef } from "react";

import { displayInputCircle, hideInputCircle, changeLabelColor } from "./model/index";

import { RadioProps } from "./types";

import styles from "./styles.module.scss";

const Radio: FC<RadioProps> = ({ name, data, priceContainerRef }) => {
	const [selectedValue, setSelectedValue] = useState<number>();
	const [previousSelectedValue, setPreviousSelectedValue] = useState<number>();

	const inputCircleRefs = useRef<(HTMLDivElement | null)[]>([]);
	const inputLabelRefs = useRef<(HTMLLabelElement | null)[]>([]);

	const [quantity, price] = data;

	const generateRefs = () => {
		inputCircleRefs.current = data.map(() => null);
		inputLabelRefs.current = data.map(() => null);
	};

	useEffect(() => {
		generateRefs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		inputCircleRefs.current.forEach((ref, index) => {
			if (!ref) return;

			if (selectedValue === price[index]) {
				displayInputCircle(ref);
			} else if (previousSelectedValue === price[index]) {
				hideInputCircle(ref);
			}
		});

		setPreviousSelectedValue(selectedValue);
	}, [inputCircleRefs, selectedValue, previousSelectedValue, price]);

	useEffect(() => {
		inputLabelRefs.current.forEach((ref, index) => {
			if (!ref) return;

			const startColor = selectedValue === price[index] ? "#9A9DA0" : "#122947";
			const endColor = selectedValue === price[index] ? "#122947" : "#9A9DA0";

			changeLabelColor({
				startColor,
				endColor,
				elementRef: ref,
			});
		});
	}, [inputLabelRefs, selectedValue, price]);

	function updateDisplayedPrice(event: ChangeEvent<HTMLInputElement>) {
		// Here i used a declarative approach to solve the problem.
		// Unfortunately i was forced to use refs here, because refs
		// are not causing any additional unnecessary rerenders, in this case if
		// any additional rerenders appear, they will crash gsap animations (circle and label).
		if (!priceContainerRef) return;

		const RubleSvg = `
			<svg class="${styles.rubleSvg}" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.12195 17V13.7619H0V12.2143H2.12195V10.0952H0V8.28571H2.12195V0H6.70732C8.8374 
				0 10.4146 0.420635 11.439 1.26191C12.4797 2.10317 13 3.3254 13 4.92857C13 6.54762 12.439 
				7.81746 11.3171 8.7381C10.1951 9.64286 8.54471 10.0952 6.36585 
				10.0952H4.31707V12.2143H8.34146V13.7619H4.31707V17H2.12195ZM4.31707 8.28571H6.04878C7.52845 8.28571
				8.6748 8.04762 9.4878 7.57143C10.3171 7.09524 10.7317 6.2381 10.7317 5C10.7317 3.92064 10.3902
				3.11905 9.70732 2.59524C9.02439 2.07143 7.95935 1.80952 6.51219 1.80952H4.31707V8.28571Z" 
				fill="#122947"/>
			</svg>
		`;

		const priceElement = `
			<b class="font-mPlus font-medium text-sm-22px text-blue-zodiac-950 md:text-md-26px">
				${event.target.value}
			</b>
		`;

		(priceContainerRef.current as HTMLDivElement).innerHTML = `${priceElement} ${RubleSvg}`;
	}

	function handleRadioSelect(event: ChangeEvent<HTMLInputElement>) {
		setSelectedValue(+event.target.value);
		updateDisplayedPrice(event);
	}

	return (
		<div className={"flex flex-row gap-x-[1.5rem] flex-wrap gap-y-[1.5rem]"}>
			{quantity.map((quantityValue: string, index: number) => (
				<div key={index} className={"flex flex-row-reverse items-center justify-end"}>
					<label
						ref={(ref) => (inputLabelRefs.current[index] = ref)}
						className={
							"cursor-pointer font-mPlus font-normal text-sm-16px ml-[1rem] md:text-md-18px"
						}
						htmlFor={quantityValue}
					>
						{quantityValue}
					</label>
					<div className={"relative flex flex-row cursor-pointer"}>
						<input
							onChange={handleRadioSelect}
							className={styles.input}
							type="radio"
							name={name}
							value={price[index]}
							id={quantityValue}
							checked={selectedValue === price[index]}
						/>
						<div
							ref={(ref) => (inputCircleRefs.current[index] = ref)}
							className={styles.inputCircle}
						></div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Radio;
