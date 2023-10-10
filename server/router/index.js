const Router = require("express").Router;
const { body } = require("express-validator");

const userController = require("../controllers/user-controller");
const productsController = require("../controllers/products-controller");
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

module.exports = router;
