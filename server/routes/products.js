const express = require("express");
const { dirname } = require("path");
const fs = require("fs");

const router = express.Router();

const appDir = dirname(require.main.path);
const productsDataFilePath = `${appDir}/data/products.json`;

router.get("/", (req, res) => {
	fs.readFile(productsDataFilePath, "utf8", (err, products) => {
		if (err) {
			console.error("Error reading file:", err);
			res.status(500).send("Error reading file");
			return;
		}

		try {
			const productsData = JSON.parse(products);
			res.send(productsData);
		} catch (err) {
			console.error("Error parsing JSON:", err);
			res.status(500).send("Error parsing JSON");
		}
	});
});

module.exports = router;
