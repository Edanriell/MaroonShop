import { FC } from "react";
import { Link } from "react-router-dom";

import RegistrationForm from "features/registration-form";

import { RegistrationProps } from "./types";

const Login: FC<RegistrationProps> = ({ title }) => {
	return (
		<section className="flex flex-col items-center mt-[6rem] mb-[12rem]">
			<h2
				className={
					"font-raleway font-normal text-sm-28px text-center text-blue-zodiac-950 " +
					"md:text-md-36px mb-[6rem]"
				}
			>
				{title}
			</h2>
			<RegistrationForm />
			<div className={"mt-[2.4rem] flex flex-row items-center justify-center w-full"}>
				<p className={"font-mPlus font-medium text-sm-12px mr-[1rem]"}>Есть аккаунт?</p>
				<Link to={"/login"} className={"font-mPlus font-semibold text-sm-12px"}>
					Войти
				</Link>
			</div>
		</section>
	);
};

export default Login;
