import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(204).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    const newUser = new User(req.body);
    const { email } = newUser;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await newUser.save();
    res.status(201).json({ message: "User created" });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
