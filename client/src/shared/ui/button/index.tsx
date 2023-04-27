import { useRef } from "react";
import { Link } from "react-router-dom";

import { mouseEnterHoverEffect, mouseLeaveHoverEffect } from "./model";

import styles from "./styles.module.scss";

type ButtonType = "button" | "link";

type Props = {
	text: string;
	type?: ButtonType;
	link?: string;
	linkExternal?: string;
};

const buttonClasses = `
	font-medium bg-transparent text-blue-zodiac-950 font-mPlus 
	text-sm-14px-lh-20px border-bombay-400 border-solid 
	border-[0.1rem] rounded-[0.2rem] pt-[1.3rem] pl-[2.8rem] pb-[1.3rem] pr-[2.8rem]
	md:text-md-16px-lh-22px pl-[2.7rem] pr-[2.7rem]
	pointer-events-auto relative overflow-hidden
`;

function Button({ type, text, link, linkExternal }: Props) {
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

	if (type === "button") {
		return (
			<button
				className={buttonClasses}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className="relative z-10 block" ref={buttonTextRef}>
					{text}
				</span>
			</button>
		);
	} else if (type === "link" && link) {
		return (
			<Link
				to={link}
				className={buttonClasses}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className="relative z-10 block" ref={buttonTextRef}>
					{text}
				</span>
			</Link>
		);
	} else if (type === "link" && linkExternal) {
		return (
			<Link
				to={{ pathname: linkExternal }}
				target="_blank"
				className={buttonClasses}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className="relative z-10 block" ref={buttonTextRef}>
					{text}
				</span>
			</Link>
		);
	}
	return (
		<button
			className={buttonClasses}
			onMouseEnter={handleButtonMouseEnter}
			onMouseLeave={handleButtonMouseLeave}
			ref={buttonRef}
		>
			<div className={styles.buttonBox} ref={buttonBoxRef}></div>
			<span className="relative z-10 block" ref={buttonTextRef}>
				{text}
			</span>
		</button>
	);
}

export default Button;
