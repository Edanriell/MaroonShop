import { ReactComponent as Bar } from "./assets/bar.svg";

function Burger() {
	return (
		<div
			aria-label="burger menu"
			className="flex flex-col items-center justify-center cursor-pointer gap-y-[0.3rem] md:gap-y-[0.4rem]"
		>
			<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
			<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
			<Bar className="w-[2.2rem] h-[0.2rem] text-blue-zodiac md:w-[2.4rem] md:h-[0.3rem]" />
		</div>
	);
}

export default Burger;
