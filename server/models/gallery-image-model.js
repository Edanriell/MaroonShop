const { Schema, model } = require("mongoose");

const GalleryImageSchema = new Schema({
	imageId: { type: String, unique: true, required: true },
	imageUrl: { type: String, required: true },
});

module.exports = model("GalleryImage", GalleryImageSchema);
