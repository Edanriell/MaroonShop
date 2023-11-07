const { Schema, model } = require("mongoose");

const RecentlyWatchedProductSchema = new Schema({
	viewDate: { type: Date, default: Date.now },
	userViewsCount: { type: Number, default: 1 },
	product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const UserSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	recentlyWatchedProducts: {
		type: [RecentlyWatchedProductSchema],
		default: [],
	},
});

module.exports = model("User", UserSchema);
