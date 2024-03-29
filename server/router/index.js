const Router = require("express").Router;
const { body } = require("express-validator");

const userController = require("../controllers/user-controller");
const productsController = require("../controllers/products-controller");
const questionnaireController = require("../controllers/questionnaire-controller");
const imageGalleryController = require("../controllers/image-gallery-controller");

const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post("/login", userController.login);
router.post(
	"/registration",
	body("name").isString().isLength({ min: 2 }),
	body("surname").isString().isLength({ min: 2 }),
	body("address").isString().isLength({ min: 12 }),
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.registration,
);
router.put(
	"/update-user-data",
	body("id").isString(),
	body("name").optional().isString().isLength({ min: 2 }),
	body("surname").optional().isLength({ min: 2 }),
	body("address").optional().isLength({ min: 12 }),
	body("email").optional().isEmail(),
	authMiddleware,
	userController.updateUserData,
);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

router.get("/products", productsController.getProducts);
router.get("/products/filtered-by-categories", productsController.getFilteredProductsByCategories);
router.get("/product/filtered-by-id", productsController.getProductById);
router.get("/products/best-selling", productsController.getBestSellingProducts);
router.get("/products/most-watched", productsController.getMostWatchedProducts);
router.get(
	"/products/recently-watched",
	authMiddleware,
	productsController.getRecentlyWatchedProducts,
);
router.put(
	"/products/update-recently-watched",
	body("userId").isMongoId(),
	body("productsCount").isNumeric(),
	body("currentlyWatchedProduct").isObject(),
	authMiddleware,
	productsController.updateRecentlyWatchedProducts,
);
router.put(
	"/product/update-views",
	body("productId").isMongoId(),
	productsController.updateProductViews,
);
router.post(
	"/product/create-new",
	body("productName").isString(),
	body("productComponents").isString(),
	body("productDescription").isString(),
	body("productImageSmall").isString(),
	body("productImageMedium").isString(),
	body("productImageLarge").isString(),
	body("mainType").isString(),
	body("secondaryType").isString(),
	body("skinType").isString(),
	body("productPrice").isString(),
	body("productQuantity").isString(),
	authMiddleware,
	productsController.createNewProduct,
);
router.delete("/product/delete-existing", authMiddleware, productsController.deleteExistingProduct);
router.put(
	"/product/update-existing-data",
	body("productId").isString(),
	body("productName").isString(),
	body("productComponents").isString(),
	body("productDescription").isString(),
	body("productImageSmall").isString(),
	body("productImageMedium").isString(),
	body("productImageLarge").isString(),
	body("mainType").isString(),
	body("secondaryType").isString(),
	body("skinType").isString(),
	body("productPrice").isString(),
	body("productQuantity").isString(),
	authMiddleware,
	productsController.updateExistingProductData,
);

router.post(
	"/questionnaire/send",
	body("name").isString().isLength({ min: 3 }),
	body("surname").isString().isLength({ min: 3 }),
	body("email").isString().isLength({ min: 8 }),
	body("age").isString().notEmpty(),
	body("lifeStyle").isString().notEmpty(),
	body("skinType").isString().notEmpty(),
	body("location").isString().notEmpty(),
	questionnaireController.createQuestionnaireItem,
);

router.get("/gallery/images", imageGalleryController.getAllImages);

module.exports = router;
