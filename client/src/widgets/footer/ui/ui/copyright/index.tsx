import { Link } from "react-router-dom";

import { ReactComponent as CopyrightIcon } from "./assets/copyright.svg";

const Copyright = () => {
	return (
		<div
			className={
				"flex flex-row flex-wrap gap-y-[1.4rem] justify-between " +
				"pt-[2.3rem] md:pt-[1.7rem] pl-[1.5rem] " +
				"pr-[1.5rem] md:pl-[4.5rem] md:pr-[4.5rem] " +
				"lg:max-w-[120rem] lg:pl-[1.5rem] lg:pr-[1.5rem] lg:ml-auto lg:mr-auto"
			}
		>
			<p className={"flex items-center justify-start md:mb-[0rem]"}>
				<small className={"font-normal font-mPlus text-sm-12px text-dusty-gray-500"}>
					Maroon
				</small>
				<CopyrightIcon
					className={"w-[1.4rem] h-[1.4rem] ml-[0.5rem] mr-[0.5rem] text-silver-300"}
				/>
				<small className={"font-normal font-mPlus text-sm-12px text-dusty-gray-500"}>
					2020 Все права защищены
				</small>
			</p>
			<Link to="/">
				<small
					className={
						"font-normal duration-500 ease-out font-mPlus " +
						"text-sm-12px text-dusty-gray-500 hover:text-dusty-gray-800"
					}
				>
					Политика конфиденциальности
				</small>
			</Link>
		</div>
	);
};

export default Copyright;
