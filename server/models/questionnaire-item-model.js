const { Schema, model } = require("mongoose");

const QuestionnaireItemSchema = new Schema({
	"name": { type: String, required: true },
	"surname": { type: String, required: true },
	"email": { type: String, required: true },
	"age": { type: String, required: true },
	"life-style": { type: String, required: true },
	"skin-type": { type: String, required: true },
	"location": { type: String, required: true },
});

module.exports = model("QuestionnaireItem", QuestionnaireItemSchema);
