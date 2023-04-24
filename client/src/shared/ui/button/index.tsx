import { Link } from "react-router-dom";

type ButtonType = "button" | "link";

type Props = {
	text: string;
	type?: ButtonType;
	linkInner?: string;
	linkOuter?: string;
};

const buttonClasses = "";

function Button({ type, text, linkInner, linkOuter }: Props) {
	if (type === "button") {
		return <button className={buttonClasses}>{text}</button>;
	} else if (type === "link" && linkInner) {
		return (
			<Link to={linkInner} className={buttonClasses}>
				{text}
			</Link>
		);
	} else if (type === "link" && linkOuter) {
		return (
			<a href={linkOuter} className={buttonClasses}>
				{text}
			</a>
		);
	}
	return <button className={buttonClasses}>{text}</button>;
}

export default Button;
