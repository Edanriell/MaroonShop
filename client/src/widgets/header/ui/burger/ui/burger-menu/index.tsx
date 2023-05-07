import BurgerNavigation from "../burger-navigation";
import BurgerSocialLinks from "../burger-social-links";

const BurgerMenu = () => {
	return (
		<div className="container pt-[11.6rem] pb-[5rem] md:pt-[15.1rem]">
			<BurgerNavigation />
			<BurgerSocialLinks />
		</div>
	);
};

export default BurgerMenu;
