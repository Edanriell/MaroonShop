import { useRef, FC } from "react";

import { StyledButton, StyledLinkInternal, StyledLinkExternal } from "./ui";

import { mouseEnterHoverEffect, mouseLeaveHoverEffect } from "./model";

import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
	type,
	text,
	linkInternal,
	linkExternal,
	className = "",
	borderColor,
	backgroundColor,
	textColor,
	onClick,
	disabled = false,
}) => {
	const buttonBoxRef = useRef<HTMLDivElement | null>(null);
	const buttonTextRef = useRef<HTMLSpanElement | null>(null);
	const buttonRef = useRef<null>(null);

	const commonButtonClasses =
		"font-medium bg-transparent text-blue-zodiac-950 font-mPlus " +
		"text-sm-14px-lh-20px border-bombay-400 border-solid " +
		"border-[0.1rem] rounded-[0.2rem] pt-[1rem] pl-[2.8rem] pb-[1rem] pr-[2.8rem] " +
		"md:text-md-16px-lh-22px md:pl-[2.7rem] md:pr-[2.7rem] md:pt-[0.9rem] md:pb-[0.9rem] " +
		"pointer-events-auto relative overflow-hidden inline-block";

	function handleButtonMouseEnter() {
		mouseEnterHoverEffect({
			buttonBoxRef,
			buttonTextRef,
			buttonRef,
			borderColor,
			backgroundColor,
			textColor,
		});
	}

	function handleButtonMouseLeave() {
		mouseLeaveHoverEffect({
			buttonBoxRef,
			buttonTextRef,
			buttonRef,
			borderColor,
			backgroundColor,
			textColor,
		});
	}

	if (type === "link-internal" && linkInternal) {
		return (
			<StyledLinkInternal
				text={text}
				additionalClassNames={commonButtonClasses}
				onButtonMouseEnter={handleButtonMouseEnter}
				onButtonMouseLeave={handleButtonMouseLeave}
				buttonRef={buttonRef}
				buttonBoxRef={buttonBoxRef}
				buttonTextRef={buttonTextRef}
				linkInternal={linkInternal}
				className={className}
				style={{ borderColor: borderColor }}
			/>
		);
	}

	if (type === "link-external" && linkExternal) {
		return (
			<StyledLinkExternal
				text={text}
				additionalClassNames={commonButtonClasses}
				onButtonMouseEnter={handleButtonMouseEnter}
				onButtonMouseLeave={handleButtonMouseLeave}
				buttonRef={buttonRef}
				buttonBoxRef={buttonBoxRef}
				buttonTextRef={buttonTextRef}
				linkExternal={linkExternal}
				className={className}
				style={{ borderColor: borderColor }}
			/>
		);
	}

	return (
		<StyledButton
			type={type}
			text={text}
			additionalClassNames={commonButtonClasses}
			onButtonMouseEnter={handleButtonMouseEnter}
			onButtonMouseLeave={handleButtonMouseLeave}
			buttonRef={buttonRef}
			buttonBoxRef={buttonBoxRef}
			buttonTextRef={buttonTextRef}
			className={className}
			onClick={onClick}
			style={{ borderColor: borderColor }}
			disabled={disabled}
		/>
	);
};

export default Button;
