import Capsules from "../Models/Capsule.js";
import jwt from "jsonwebtoken";

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
            order: [['release_time', req?.body?.sort_release_time ?? 'ASC']]
        });

        res.status(200).json({data: capsules});
    } catch (error) {
        console.log(error);

        res.sendStatus(500)
    }
}

export const filterCapsules = async(req) => {
    let filter = null;
    console.log(req.i)
    if (req.is_active) {
        filter = {
            is_active: req.is_active
        }
    }

    return filter;
}

