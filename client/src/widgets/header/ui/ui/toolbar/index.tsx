import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as CartIcon } from "./assets/cart.svg";
import { ReactComponent as AuthIcon } from "./assets/auth.svg";

import { UserActions } from "./types";

const userActions: UserActions = [
	{
		label: "Аутентификация",
		Icon: AuthIcon,
		iconWidth: "w-[1.3rem] md:w-[1.6rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "/profile",
		id: uuidv4(),
	},
	{
		label: "Корзина",
		Icon: CartIcon,
		iconWidth: "w-[1.4rem] md:w-[1.8rem]",
		iconHeight: "h-[1.6rem] md:h-[2.1rem]",
		url: "/cart",
		id: uuidv4(),
	},
];

const Toolbar = () => {
	return (
		<ul
			className={"flex items-center justify-start gap-x-[2rem] md:gap-x-[3rem] relative z-10"}
		>
			{userActions.map(({ label, Icon, iconWidth, iconHeight, url, id }) => (
				<li key={id}>
					<Link to={url}>
						<Icon
							className={
								iconWidth +
								" " +
								iconHeight +
								" " +
								"text-blue-zodiac-950 " +
								"hover:text-blue-zodiac-800 duration-500 ease-out hover:scale-125"
							}
						/>
						<span className={"sr-only"}>{label}</span>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default Toolbar;
