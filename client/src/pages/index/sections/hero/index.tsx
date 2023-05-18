import { Button } from "shared/ui";
import { HeroCard } from "./ui";
import { CardImages, HeroProps } from "./types";
import styles from "./styles.module.scss";

import imgCard1Sm from "./assets/card-image1-sm.jpg";
import imgCard2Sm from "./assets/card-image2-sm.jpg";
import imgCard1Md from "./assets/card-image1-md.jpg";
import imgCard2Md from "./assets/card-image2-md.jpg";
import imgCard1Lg from "./assets/card-image1-lg.jpg";
import imgCard2Lg from "./assets/card-image2-lg.jpg";

const card1Images: CardImages = {
	imgLg: imgCard1Lg,
	imgMd: imgCard1Md,
	imgSm: imgCard1Sm,
};

const card2Images: CardImages = {
	imgLg: imgCard2Lg,
	imgMd: imgCard2Md,
	imgSm: imgCard2Sm,
};

const Hero = ({ title }: HeroProps) => {
	return (
		<div
			className={
				styles.heroBackgroundImage + " pt-[2.1rem] pb-[6rem] md:pt-[3rem] md:pb-[7rem]"
			}
		>
			<div
				className={
					"pl-[1.5rem] pr-[1.5rem] flex flex-col gap-y-[3.5rem] " +
					"md:pl-[4.5rem] md:pr-[4.5rem] md:gap-y-[0rem] relative " +
					"lg:pl-[9.8rem] lg:pr-[9.8rem]"
				}
			>
				<div
					className={
						"flex flex-col items-center row-start-1 col-span-full " +
						"md:col-start-2 md:col-end-5 md:mt-[1.6rem] pointer-events-none " +
						"z-10 lg:col-start-2 lg:col-end-3 lg:mt-[4.7rem] " +
						"md:absolute md:top-0 md:left-[50%] md:translate-x-[-50%]"
					}
				>
					<h2
						className={
							"font-medium text-blue-zodiac-950 font-raleway " +
							"text-sm-42px mb-[0.5rem] md:text-md-54px md:mb-[1.05rem] " +
							"lg:text-lg-58px lg:mb-[0.95rem]"
						}
					>
						{title}
					</h2>
					<p
						className={
							"font-normal text-center text-blue-zodiac-950 font-mPlus " +
							"text-sm-16px mb-[2.45rem] md:text-md-18px md:mb-[3.35rem]"
						}
					>
						Натуральная косметика <br /> для бережного ухода за кожей
					</p>
					<Button type="link-internal" text="Подробнее" linkInternal="/" />
				</div>
				<div
					className={
						"flex flex-row items-center justify-center gap-x-[9.375vw] md:gap-x-[0rem] " +
						"md:justify-between lg:max-w-[106rem] lg:mr-auto lg:ml-auto " +
						"lg:gap-x-[37rem] lg:pl-[1.5rem] lg:pr-[1.5rem]"
					}
				>
					<HeroCard
						classes={"w-[40.625vw] md:w-[31.9010416vw] lg:w-[33rem]"}
						images={card1Images}
						link="/"
						label="Уход для лица"
					/>
					<HeroCard
						classes={"w-[40.625vw] md:w-[31.9010416vw] lg:w-[33rem]"}
						images={card2Images}
						link="/"
						label="Уход для тела"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
