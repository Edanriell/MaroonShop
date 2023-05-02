import { configureStore } from "@reduxjs/toolkit";

import { productModel } from "entities/product";

export const store = configureStore({
	reducer: {
		products: productModel.reducer,
	},
});
