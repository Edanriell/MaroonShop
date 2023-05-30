const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const port = 4020;

const productsRouter = require("./routes/products");
const questionnaireRouter = require("./routes/questionnaire");

const app = express();

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

app.use("/images", express.static(__dirname + "/public/products-images"));
app.use("/products", productsRouter);
app.use("/questionnaire", questionnaireRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
