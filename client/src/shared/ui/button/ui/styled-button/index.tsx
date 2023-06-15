import { FC } from "react";

import { ButtonProps } from "./types";

import styles from "./styles.module.scss";

const Button: FC<ButtonProps> = ({
	type = "button",
	text,
	additionalClassNames,
	onButtonMouseEnter,
	onButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	className,
	onClick = () => {},
	...style
}) => {
	return (
		<div onClick={() => onClick()} className={"relative z-10"}>
			<button
				type={type}
				className={additionalClassNames + " " + className}
				onMouseEnter={onButtonMouseEnter}
				onMouseLeave={onButtonMouseLeave}
				ref={buttonRef}
				{...style}
			>
				<div className={styles.buttonBox} ref={buttonBoxRef}></div>
				<span className={"relative z-10 block"} ref={buttonTextRef}>
					{text}
				</span>
			</button>
		</div>
	);
};

export default Button;
