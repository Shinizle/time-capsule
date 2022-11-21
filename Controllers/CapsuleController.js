import Capsules from "../Models/Capsule.js";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import capsule from "../Models/Capsule.js";

export const getUserCapsules = async(req, res) => {
    const user = jwt.decode(req.cookies.refreshToken);
    let capsules = await Capsules.findAll({
        where: {
            user_id: user.userId
        }
    });

    return res.status(200).json({data: capsules});
}

export const createCapsule = async(req, res) => {
    const user = jwt.decode(req.cookies.refreshToken);
    try {
        let capsule = await Capsules.create({
            title: req.body.title,
            message: req.body.message,
            file: req.file.path,
            user_id: user.userId,
            release_time: new Date(req.body.release_time)
        });

        res.status(200).json({data: capsule});
    } catch (error) {
        console.log(error);

        res.sendStatus(500)
    }
}

export const getAllCapsules = async(req, res) => {
    try {
        let is_active = [true, false];
        if (req.body.status == 'active') is_active = true;
        if (req.body.status == 'inactive') is_active = false;

        let capsules = await Capsules.findAll({
            where: {
                is_active: is_active
            },
            order: [['release_time', req?.body?.sort_release_time ?? 'ASC']],
            attributes: ['id', 'title', 'release_time', 'is_active', 'createdAt', 'updatedAt'],
            include: {
                model: User,
                attributes:['name', 'email']
            }
        });

        res.status(200).json({data: capsules});
    } catch (error) {
        console.log(error);

        res.sendStatus(500)
    }
}

export const getSpecificTimeCapsule = async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const capsule = await Capsules.findOne({
            where: {
                id: id
            }
        });

        var now = new Date();
        if (capsule.release_time >= now) {
            res.status(201).json({msg: "This time capsule cannot be opened yet."})
        } else {
            res.status(200).json({data: capsule});
        }

    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}

