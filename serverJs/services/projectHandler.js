import { removeFiles, storeFile } from "../utils/fileManager.ts";
// *This Multipart consumer is for posts with meedia that contains each caption in the image
/**
 * Custom Multipart Consumer for Posts
 * ? Client Side must hace a field in the form Data for uploading medias ie. caption-[hash], image-[hash], video-[hash]
 * @param req
 * @param res
 * @returns
 */
export async function projectsCustomMultipartConsumer(req, res) {
    // console.log({ body: req.body });
    if (!req.isMultipart() || req.isMultipart() === undefined)
        return;
    const parts = req.parts();
    let body = {};
    const media = {};
    try {
        for await (const part of parts) {
            if (part.type === "field") {
                if (part.fieldname.includes("caption-")) {
                    const hash = part.fieldname.split("-")[1];
                    if (media[hash] === undefined)
                        media[hash] = { caption: part.value, filename: null };
                    media[hash].caption = part.value;
                }
                else if (part.fieldname === "tags" &&
                    typeof part.value === "string") {
                    const tags = part.value.replace(/(\s|\[|\]|#)/g, "").split(",");
                    body[part.fieldname] = tags;
                }
                else
                    body[part.fieldname] = part.value;
            }
            if (part.type === "file") {
                if (part.file.truncated)
                    return res.status(413).send({ message: "File too large" });
                if (part.fieldname.includes("image-") ||
                    part.fieldname.includes("video-")) {
                    const hash = part.fieldname.split("-")[1];
                    if (media[hash] === undefined)
                        media[hash] = {
                            caption: null,
                            filename: (await storeFile(part, "tmp")).filename,
                        };
                    else
                        media[hash].filename = (await storeFile(part, "tmp")).filename;
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        req.body = {
            ...body,
            media: Object.values(media).filter((elem) => elem.filename !== null),
        };
    }
}
export async function projectPostOnresponseHander(req, res) {
    // Remove Files From Temp Folder
    if (res.statusCode === 201)
        return;
    req.body.media.forEach((elem) => {
        if (elem.filename !== null)
            removeFiles([elem.filename], "tmp");
    });
}
/**
 * Remove Files From Temp Folder
 */
export async function projectPutOnResponeseHandler(req, res) {
    // Remove Files From Temp Folder
    if (res.statusCode === 200)
        return;
    if (!req.body.media)
        return;
    req.body.media.forEach((elem) => {
        if (elem.filename !== null)
            removeFiles([elem.filename], "tmp");
    });
}
