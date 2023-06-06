const express = require("express");
const { dirname } = require("path");
const fs = require("fs");

const router = express.Router();

const appDir = dirname(require.main.path);
const galleryDataFilePath = `${appDir}/data/gallery.json`;

router.get("/", (req, res) => {
	fs.readFile(galleryDataFilePath, "utf8", (err, galleryImages) => {
		if (err) {
			console.error("Error reading file:", err);
			res.status(500).send("Error reading file");
			return;
		}

		try {
			const galleryData = JSON.parse(galleryImages);
			res.send(galleryData);
		} catch (err) {
			console.error("Error parsing JSON:", err);
			res.status(500).send("Error parsing JSON");
		}
	});
});

module.exports = router;
