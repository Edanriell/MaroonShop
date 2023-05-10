import { BurgerNavigation } from "./ui";
import { BurgerSocialLinks } from "./ui";

const BurgerMenu = () => {
	return (
		<div
			className={`
				pt-[10.8rem] pb-[5rem] pl-[1.5rem] pr-[1.5rem]
				md:pt-[14.2rem] md:pl-[4.5rem] md:pr-[4.5rem]
			`}
		>
			<BurgerNavigation />
			<BurgerSocialLinks />
		</div>
	);
};

export default BurgerMenu;
