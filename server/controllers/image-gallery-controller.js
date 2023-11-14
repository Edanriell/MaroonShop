const imageGalleryService = require("../service/image-gallery-service");

class ImageGalleryController {
	async getAllImages(req, res, next) {
		try {
			const images = await imageGalleryService.getAllImages();

			return res.json(images);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ImageGalleryController();
