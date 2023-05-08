import { BurgerNavigation } from "./ui";
import { BurgerSocialLinks } from "./ui";

const BurgerMenu = () => {
	return (
		<div className="container pt-[10.8rem] pb-[5rem] md:pt-[14.2rem]">
			<BurgerNavigation />
			<BurgerSocialLinks />
		</div>
	);
};

export default BurgerMenu;
