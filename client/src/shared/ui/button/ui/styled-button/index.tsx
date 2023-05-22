import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

const Button = ({
	text,
	commonButtonClasses,
	handleButtonMouseEnter,
	handleButtonMouseLeave,
	buttonRef,
	buttonBoxRef,
	buttonTextRef,
	classes,
	click = () => {},
}: ButtonProps) => {
	return (
		<div onClick={() => click()} className={"relative z-10"}>
			<button
				className={commonButtonClasses + " " + classes}
				onMouseEnter={handleButtonMouseEnter}
				onMouseLeave={handleButtonMouseLeave}
				ref={buttonRef}
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
