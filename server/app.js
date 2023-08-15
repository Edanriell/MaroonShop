require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 4020;

const productsRouter = require("./routes/products");
const questionnaireRouter = require("./routes/questionnaire");
const galleryRouter = require("./routes/gallery");
const filteredProductsRouter = require("./routes/filteredProducts");
const filteredProductByIdRouter = require("./routes/filteredProductById");

const app = express();

// Middleware setup
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	}),
);
app.use(cors({ origin: "http://localhost:3001" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());

// Static files
app.use("/images", express.static(path.join(__dirname, "public", "products-images")));
app.use("/gallery-images", express.static(path.join(__dirname, "public", "gallery-images")));

// Routes
app.use("/products", productsRouter);
app.use("/questionnaire", questionnaireRouter);
app.use("/gallery", galleryRouter);
app.use("/products/filtered", filteredProductsRouter);
app.use("/products", filteredProductByIdRouter);
app.use("/api", router); // FIX !!!
app.use(errorMiddleware);

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

startServer();

module.exports = app;
