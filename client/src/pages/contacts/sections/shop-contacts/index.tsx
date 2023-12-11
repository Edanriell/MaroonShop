import { FC } from "react";

import { ShopContactsProps } from "./types";

const ShopContacts: FC<ShopContactsProps> = ({ title }) => {
	return (
		<div
			className={
				"pl-[1.5rem] pr-[1.5rem] md:pr-[4.5rem] md:pl-[4.5rem] relative " +
				"pt-[20vh] pb-[20vh]"
			}
		>
			<div
				className={"lg:pr-[2.3rem] lg:pl-[2.3rem] lg:mr-auto lg:ml-auto lg:max-w-[120rem]"}
			>
				<div
					className={
						"mb-[4rem] flex flex-col items-center justify-between md:mb-[3.6rem] lg:mb-[4.9rem]"
					}
				>
					<h2
						className={
							"font-raleway font-normal text-sm-28px text-left text-blue-zodiac-950 " +
							"md:text-md-36px justify-self-start row-start-1 row-end-2 pl-[1.5rem] " +
							"z-[14] md:pl-[0rem] mb-[4rem]"
						}
					>
						{title}
					</h2>
					<p className="font-raleway text-md-18px lining-nums mb-[8rem] max-w-[50rem] text-center">
						Для деловых вопросов, пожалуйста, найдите наши контактные данные и
						бизнес-реквизиты ниже:
					</p>

					<div className={"flex flex-col items-center max-w-[50rem] text-center"}>
						<div className={"mb-[4rem]"}>
							<strong
								className={"font-raleway text-md-18px lining-nums mb-[2rem] block"}
							>
								Контактная информация:
							</strong>
							<p className={"font-raleway text-md-18px lining-nums"}>
								Email: info@maroonshop.com
							</p>
							<p className={"font-raleway text-md-18px lining-nums"}>
								Телефон: (555) 123-4567
							</p>
						</div>

						<div className={"mb-[4rem]"}>
							<strong
								className={"font-raleway text-md-18px lining-nums mb-[2rem] block"}
							>
								Бизнес-реквизиты:
							</strong>
							<p className={"font-raleway text-md-18px lining-nums"}>
								Регистрационный номер: MRC123456
							</p>
							<p className={"font-raleway text-md-18px lining-nums"}>
								Налоговый идентификационный номер: 987-65-4321
							</p>
							<p className={"font-raleway text-md-18px lining-nums"}>
								Банковский счет: 1234-5678-9012 (Фиктивный)
							</p>
							<p className={"font-raleway text-md-18px lining-nums"}>
								Название банка: Американский банк
							</p>
							<p className={"font-raleway text-md-18px lining-nums"}>
								SWIFT/BIC: AMERICANBANK789
							</p>
							<p className={"font-raleway text-md-18px lining-nums"}>
								IBAN: AMERICANIBAN01234
							</p>
						</div>

						<div className={"mb-[4rem]"}>
							<strong
								className={"font-raleway text-md-18px lining-nums mb-[2rem] block"}
							>
								Юридический адрес:
							</strong>
							<p className={"font-raleway text-md-18px lining-nums"}>
								123 Legal Street, Maroon City, MRC 56789
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopContacts;
