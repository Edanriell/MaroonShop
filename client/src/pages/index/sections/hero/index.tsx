import { Button } from "shared/ui";
import { HeroCard } from "./ui";

import styles from "./styles.module.scss";

import imgCard1Sm from "./assets/card-image1-sm.jpg";
import imgCard2Sm from "./assets/card-image2-sm.jpg";
import imgCard1Md from "./assets/card-image1-md.jpg";
import imgCard2Md from "./assets/card-image2-md.jpg";
import imgCard1Lg from "./assets/card-image1-lg.jpg";
import imgCard2Lg from "./assets/card-image2-lg.jpg";

type Props = {
	title: string;
};

type CardImages = {
	imgLg: string;
	imgMd: string;
	imgSm: string;
};

const cardImages1: CardImages = {
	imgLg: imgCard1Lg,
	imgMd: imgCard1Md,
	imgSm: imgCard1Sm,
};

const cardImages2: CardImages = {
	imgLg: imgCard2Lg,
	imgMd: imgCard2Md,
	imgSm: imgCard2Sm,
};

function HeroSection({ title }: Props) {
	return (
		<div className={styles.heroBackgroundImage + " pt-[3rem] pb-[6rem] md:pb-[7rem]"}>
			<div className="container grid grid-rows-2-auto grid-cols-hero-two gap-x-[3rem] gap-y-[3.5rem] md:gap-x-[0rem] md:gap-y-[0rem] md:grid-cols-hero-five lg:grid-cols-hero-three lg:gap-x-[4.8rem] lg:justify-center">
				<div className="flex flex-col items-center row-start-1 col-span-full md:col-start-2 md:col-end-5 md:mt-[2.8rem] pointer-events-none z-10 lg:col-start-2 lg:col-end-3 lg:mt-[6.1rem]">
					<h2 className="font-medium text-blue-zodiac-950 font-raleway text-sm-42px mb-[2rem] md:text-md-54px md:mb-[3rem] lg:text-lg-58px">
						{title}
					</h2>
					<p className="font-normal text-center text-blue-zodiac-950 font-mPlus text-sm-16px mb-[3rem] md:text-md-18px md:mb-[4rem]">
						Натуральная косметика <br /> для бережного ухода за кожей
					</p>
					<Button type="button" text="Подробнее" link="/" />
				</div>
				<HeroCard
					classes="row-start-2 md:row-span-full md:col-start-1 md:col-end-3 lg:col-end-2"
					images={cardImages1}
					link="/"
					label="Уход для лица"
				/>
				<HeroCard
					classes="row-start-2 md:row-span-full md:col-start-4 md:col-end-6 lg:col-start-3 lg:col-end-4"
					images={cardImages2}
					link="/"
					label="Уход для тела"
				/>
			</div>
		</div>
	);
}

export default HeroSection;
