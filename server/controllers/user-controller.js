const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}
			const { name, surname, address, email, password } = req.body;
			const userData = await userService.registration(
				name,
				surname,
				address,
				email,
				password,
			);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (err) {
			next(err);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		} catch (err) {
			next(err);
		}
	}

	async updateUserData(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}
			const { id, name, surname, address, email } = req.body;
			console.log(req.body);
			const updatedUserData = {
				id,
			};
			if (name) {
				updatedUserData.name = name;
			}
			if (surname) {
				updatedUserData.surname = surname;
			}
			if (address) {
				updatedUserData.address = address;
			}
			if (email) {
				updatedUserData.email = email;
			}
			const userData = await userService.updateUserData(updatedUserData);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new UserController();
