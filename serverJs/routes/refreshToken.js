import refrehTokenController from "../controllers/refreshToken";
export function RefreshTokenRoute(instance, _options, done) {
    instance.post("/", refrehTokenController.refreshToken);
    done();
}
