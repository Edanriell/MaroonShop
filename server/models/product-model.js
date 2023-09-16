const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
	name: { type: String, unique: true, required: true },
	description: { type: [String], required: true },
	components: { type: String, required: true },
	usage: { type: String, required: true },
	category: {
	  main: { type: String, required: true },
	  secondary: { type: String, required: true },
	  skinType: { type: [String], required: true },
	},
	image: {
	  lg: { type: String, required: true },
	  md: { type: String, required: true },
	  sm: { type: String, required: true },
	},
	price: { type: [Number], required: true },
	quantity: { type: [String], required: true },
	views: { type: Number, required: true },
	sells: { type: Number, required: true },
});

module.exports = model("Product", ProductSchema);