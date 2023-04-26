import { Link } from "react-router-dom";

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
	pointer-events-auto kshczx
`;

function Button({ type, text, link, linkExternal }: Props) {
	if (type === "button") {
		return (
			<button className={buttonClasses}>
				<div className="_styled__StyledButtonFiller-sc-16l8j4-0 hCNHmm"></div>
				<span className="_styled__StyledButtonText-sc-16l8j4-8 MxKqx">
					<span className="_styled__StyledButtonTextInnter-sc-16l8j4-9 hUSNqa">
						{text}
					</span>
				</span>
			</button>
		);
	} else if (type === "link" && link) {
		return (
			<Link to={link} className={buttonClasses}>
				{text}
			</Link>
		);
	} else if (type === "link" && linkExternal) {
		return (
			<Link to={{ pathname: linkExternal }} target="_blank" className={buttonClasses}>
				{text}
			</Link>
		);
	}
	return <button className={buttonClasses}>{text}</button>;
}

export default Button;
