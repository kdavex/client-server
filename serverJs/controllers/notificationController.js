"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const utils_1 = require("../utils");
const getNotifications = async (req, res) => {
    const notifDocument = await req.prisma.notification.findMany({
        where: {
            notifTo_id: req.userId,
        },
        select: {
            id: true,
            type: true,
            createdAt: true,
            notifTo_id: true,
            notifFrom_id: true,
            post_id: true,
            comment_id: true,
            NotifFrom: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    user_image: true,
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    if (!notifDocument)
        return res
            .code(404)
            .send({ status: "fail", message: "Notification not Found" });
    let parsedNotifDoc = notifDocument.map((notif) => {
        return {
            id: notif.id,
            type: notif.type,
            createdAt: notif.createdAt,
            notifTo_id: notif.notifTo_id,
            post_id: notif.post_id ?? undefined,
            comment_id: notif.comment_id ?? undefined,
            notifFrom_id: notif.notifFrom_id,
            notifBy: {
                id: notif.NotifFrom.id,
                fullname: (0, utils_1.capitalize)(`${notif.NotifFrom.firstname} ${notif.NotifFrom.lastname}`),
                username: notif.NotifFrom.username,
                pfp: notif.NotifFrom.user_image.pfp_name,
            },
        };
    });
    return res.send({
        status: "success",
        message: "Successfully fetched notification",
        data: parsedNotifDoc,
    });
};
exports.notificationController = { getNotifications };
