export type SnackbarProps = {
	type: "error" | "warning" | "info" | "success";
	message: string;
	autoCloseDuration?: string;
};
