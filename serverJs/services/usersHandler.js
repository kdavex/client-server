import { removeFiles } from "../utils/fileManager";
export async function usersPostOnResponseHandler(req, res) {
    // Remove Files From Temp Folder
    if (res.statusCode === 201)
        return;
    removeFiles([req.body.pfp, req.body.cover], "tmp");
}
export async function userPutOnResponseHandler(req, res) {
    // Remove Files From Temp Folder
    if (res.statusCode === 200)
        return;
    removeFiles([req.body.pfp, req.body.cover], "tmp");
}
