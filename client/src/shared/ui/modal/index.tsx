import React from "react";

import { ModalProps } from "./types";
import styles from "./styles.module.scss";

const Modal = ({ title, description, children, onClose }: ModalProps) => {
	function handleCloseModalUnderlay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (event.currentTarget === event.target) onClose();
	}

	return (
		<div
			onClick={(event) => handleCloseModalUnderlay(event)}
			className="fixed top-0 left-0 z-40 w-full h-full bg-[rgba(0,0,0,0.6)] flex flex-row items-center justify-around"
		>
			<dialog
				className={
					styles.visible +
					" " +
					styles.modalShadow +
					" " +
					styles.dialogReset +
					" flex flex-col gap-y-[2rem] z-[50] border-none rounded-[0.2rem] max-w-[60rem] w-[90%] mr-[1.5rem] ml-[1.5rem] pt-[4rem] pb-[4rem] pl-[3rem] pr-[3rem]"
				}
			>
				<header className="flex flex-col items-center gap-y-[0.5rem]">
					<h2 className="font-bold font-mPlus text-sm-28px">{title}</h2>
					<p className="font-normal text-center font-raleway text-sm-14px">
						{description}
					</p>
				</header>
				<div className="">{children}</div>
				<div className="flex flex-row items-center justify-end gap-x-[1rem]">
					<button className="rounded-[0.2rem] bg-green-600 p-4" type="submit">
						Отправить
					</button>
					<button
						className="rounded-[0.2rem] bg-red-600 p-4"
						onClick={() => onClose()}
						type="button"
					>
						Закрыть окно
					</button>
				</div>
			</dialog>
		</div>
	);
};

export default Modal;
