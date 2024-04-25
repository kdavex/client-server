import { PrismaClient } from "@prisma/client";
/**
 * Updates the unread messsages count of a conversation
 * @param user_id user to update the unread messages
 * @param conversationId
 * @returns
 */
const prisma = new PrismaClient();
export const updateUnreadMessagesCount = async (user_id, conversation_id) => {
    const converseExist = await converseDocExistsById(conversation_id);
    console.log({ converseExist });
    if (!converseExist)
        throw new Error("Converse document not found");
    return await prisma.converse.update({
        where: { id: conversation_id },
        data: {
            unread: {
                updateMany: {
                    where: { user_id: user_id },
                    data: {
                        count: 0,
                    },
                },
            },
        },
    });
};
export const converseDocExistsById = async (converes_id) => {
    return await prisma.converse.findFirst({
        where: {
            id: converes_id,
        },
    });
};
export const converseDocExistByMessengersId = async (messengersId) => {
    return await prisma.converse.findFirst({
        where: {
            messengers_id: {
                hasEvery: messengersId,
            },
        },
        select: {
            id: true,
        },
    });
};
