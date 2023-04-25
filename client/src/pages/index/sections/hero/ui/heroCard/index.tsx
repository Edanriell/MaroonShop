import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from "./assets/arrow.svg";

type Props = {
	classes: string;
	image: string;
	link: string;
	label: string;
};

function HeroCard({ classes, image, link, label }: Props) {
	return (
		<Link className={classes} to={link}>
			<div className="mb-[1rem] md:mb-[1.5rem]">
				<img
					src={image}
					alt={label}
					className="w-[13rem] h-[17rem] object-cover md:w-[24.5rem] md:h-[32.2rem]"
				/>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium text-blue-zodiac-950 font-mPlus text-sm-12px-lh-17px md:text-md-16px-lh-22px">
					{label}
				</span>
				<Arrow className="w-[2.3rem] h-[1rem] text-blue-zodiac-950 md:w-[2.6rem] md:h-[1.2rem]" />
			</div>
		</Link>
	);
}

export default HeroCard;
