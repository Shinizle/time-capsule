import nodemailer from "nodemailer";
import Capsules from "../../Models/Capsule.js";
import User from "../../Models/User.js";

let  releaseCapsules;

export default releaseCapsules = async() => {
    var now = new Date();
    const capsules = await Capsules.findAll({
        include: {
            model: User,
            attributes: ['name', 'email']
        }
    });
    for (const capsule of capsules) {
        if (capsule.release_time <= now && capsule.is_active == false) {
            try {
                capsule.update({is_active: true});

                sendMail(capsule);
                console.log({
                    id: capsule.id,
                    title: capsule.title,
                    msg: "released"
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}

function sendMail(capsule) {
    let mailTransporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // setting credentials
    let mailDetails = {
        from: process.env.MAIL_SENDER,
        to: capsule.user.email,
        subject: "Your time capsule: " + capsule.title,
        text: "Your time capsule has been released!",
    };

    // sending email
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("error occurred", err.message);
        }
    });
}