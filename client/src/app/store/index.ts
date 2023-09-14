import { configureStore } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { sessionModel } from "entities/session";
import { userModel } from "entities/user";

export const store = configureStore({
	reducer: {
		products: productModel.reducer,
		session: sessionModel.reducer,
		user: userModel.reducer,
	},
});
