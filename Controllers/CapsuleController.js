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

        res.status(500).json({msg: "Internal Server Error - Failed to create new capsule."})
    }
}