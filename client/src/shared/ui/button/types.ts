export type ButtonType = "button" | "submit" | "reset" | "link-internal" | "link-external";

export type ButtonProps = {
	text: string;
	type?: ButtonType;
	linkInternal?: string;
	linkExternal?: string;
	borderColor?: string;
	backgroundColor?: string;
	textColor?: string;
	className?: string;
	onClick?: () => void;
};
