import logoutController from "../controllers/logoutController";
export function LogoutRoute(instance, _option, done) {
    instance.post("/", logoutController.logout);
    done();
}
