import Users from "../Models/User.js";
import bycript from "bcrypt";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();

        res.json(users);
    } catch (error) {
        console.log(error)
    }
}

export const register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({msg: "The password and confirmation password do not match."});
    }

    const salt = await bycript.genSalt();
    const hasPassword = await bycript.hash(password, salt);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hasPassword
        });

        res.json({msg: "Register Success."});
    } catch (error) {
        console.log(error);
    }
}
