import { configureStore } from "@reduxjs/toolkit";

import { productModel } from "entities/model";

export const store = configureStore({
	reducer: {
		products: productModel.reducer,
	},
});
