import { ReactNode } from "react";

export type ModalProps = {
	title: string;
	description: string;
	children: ReactNode;
	onModalClose: () => void;
};
