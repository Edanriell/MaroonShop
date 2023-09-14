const Router = require("express").Router;
const { body } = require("express-validator");

const userController = require("../controllers/user-controller");
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
	userController.updateUserData,
);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
