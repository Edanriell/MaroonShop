const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.json([
		{
			id: 1,
			name: "High",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["normal"],
			},
			image: {
				lg: "/images/1/lg/productImage.jpg",
				md: "/images/1/md/productImage.jpg",
				sm: "/images/1/sm/productImage.jpg",
			},
			price: 890,
			views: 0,
			sells: 100,
		},
		{
			id: 2,
			name: "Rest",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "powder",
				skin: ["fat"],
			},
			image: {
				lg: "/images/2/lg/productImage.jpg",
				md: "/images/2/md/productImage.jpg",
				sm: "/images/2/sm/productImage.jpg",
			},
			price: 490,
			views: 0,
			sells: 100,
		},
		{
			id: 3,
			name: "Rose",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["combined"],
			},
			image: {
				lg: "/images/3/lg/productImage.jpg",
				md: "/images/3/md/productImage.jpg",
				sm: "/images/3/sm/productImage.jpg",
			},
			price: 600,
			views: 0,
			sells: 100,
		},
		{
			id: 4,
			name: "Milk",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "body",
				secondary: "oil",
				skin: ["dry"],
			},
			image: {
				lg: "/images/4/lg/productImage.jpg",
				md: "/images/4/md/productImage.jpg",
				sm: "/images/4/sm/productImage.jpg",
			},
			price: 720,
			views: 0,
			sells: 100,
		},
		{
			id: 5,
			name: "High",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["normal"],
			},
			image: {
				lg: "/images/1/lg/productImage.jpg",
				md: "/images/1/md/productImage.jpg",
				sm: "/images/1/sm/productImage.jpg",
			},
			price: 890,
			views: 0,
			sells: 100,
		},
		{
			id: 6,
			name: "Rest",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "powder",
				skin: ["fat"],
			},
			image: {
				lg: "/images/2/lg/productImage.jpg",
				md: "/images/2/md/productImage.jpg",
				sm: "/images/2/sm/productImage.jpg",
			},
			price: 490,
			views: 0,
			sells: 100,
		},
		{
			id: 7,
			name: "Rose",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["combined"],
			},
			image: {
				lg: "/images/3/lg/productImage.jpg",
				md: "/images/3/md/productImage.jpg",
				sm: "/images/3/sm/productImage.jpg",
			},
			price: 600,
			views: 0,
			sells: 100,
		},
		{
			id: 8,
			name: "Milk",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "body",
				secondary: "oil",
				skin: ["dry"],
			},
			image: {
				lg: "/images/4/lg/productImage.jpg",
				md: "/images/4/md/productImage.jpg",
				sm: "/images/4/sm/productImage.jpg",
			},
			price: 720,
			views: 0,
			sells: 100,
		},
		{
			id: 9,
			name: "High",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["normal"],
			},
			image: {
				lg: "/images/1/lg/productImage.jpg",
				md: "/images/1/md/productImage.jpg",
				sm: "/images/1/sm/productImage.jpg",
			},
			price: 890,
			views: 0,
			sells: 100,
		},
		{
			id: 10,
			name: "Rest",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "powder",
				skin: ["fat"],
			},
			image: {
				lg: "/images/2/lg/productImage.jpg",
				md: "/images/2/md/productImage.jpg",
				sm: "/images/2/sm/productImage.jpg",
			},
			price: 490,
			views: 0,
			sells: 100,
		},
		{
			id: 11,
			name: "Rose",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["combined"],
			},
			image: {
				lg: "/images/3/lg/productImage.jpg",
				md: "/images/3/md/productImage.jpg",
				sm: "/images/3/sm/productImage.jpg",
			},
			price: 600,
			views: 0,
			sells: 100,
		},
		{
			id: 12,
			name: "Milk",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "body",
				secondary: "oil",
				skin: ["dry"],
			},
			image: {
				lg: "/images/4/lg/productImage.jpg",
				md: "/images/4/md/productImage.jpg",
				sm: "/images/4/sm/productImage.jpg",
			},
			price: 720,
			views: 0,
			sells: 100,
		},
		{
			id: 13,
			name: "High",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["normal"],
			},
			image: {
				lg: "/images/1/lg/productImage.jpg",
				md: "/images/1/md/productImage.jpg",
				sm: "/images/1/sm/productImage.jpg",
			},
			price: 890,
			views: 0,
			sells: 100,
		},
		{
			id: 14,
			name: "Rest",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "powder",
				skin: ["fat"],
			},
			image: {
				lg: "/images/2/lg/productImage.jpg",
				md: "/images/2/md/productImage.jpg",
				sm: "/images/2/sm/productImage.jpg",
			},
			price: 490,
			views: 0,
			sells: 100,
		},
		{
			id: 15,
			name: "Rose",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "face",
				secondary: "cream",
				skin: ["combined"],
			},
			image: {
				lg: "/images/3/lg/productImage.jpg",
				md: "/images/3/md/productImage.jpg",
				sm: "/images/3/sm/productImage.jpg",
			},
			price: 600,
			views: 0,
			sells: 100,
		},
		{
			id: 16,
			name: "Milk",
			description: [
				"Увлажняющий крем идеально подходит для повседневного ухода за молодой кожей.",
				"Крем равномерно распределяется по поверхности благодаря легкой текстуре, обеспечивает глубокое увлажнение, регенерацию клеток.",
			],
			components:
				"Aqua, Cyclomethicone, Dicaprylyl Carbonate, Butylene Glycol, Glycerin, Tapioca Starch, Nelumbium Speciosum Flower Extract, Calendula Officinalis Flower Extract, Propylene Glycol, Tocopherol, Glycine Soja Oil, Dimethiconol, Citronellol, Limonene.",
			usage: "Нанесите крем на очищенную кожу лица легкими массажными круговыми движениями, избегая области вокруг глаз. Подходит для дневного и ночного ухода.",
			type: {
				main: "body",
				secondary: "oil",
				skin: ["dry"],
			},
			image: {
				lg: "/images/4/lg/productImage.jpg",
				md: "/images/4/md/productImage.jpg",
				sm: "/images/4/sm/productImage.jpg",
			},
			price: 720,
			views: 0,
			sells: 100,
		},
	]);
});

module.exports = router;
