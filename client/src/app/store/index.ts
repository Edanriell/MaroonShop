import { configureStore } from "@reduxjs/toolkit";

import { productModel } from "entities/product";
import { sessionModel } from "entities/session";

export const store = configureStore({
	reducer: {
		products: productModel.reducer,
		session: sessionModel.reducer,
	},
});
