import loginController from "../controllers/loginController";
export function LoginRoute(instance, _option, done) {
    instance.post("/", loginController.login);
    done();
}
