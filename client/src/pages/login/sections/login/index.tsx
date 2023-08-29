import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { sessionModel } from "entities/session";

const Login: FC = () => {
	// FIX ANY TYPE
	const dispatch: ThunkDispatch<any, null, AnyAction> = useDispatch();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div>
			<input
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				type="text"
				placeholder="Email"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				type="text"
				placeholder="Password"
			/>
			<button onClick={() => dispatch(sessionModel.login({ email, password }))} type="button">
				Login
			</button>
			<button
				onClick={() => dispatch(sessionModel.registration({ email, password }))}
				type="button"
			>
				Registration
			</button>
		</div>
	);
};

export default Login;
