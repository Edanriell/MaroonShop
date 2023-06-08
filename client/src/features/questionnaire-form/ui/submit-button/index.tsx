import { useEffect, useRef, FC } from "react";
import classNames from "classnames";

import { Spinner } from "shared/ui";

import { displayElement } from "./model";

import { SubmitButtonContentProps, SubmitButtonProps } from "./types";

const SubmitButtonContent: FC<SubmitButtonContentProps> = ({ isFormSubmitting }) => {
	const spinnerRef = useRef<HTMLDivElement | null>(null);
	const textContentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		displayElement(spinnerRef);
		displayElement(textContentRef);
	}, [isFormSubmitting]);

	if (isFormSubmitting) {
		return (
			<div ref={spinnerRef} className="flex flex-row items-center justify-center">
				<span className="mr-[1rem]">Отправляем данные</span>
				<Spinner width={"3rem"} height={"3rem"} color={"blue-zodiac-950"} />
			</div>
		);
	}

	return (
		<div ref={textContentRef}>
			<span>Отправить</span>
		</div>
	);
};

const SubmitButton: FC<SubmitButtonProps> = ({
	isFormValid,
	isFormSubmitting,
	isFormSuccessfullySubmitted,
}) => {
	const submitButtonClasses = classNames({
		"button-disabled":
			!isFormValid() || isFormSuccessfullySubmitted !== null || isFormSubmitting,
	});

	return (
		<button
			className={
				submitButtonClasses +
				" rounded-[0.2rem] p-4 font-raleway text-blue-zodiac-950 " +
				"text-sm-12px bg-athens-gray-50 hover:bg-athens-gray-100 " +
				"font-medium duration-500 ease-out flex-shrink-0 flex-grow-0 " +
				"h-[5.5rem]"
			}
			type="submit"
			disabled={!isFormValid() || isFormSuccessfullySubmitted !== null}
		>
			<SubmitButtonContent isFormSubmitting={isFormSubmitting} />
		</button>
	);
};

export default SubmitButton;
