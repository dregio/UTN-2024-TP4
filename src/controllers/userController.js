import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LangFromReq, msg } from "../utils/multiLanguage.js";
import { debugging, SESSION_SECRET } from "../../src/config.js";

const userController = {

	getUsers: async (req, res) => {
		const lang = LangFromReq(req);
		try {
			const users = await User.find();
			if (users.length === 0) {
				return res.status(204).json({ message: lang.tr(msg.NO_USERS_FOUND) });
			}
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}
	},

	createUser: async (req, res) => {
		const lang = LangFromReq(req);
		try {
			const newUser = new User(req.body);
			const { email } = newUser;

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(409).json({ message: lang.tr(msg.USER_EMAIL_ALREADY_EXISTS) });
			}

			await newUser.save();
			res.status(201).json(lang.resMsjObj(newUser, msg.USER_CREATED));
		}
		catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}
	},

	getUser: async (req, res) => {
		const lang = LangFromReq(req);
		try {
			const id = req.params.id;
			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ message: lang.tr(msg.USER_NOT_FOUND, id) });
			}
			res.status(200).json(user);
		}
		catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}
	},

	updateUser: async (req, res) => {

		const lang = LangFromReq(req);
		try {
			const _id = req.params.id;
			const user = await User.findById(_id);
			if (!user) {
				return res.status(404).json({
					message: lang.tr(msg.USER_NOT_FOUND, _id)
				});
			}
			
			if (req.body.password) {
				req.body.password = bcrypt.hashSync(req.body.password, 10); // TODO3: hacer una única función para encriptar password que se use también en userModel.
			}
			
			const updatedUser = await User.findByIdAndUpdate(
				_id, req.body, { new: true });;
			res.status(201).json(lang.resMsjObj(updatedUser, msg.USER_UPDATED));
		}
		catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}
	},

	deleteUser: async (req, res) => {
		const lang = LangFromReq(req);
		try {
			const _id = req.params.id;
			const user = await User.findById(_id);
			if (!user) {
				return res.status(404).json({
					message: lang.tr(msg.USER_NOT_FOUND, _id)
				});
			}
			await User.findByIdAndDelete(_id);
			res.status(201).json(lang.resMsjObj(user, msg.USER_DELETED));
		}
		catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}
	},

	login: async (req, res) => {
		const lang = LangFromReq(req);
		try {
			const user = await User.findOne({ email: req.body.email });
			debugging && !user && console.log("🚀 ~ login: ~ user UNKNOWN:", user);
			const loginOK = (user 
				&& bcrypt.compareSync(req.body.password, user.password));
			debugging && console.log("🚀 ~ login: ~ loginOK:", loginOK);
			
			if (loginOK) {
				debugging && console.log("🚀 ~ login: ~ user:", user)
				
				const payload = {
					userId: user._id,
					userEmail: user.email
				}
				const token = jwt.sign(
					payload, SESSION_SECRET, { expiresIn: "4h" }
				);
				debugging && console.log("🚀 ~ login: ~ token:", token);
				debugging && console.log("🚀 ~ login: ~ req.session:", req.session)
//				req.session.token = token;	// TODO3: sería mejor guardar el token. Investigar mejor.
				return res.status(200).json(
					{ token, message: lang.tr(msg.LOGGED_IN) });
			} else {
				debugging && console.log("🚀 ~ returnres.status ~ lang.tr(msg.USER_OR_PASSWORD_INCORRECT):", lang.tr(msg.USER_OR_PASSWORD_INCORRECT))
				return res.status(400).json({
					message: lang.tr(msg.USER_OR_PASSWORD_INCORRECT)
				});
			}
		} catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}

	}

}

export default userController;