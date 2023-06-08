import { FC } from "react";
import classNames from "classnames";

import { InputProps } from "./types";

import "./styles.scss";

const Input: FC<InputProps> = ({
	inputType,
	inputId,
	inputName,
	labelContent,
	labelFor,
	classes = "",
	...rest
}) => {
	const { inputValue, onInputChange } = rest;

	const inputClasses = classNames({
		"input-number": inputType === "number",
	});

	return (
		<div className={"relative flex flex-col w-full"}>
			<label
				className={"absolute pl-[1rem] pt-[1.2rem] font-raleway text-blue-zodiac-950"}
				htmlFor={labelFor}
			>
				{labelContent}
			</label>
			<input
				className={
					classes +
					" rounded-[0.2rem] border-none font-semibold " +
					"pl-[1rem] pr-[1rem] pb-[1rem] pt-[2.4rem] font-raleway " +
					"bg-athens-gray-50 text-sm-14px duration-500 ease-out " +
					"hover:bg-athens-gray-100 focus:bg-athens-gray-100 text-blue-zodiac-950 " +
					inputClasses
				}
				type={inputType}
				name={inputName}
				id={inputId}
				value={inputValue}
				onChange={onInputChange}
			/>
		</div>
	);
};

export default Input;
