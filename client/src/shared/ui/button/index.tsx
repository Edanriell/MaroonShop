import { useRef } from "react";

import { StyledButton, StyledLinkInternal, StyledLinkExternal } from "./ui";

import { mouseEnterHoverEffect, mouseLeaveHoverEffect } from "./model";

type ButtonType = "button" | "link-internal" | "link-external";

type Props = {
	text: string;
	type?: ButtonType;
	linkInternal?: string;
	linkExternal?: string;
};

const commonButtonClasses = `
	font-medium bg-transparent text-blue-zodiac-950 font-mPlus 
	text-sm-14px-lh-20px border-bombay-400 border-solid 
	border-[0.1rem] rounded-[0.2rem] pt-[1rem] pl-[2.8rem] pb-[1rem] pr-[2.8rem]
	md:text-md-16px-lh-22px md:pl-[2.7rem] md:pr-[2.7rem] md:pt-[0.9rem] md:pb-[0.9rem]
	pointer-events-auto relative overflow-hidden inline-block
`;

const Button = ({ type, text, linkInternal, linkExternal }: Props) => {
	const buttonBoxRef = useRef(null);
	const buttonTextRef = useRef(null);
	const buttonRef = useRef(null);

	function handleButtonMouseEnter() {
		mouseEnterHoverEffect({
			buttonBoxRef,
			buttonTextRef,
			buttonRef,
		});
	}

	function handleButtonMouseLeave() {
		mouseLeaveHoverEffect({
			buttonBoxRef,
			buttonTextRef,
			buttonRef,
		});
	}

	if (type === "link-internal" && linkInternal) {
		return (
			<StyledLinkInternal
				text={text}
				buttonClasses={commonButtonClasses}
				handleButtonMouseEnter={handleButtonMouseEnter}
				handleButtonMouseLeave={handleButtonMouseLeave}
				buttonRef={buttonRef}
				buttonBoxRef={buttonBoxRef}
				buttonTextRef={buttonTextRef}
				linkInternal={linkInternal}
			/>
		);
	}

	if (type === "link-external" && linkExternal) {
		return (
			<StyledLinkExternal
				text={text}
				buttonClasses={commonButtonClasses}
				handleButtonMouseEnter={handleButtonMouseEnter}
				handleButtonMouseLeave={handleButtonMouseLeave}
				buttonRef={buttonRef}
				buttonBoxRef={buttonBoxRef}
				buttonTextRef={buttonTextRef}
				linkExternal={linkExternal}
			/>
		);
	}

	return (
		<StyledButton
			text={text}
			buttonClasses={commonButtonClasses}
			handleButtonMouseEnter={handleButtonMouseEnter}
			handleButtonMouseLeave={handleButtonMouseLeave}
			buttonRef={buttonRef}
			buttonBoxRef={buttonBoxRef}
			buttonTextRef={buttonTextRef}
		/>
	);
};

export default Button;
