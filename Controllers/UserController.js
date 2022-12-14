import Users from "../Models/User.js";
import bycript from "bcrypt";
import jwt, {decode} from "jsonwebtoken";

export const getUser = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const users = await Users.findOne({
            where: {
                refresh_token: refreshToken
            },
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });

        res.json(users);
    } catch (error) {
        console.log(error);

        res.status(403).json({msg: "Unauthorized"});
    }
}

export const register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({msg: "The password and confirmation password do not match."});
    }

    if (await Users.findOne({ where: { email: email }})) {
        return res.status(400).json({msg: "Email is already taken."});
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

export const login = async(req, res) => {
    const data = req.body;
    try {
        const user = await Users.findOne({
            where: {
                email: data.email
            }
        })
        const match = await bycript.compare(data.password, user.password);
        if (!match) return res.status(400).json({msg: "Invalid password."});
        const userId = user.id;
        const name = user.email;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({accessToken});
    } catch (error) {
        console.log(error);

        res.status(404).json({msg: "Email not found"});
    }
}

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user.id;
            const name = user.email;
            const email = user.email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });

            res.status(200).json({accessToken});
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204);
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user) return res.sendStatus(204);
        await Users.update({refresh_token: null}, {
            where: {
                id: user.id
            }
        });

        res.clearCookie('refreshToken');
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
}

