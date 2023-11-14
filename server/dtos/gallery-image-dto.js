module.exports = class GalleryImageDto {
	imageId;
	imageUrl;

	constructor(model) {
		this.imageId = model.imageId;
		this.imageUrl = model.imageUrl;
	}
};
