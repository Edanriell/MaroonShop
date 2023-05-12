import { Map, SocialLinks } from "./ui";

type Props = {
	title: string;
};

const Contacts = ({ title }: Props) => {
	return (
		<div className="pl-[1.5rem] pr-[1.5rem] pb-[8rem]">
			<div className="flex flex-col items-stretch">
				<div className="bg-pampas-50 pt-[5.3rem] pb-[6rem] pr-[3rem] pl-[3rem]">
					<h2 className="font-medium font-raleway text-sm-28px-lh-35px text-left mb-[2.1rem] text-blue-zodiac-950">
						{title}
					</h2>
					<address className="not-italic mb-[2.4rem]">
						<dl className="flex flex-col gap-y-[1.8rem]">
							<div className="flex flex-col">
								<dt className="font-medium text-left font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950 mb-[0.3rem]">
									Адрес
								</dt>
								<dd className="font-normal font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950">
									Санкт-Петербург,
								</dd>
								<dd className="font-normal font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950">
									ул. Большая Конюшенная, 19
								</dd>
							</div>
							<div className="flex flex-col gap-y-[0.3rem]">
								<dt className="font-medium text-left font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950">
									Телефон
								</dt>
								<dd className="font-normal font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950">
									<a href="tel:+79238889060">+7 (923) 888-90-60</a>
								</dd>
							</div>
							<div className="flex flex-col gap-y-[0.3rem]">
								<dt className="font-medium text-left font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950">
									E-mail
								</dt>
								<dd className="font-normal font-mPlus text-sm-16px-lh-23px text-blue-zodiac-950">
									<a href="mailto:info@maroon.ru">info@maroon.ru</a>
								</dd>
							</div>
						</dl>
					</address>
					<SocialLinks />
				</div>
				<Map />
			</div>
		</div>
	);
};

export default Contacts;
