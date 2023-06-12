import { SocialLinks } from "shared/ui";

import { BurgerNavigation } from "./ui";

const BurgerMenu = () => {
	return (
		<div
			className={
				"pt-[10.8rem] pb-[5rem] pl-[1.5rem] pr-[1.5rem] " +
				"md:pt-[14.2rem] md:pl-[4.5rem] md:pr-[4.5rem]"
			}
		>
			<BurgerNavigation />
			<SocialLinks
				className={
					"flex items-center justify-start mt-[4.2rem] gap-x-[3rem] " +
					"md:gap-x-[2.5rem] md:mt-[5.1rem]"
				}
			/>
		</div>
	);
};

export default BurgerMenu;
