const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { dirname } = require("path");
const fs = require("fs");

const router = express.Router();

const appDir = dirname(require.main.path);
const questionnaireDataFilePath = `${appDir}/data/questionnaire.json`;

router.post("/", (req, res) => {
	const newQuestionnaireData = req.body;

	fs.readFile(questionnaireDataFilePath, "utf8", (err, questionnaireData) => {
		if (err) {
			console.error("Error reading file:", err);
			return res.status(500).send("Error reading file");
		}

		let oldQuestionnaireData = [];

		if (questionnaireData.trim() !== "") {
			try {
				oldQuestionnaireData = JSON.parse(questionnaireData);
			} catch (err) {
				console.error("Error parsing JSON:", err);
				return res.status(500).send("Error parsing JSON");
			}
		}

		oldQuestionnaireData.push({
			id: uuidv4(),
			...newQuestionnaireData,
		});

		fs.writeFile(questionnaireDataFilePath, JSON.stringify(oldQuestionnaireData), (err) => {
			if (err) {
				console.error("Error writing file:", err);
				return res.status(500).send("Error writing file");
			}

			console.log("New questionnaire data appended successfully");
			res.send(oldQuestionnaireData);
		});
	});
});

module.exports = router;
