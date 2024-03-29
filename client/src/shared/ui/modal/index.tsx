import { useLayoutEffect, useRef, useState, MouseEvent, FC } from "react";
import { gsap } from "gsap";

import { useControlScrollbar } from "shared/lib/hooks";

import { displayModal, hideModal, displayBackdrop, hideBackdrop } from "./model";

import { ModalProps } from "./types";

import styles from "./styles.module.scss";

const Modal: FC<ModalProps> = ({ title, description, children, onModalClose }) => {
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const modalRef = useRef<HTMLDialogElement | null>(null);

	const [backdropCtx] = useState(gsap.context(() => {}, backdropRef));
	const [modalCtx] = useState(gsap.context(() => {}, modalRef));

	useControlScrollbar();

	useLayoutEffect(() => {
		displayModal(modalRef);

		modalCtx.add("hide", () => {
			hideModal(modalRef, onModalClose);
		});

		return () => {
			modalCtx.revert();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalCtx]);

	useLayoutEffect(() => {
		displayBackdrop(backdropRef);

		backdropCtx.add("hide", () => {
			hideBackdrop(backdropRef);
		});

		return () => {
			backdropCtx.revert();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backdropCtx]);

	function handleModalClose(event: MouseEvent) {
		if (event.currentTarget === event.target) {
			backdropCtx.hide();
			modalCtx.hide();
		}
	}

	return (
		<div
			ref={backdropRef}
			onMouseDown={(event) => handleModalClose(event)}
			className={
				"fixed top-0 left-0 z-40 w-full h-full " +
				"bg-[rgba(0,0,0,0.6)] flex flex-row items-center " +
				"justify-around"
			}
		>
			<dialog
				ref={modalRef}
				className={
					styles.visible +
					" " +
					styles.modalShadow +
					" " +
					styles.dialogReset +
					" flex flex-col gap-y-[3rem] z-[50] border-none " +
					"max-w-[60rem] w-[90%] mr-[1.5rem] ml-[1.5rem] pt-[4rem] pb-[4rem] " +
					"pl-[3rem] pr-[3rem] min-[500px]:gap-y-[4rem]"
				}
			>
				<header className={"flex flex-col items-center gap-y-[0.5rem]"}>
					<h2
						className={
							"font-bold font-mPlus text-sm-28px md:text-md-32px " +
							"text-blue-zodiac-950"
						}
					>
						{title}
					</h2>
					<p
						className={
							"font-normal text-center font-raleway text-sm-14px " +
							"md:text-md-16px text-blue-zodiac-950"
						}
					>
						{description}
					</p>
				</header>
				<div>{children}</div>
				<div className={"flex flex-row items-center justify-end gap-x-[1rem]"}>
					<button
						className={
							"p-4 font-raleway text-blue-zodiac-950 text-sm-12px " +
							"hover:bg-athens-gray-100 duration-500 ease-out"
						}
						onClick={(event) => handleModalClose(event)}
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
