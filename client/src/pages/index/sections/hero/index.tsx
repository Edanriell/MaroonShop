import { Button } from "shared/ui";
import { HeroCard } from "./ui";

import styles from "./styles.module.scss";

// import imgCard1Sm from "./assets/card-image1-sm.jpg";
// import imgCard2Sm from "./assets/card-image2-sm.jpg";
// import imgCard1Md from "./assets/card-image1-md.jpg";
// import imgCard2Md from "./assets/card-image2-md.jpg";
import imgCard1Lg from "./assets/card-image1-lg.jpg";
import imgCard2Lg from "./assets/card-image2-lg.jpg";

type Props = {
	title: string;
};

function HeroSection({ title }: Props) {
	return (
		<div className={styles.heroBackgroundImage + " pt-[3rem] pb-[6rem] md:pb-[7rem]"}>
			<div className="container grid grid-rows-2-auto grid-cols-two gap-x-[3rem] gap-y-[3.5rem]">
				<div className="flex flex-col items-center row-start-1 col-span-full">
					<h2 className="font-medium text-blue-zodiac-950 font-raleway text-sm-42px mb-[2rem] md:text-md-54px md:mb-[3rem]">
						{title}
					</h2>
					<p className="font-normal text-center text-blue-zodiac-950 font-mPlus text-sm-16px mb-[3rem] md:text-md-18px md:mb-[4rem]">
						Натуральная косметика <br /> для бережного ухода за кожей
					</p>
					<Button type="button" text="Подробнее" link="/" />
				</div>
				<HeroCard classes="row-start-2" image={imgCard1Lg} link="/" label="Уход для лица" />
				<HeroCard classes="row-start-2" image={imgCard2Lg} link="/" label="Уход для тела" />
			</div>
		</div>
	);
}

export default HeroSection;
