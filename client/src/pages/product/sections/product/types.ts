export type ProductAndQuantity = {
	userSelected: { price: number; quantity: string };
};

export const initialProductAndQuantity = {
	userSelected: { price: 0, quantity: "" },
};
