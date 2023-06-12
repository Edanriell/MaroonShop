export type ButtonType = "button" | "submit" | "reset" | "link-internal" | "link-external";

export type ButtonProps = {
	text: string;
	type?: ButtonType;
	linkInternal?: string;
	linkExternal?: string;
	darkBorder?: boolean;
	className?: string;
	onClick?: () => void;
};
