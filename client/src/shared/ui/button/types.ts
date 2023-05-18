export type ButtonType = "button" | "link-internal" | "link-external";

export type ButtonProps = {
	text: string;
	type?: ButtonType;
	linkInternal?: string;
	linkExternal?: string;
	classes?: string;
};
