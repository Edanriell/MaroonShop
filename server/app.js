const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const path = require("path");

const port = 4020;

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

// Static files
app.use("/images", express.static(path.join(__dirname, "public", "products-images")));
app.use("/gallery-images", express.static(path.join(__dirname, "public", "gallery-images")));

// Routes
app.use("/products", productsRouter);
app.use("/questionnaire", questionnaireRouter);
app.use("/gallery", galleryRouter);
app.use("/products/filtered", filteredProductsRouter);
app.use("/products", filteredProductByIdRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
