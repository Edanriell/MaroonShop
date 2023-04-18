import BurgerNavigation from "../burgerNavigation";
import BurgerSocialLinks from "../burgerSocialLinks";

function BurgerMenu() {
	return (
		<div className="container pt-[11.6rem] pb-[5rem] md:pt-[15.1rem]">
			<BurgerNavigation />
			<BurgerSocialLinks />
		</div>
	);
}

export default BurgerMenu;
