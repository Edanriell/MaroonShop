import { Button, Card3d } from "shared/ui";

import { useScreenSize } from "shared/lib/hooks";

import IndividualCareCardSm from "./assets/card-sm.jpg";
import IndividualCareCardMd from "./assets/card-md.jpg";
import IndividualCareCardLg from "./assets/card-lg.jpg";

type Props = {
	title: string;
};

type IndividualCareCard = {
	cardSm: string;
	cardMd: string;
	cardLg: string;
};

const individualCareCard: IndividualCareCard = {
	cardSm: IndividualCareCardSm,
	cardMd: IndividualCareCardMd,
	cardLg: IndividualCareCardLg,
};

const IndividualCare = ({ title }: Props) => {
	const { width } = useScreenSize();

	return (
		<div className="pt-[8rem] pb-[8rem] pl-[1.5rem] pr-[1.5rem] md:pt-[12rem] md:pb-[12rem] md:container lg:pt-[14rem] lg:pb-[14rem]">
			<div className="relative flex flex-col items-stretch md:flex-row">
				<div className="pt-[5.2rem] pb-[11rem] flex flex-col items-center bg-pampas-50 md:pt-[5rem] md:pb-[6rem] md:pl-[6rem] md:pr-[25.5rem] md:items-start lg:pt-[9rem] lg:pb-[10rem] lg:pl-[10rem] lg:pr-[22.1rem]">
					<h2 className="font-medium font-raleway text-sm-28px-lh-35px text-blue-zodiac-950 mb-[1.1rem] text-center min-w-[25.3rem] pl-[1.9rem] pr-[1.9rem] md:pl-[0rem] md:pr-[0rem] md:text-left md:text-md-32px md:mb-[2.3rem] lg:text-lg-32px lg:mb-[2.3rem]">
						{title}
					</h2>
					{width >= 768 && (
						<p className="font-normal text-left font-mPlus text-blue-zodiac-950 text-md-18px mb-[1rem] md:max-w-[32.9rem]">
							Не всегда очевидно, какие элементы и минералы необходимы коже, а
							многочисленные эксперименты с разными средствами только ухудшают ее
							качество.
						</p>
					)}
					<p className="font-normal font-mPlus text-sm-16px text-blue-zodiac-950 text-center mb-[2.4rem] min-w-[22.6rem] pl-[2.3rem] pr-[2.3rem] md:pl-[0rem] md:pr-[0rem] md:text-left md:text-md-18px md:mb-[3.8rem] md:max-w-[32.9rem]">
						Заполните анкету, и мы подберем уход, подходящий именно вам, учитывая ваш
						образ жизни, место жительства и другие факторы.
					</p>
					<Button text="Заполнить анкету" />
				</div>
				<picture className="self-center mt-[-6rem] md:mt-[0rem]">
					<source media="(min-width:1366px)" srcSet={individualCareCard.cardLg} />
					<source media="(min-width:768px)" srcSet={individualCareCard.cardMd} />
					<source media="(min-width:320px)" srcSet={individualCareCard.cardSm} />
					<img
						src={individualCareCard.cardLg}
						alt=""
						className="w-[25rem] h-[25.2rem] object-cover md:w-[28.1rem] md:h-[40.3rem] md:absolute md:left-[55.8vw] md:top-[50%] md:translate-y-[-50%] lg:w-[67rem] lg:h-[45.1rem] lg:left-[50rem]"
					/>
				</picture>
			</div>
		</div>
	);
};

export default IndividualCare;
