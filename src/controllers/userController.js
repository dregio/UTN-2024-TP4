import User from "../models/userModel.js";
import { LangFromReq, msg } from "../utils/multiLanguage.js";

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
			console.log("req.body: ", req.body);
			const newUser = new User(req.body);
			const { email } = newUser;

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(409).json({ message: lang.tr(msg.USER_ALREADY_EXISTS) });
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
					message: lang.tr(msg.USER_NOT_FOUND, _id) });
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
					message: lang.tr(msg.USER_NOT_FOUND, _id) });
			}
			await User.findByIdAndDelete(_id);
			res.status(201).json(lang.resMsjObj(data, msg.USER_DELETED));
			}
		catch (error) {
			res.status(500).json(lang.internalServerErrorObj(error));
		}
	},
}



export default userController;