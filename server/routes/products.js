const express = require("express");
const { dirname } = require("path");
const fs = require("fs");

const router = express.Router();

const appDir = dirname(require.main.path);

router.get("/", (req, res) => {
	const data = fs.readFileSync(`${appDir}/data/products.json`, {
		encoding: "utf8",
	});
	res.send(JSON.parse(data));
});

module.exports = router;
