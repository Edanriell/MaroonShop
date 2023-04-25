import { useRef } from "react";

import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from "./assets/arrow.svg";

type Props = {
	classes: string;
	image: string;
	link: string;
	label: string;
};

// TODO FIX PARALLAX EFFECT !

function HeroCard({ classes, image, link, label }: Props) {
	const SPEED = 0.05;

	const ref1 = useRef(null);

	function test1(e: any) {
		console.log(ref1.current);
		const a =  - (e.nativeEvent.offsetY - e.currentTarget.offsetHeight / 2) * SPEED;
		const b = (e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2) * SPEED;

		console.log(e.nativeEvent.offsetY);
		console.log(e.nativeEvent.offsetX);

		console.log(e.currentTarget.offsetHeight);
		console.log(e.currentTarget.offsetWidth);

		(ref1.current as unknown as HTMLElement).setAttribute('style', `transform: rotateX(${a}deg) rotateY(${b}deg)`);
	}

	function test2(e: any) {
		console.log(2);
		const box = e.currentTarget;
		(ref1.current as unknown as HTMLElement).removeAttribute("style");
	}

	return (
		<Link
			className={classes + " test3"}
			to={link}
			onMouseMove={(e) => test1(e)}
			onMouseOut={(e) => test2(e)}
		>
			<div className="test4" ref={ref1}>
				<div className="mb-[1rem] md:mb-[1.5rem]">
					<img
						src={image}
						alt={label}
						className="w-[13rem] h-[17rem] object-cover md:w-[24.5rem] md:h-[32.2rem] lg:w-[33rem] lg:h-[42.2rem]"
					/>
				</div>
				<div className="flex items-center justify-between">
					<span className="font-medium text-blue-zodiac-950 font-mPlus text-sm-12px-lh-17px md:text-md-16px-lh-22px">
						{label}
					</span>
					<Arrow className="w-[2.3rem] h-[1rem] text-blue-zodiac-950 md:w-[2.6rem] md:h-[1.2rem]" />
				</div>
			</div>
		</Link>
	);
}

export default HeroCard;
