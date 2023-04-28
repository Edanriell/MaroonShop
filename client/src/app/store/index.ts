import { configureStore } from "@reduxjs/toolkit";

import { productsModel } from "entities/product";

export const store = configureStore({
	reducer: {
		products: productsModel.reducer,
	},
});
