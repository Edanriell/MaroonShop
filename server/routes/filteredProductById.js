const express = require("express");
const { dirname } = require("path");
const fs = require("fs");

const router = express.Router();

const appDir = dirname(require.main.path);
const productsDataFilePath = `${appDir}/data/products.json`;

router.get("/:id", (req, res) => {
	const productId = Number(req.params.id);

	fs.readFile(productsDataFilePath, "utf8", (err, products) => {
		if (err) {
			console.error("Error reading file:", err);
			res.status(500).send("Error reading file");
			return;
		}

		try {
			const productsData = JSON.parse(products);
			const product = productsData.find((product) => product.id === productId);
			console.log(product);
			if (!product) {
				return res.status(404).json({ error: "Product not found" });
			}

			res.json(product);
		} catch (err) {
			console.error("Error parsing JSON:", err);
			res.status(500).send("Error parsing JSON");
		}
	});
});

module.exports = router;
