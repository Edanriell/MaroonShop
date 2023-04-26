import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import { ReactComponent as Arrow } from "./assets/arrow.svg";

type Props = {
	classes: string;
	image: string;
	link: string;
	label: string;
};

// TODO FIX PARALLAX EFFECT !

function HeroCard({ classes, image, link, label }: Props) {
	const ref1 = useRef(null);
	const ref2 = useRef(null);

	function handleCardMouseMove(e: any) {
		const verticalCoordinates =
			-(e.nativeEvent.offsetY - e.currentTarget.offsetHeight / 2) * 0.05;
		const horizontalCoordinates =
			(e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2) * 0.05;

		gsap.to(ref1.current, {
			rotateX: verticalCoordinates,
			rotateY: horizontalCoordinates,
			duration: 0.5,
			ease: "power2.out",
		});

		gsap.to(ref2.current, {
			translateX: -horizontalCoordinates * 32,
			translateY: verticalCoordinates * 24,
			duration: 0.5,
			ease: "power2.out",
		});
	}

	function handleCardMouseOut() {
		gsap.to(ref1.current, {
			rotateX: 0,
			rotateY: 0,
			duration: 0.5,
			ease: "power2.out",
		});

		gsap.to(ref2.current, {
			translateX: 0,
			translateY: 0,
			duration: 0.5,
			ease: "power2.out",
		});
	}

	return (
		<Link
			className={classes + " test3"}
			to={link}
			onMouseMove={(e) => handleCardMouseMove(e)}
			onMouseOut={() => handleCardMouseOut()}
		>
			<div ref={ref1}>
				<div className="card-highlight" ref={ref2}></div>
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
