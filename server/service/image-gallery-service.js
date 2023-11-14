const { dirname } = require("path");
const fs = require("fs");

const GalleryImageModel = require("../models/gallery-image-model");

const GalleryImageDto = require("../dtos/gallery-image-dto");
const ApiError = require("../exceptions/api-error");

const appDir = dirname(require.main.path);
const galleryImagesDataFilePath = `${appDir}/data/gallery-images.json`;

class ImageGalleryService {
	async getAllImages() {
		const allGalleryImages = await GalleryImageModel.find();

		const galleryImages = [];

		if (allGalleryImages.length === 0) {
			throw ApiError.NotFound("В базе данных не найдено ни одной картинки для галереи.");
		}

		for (const galleryImage of allGalleryImages) {
			galleryImages.push(new GalleryImageDto(galleryImage));
		}

		return galleryImages;
	}

	async createNewGalleryImage({ imageId, imageUrl }) {
		const galleryImage = await GalleryImageModel.findOne({ imageId });

		if (galleryImage) {
			throw ApiError.BadRequest(`Картинка для галереи с id ${imageId} уже существует.`);
		}

		const newGalleryImage = await GalleryImageModel.create({
			imageId,
			imageUrl,
		});

		const galleryImageDto = new GalleryImageDto(newGalleryImage);

		return {
			galleryImage: galleryImageDto,
		};
	}

	async initializeGalleryImages() {
		const isDataAlreadyInitialized = await GalleryImageModel.find();

		if (isDataAlreadyInitialized.length > 0) {
			console.error("Картинки для галереи уже созданны в базе данных.");
			return;
		}

		fs.readFile(galleryImagesDataFilePath, "utf8", (err, images) => {
			if (err) {
				console.error("Ошибка чтения файла данных о картинках:", err);
				throw new Error("Неудалось прочитать данные.");
			}

			try {
				const imagesData = JSON.parse(images);

				for (const image of imagesData) {
					this.createNewGalleryImage({
						imageId: image.imageId,
						imageUrl: image.imageUrl,
					});
				}

				console.log("Картинки для галереи успешно добавлены в базу данных.");
			} catch (err) {
				console.error("Возникла ошибка при парсинге данных JSON:", parseError);
				throw new Error("Не удалось преобразовать JSON данные.");
			}
		});
	}

	async deleteAllGalleryImages() {
		try {
			const deletedGalleryImages = await GalleryImageModel.deleteMany({});
			const { deletedCount } = deletedGalleryImages;

			if (deletedCount === 0) {
				throw ApiError.NotFound(
					"Ненайдено не одной картинки для галереи для удаления из базы данных.",
				);
			}

			console.log(`${deletedCount} картинок удалено успешно.`);
		} catch (err) {
			throw ApiError.InternalServerError("Не удалось удалить картинки для галереи.");
		}
	}
}

module.exports = new ImageGalleryService();
