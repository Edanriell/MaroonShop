import Map from "features/map";
import { SocialLinks } from "shared/ui";
import { ContactsProps } from "./types";

const Contacts = ({ title }: ContactsProps) => {
	return (
		<div
			className={
				"pl-[1.5rem] pr-[1.5rem] pb-[8rem] md:pl-[4.5rem] " +
				"md:pr-[0rem] md:pb-[12rem] lg:pb-[14rem] lg:pl-[0rem]"
			}
		>
			<div
				className={
					"flex flex-col items-stretch md:flex-row " +
					"md:items-center md:justify-between lg:justify-center"
				}
			>
				<div
					className={
						"bg-pampas-50 pt-[5.3rem] pb-[6rem] pr-[3rem] pl-[3rem] " +
						"md:pt-[5rem] md:pb-[5rem] md:pl-[6rem] md:pr-[34.5rem] " +
						"lg:pt-[9.1rem] lg:pb-[10rem] lg:pl-[10rem] lg:pr-[31.4rem]"
					}
				>
					<h2
						className={
							"font-medium font-raleway text-sm-28px-lh-35px text-left " +
							"mb-[2.1rem] text-blue-zodiac-950 md:text-md-32px-lh-42px " +
							"md:mb-[2.3rem]"
						}
					>
						{title}
					</h2>
					<address className={"not-italic mb-[2.4rem] md:mb-[2.8rem]"}>
						<dl className={"flex flex-col gap-y-[1.8rem] md:gap-y-[2.1rem]"}>
							<div className={"flex flex-col min-w-[22.8rem] md:min-w-[initial]"}>
								<dt
									className={
										"font-medium text-left font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 mb-[0.3rem] md:mb-[0.6rem] md:text-md-18px " +
										"lg:mb-[0.7rem]"
									}
								>
									Адрес
								</dt>
								<dd
									className={
										"font-normal font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 md:text-md-18px"
									}
								>
									Санкт-Петербург,
								</dd>
								<dd
									className={
										"font-normal font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 md:text-md-18px"
									}
								>
									ул. Большая Конюшенная, 19
								</dd>
							</div>
							<div
								className={
									"flex flex-col gap-y-[0.3rem] md:gap-y-[0.6rem] " +
									"lg:gap-y-[0.7rem]"
								}
							>
								<dt
									className={
										"font-medium text-left font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 md:mb-[0.6rem] md:text-md-18px"
									}
								>
									Телефон
								</dt>
								<dd
									className={
										"font-normal duration-500 ease-out font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 md:text-md-18px hover:text-blue-zodiac-800"
									}
								>
									<a href="tel:+79238889060">+7 (923) 888-90-60</a>
								</dd>
							</div>
							<div
								className={
									"flex flex-col gap-y-[0.3rem] md:gap-y-[0.6rem] " +
									"lg:gap-y-[0.7rem]"
								}
							>
								<dt
									className={
										"font-medium text-left font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 md:mb-[0.6rem] md:text-md-18px"
									}
								>
									E-mail
								</dt>
								<dd
									className={
										"font-normal duration-500 ease-out font-mPlus text-sm-16px-lh-23px " +
										"text-blue-zodiac-950 md:text-md-18px hover:text-blue-zodiac-800"
									}
								>
									<a href="mailto:info@maroon.ru">info@maroon.ru</a>
								</dd>
							</div>
						</dl>
					</address>
					<SocialLinks classes={"flex flex-row items-center gap-x-[3rem]"} />
				</div>
				<Map />
			</div>
		</div>
	);
};

export default Contacts;
