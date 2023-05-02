const express = require("express");
const path = require("path");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const port = 4020;

const productsRouter = require("./routes/products");

const app = express();

app.use(helmet());
app.use(cors({origin: 'http://localhost:3001'}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(__dirname + '/public/productsImages'));

app.use("/products", productsRouter);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
