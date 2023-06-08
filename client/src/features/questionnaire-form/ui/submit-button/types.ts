export type SubmitButtonContentProps = {
	isFormSubmitting: boolean;
};

export type SubmitButtonProps = {
	isFormValid: () => boolean;
	isFormSubmitting: boolean;
	isFormSuccessfullySubmitted: boolean | null;
};
