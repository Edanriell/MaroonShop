import { Button } from "shared/ui";
import { HeroCard } from "./ui";

import styles from "./styles.module.scss";

type Props = {
	title: string;
};

function HeroSection({ title }: Props) {
	return (
		<div className={styles.backgroundImageLg}>
			<div className="container flex flex-col">
				<div className="flex flex-col items-center">
					<h2 className="font-medium text-blue-zodiac-950 font-raleway text-sm-42px">
						{title}
					</h2>
					<p className="font-normal text-center text-blue-zodiac-950 font-mPlus text-sm-16px">
						Натуральная косметика <br /> для бережного ухода за кожей
					</p>
					<Button type="button" text="Подробнее" linkInner="/" />
				</div>
				<div className="flex flex-row">
					<HeroCard />
					<HeroCard />
				</div>
			</div>
		</div>
	);
}

export default HeroSection;
