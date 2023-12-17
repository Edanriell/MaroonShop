const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const productsService = require("./service/products-service");
const imageGalleryService = require("./service/image-gallery-service");

const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 4020;

const app = express();

app.use(
	helmet({
		crossOriginResourcePolicy: false,
	}),
);

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/products-images", express.static(path.join(__dirname, "public", "products-images")));
app.use("/gallery-images", express.static(path.join(__dirname, "public", "gallery-images")));

app.use("/api", router);
app.use(errorMiddleware);

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		productsService.initializeProducts();
		imageGalleryService.initializeGalleryImages();

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

startServer();

module.exports = app;
