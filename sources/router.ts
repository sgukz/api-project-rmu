import * as express from "express"
import cors from "cors"
import GraduateController from "./controllers/graduate/GraduateController"
import LoginController from "./controllers/LoginController"
require("dotenv").config();
class Router {
    private secretkeyJWT: any
    constructor(server: express.Express) {
        this.secretkeyJWT = process.env.TOKEN_SECRET;
        const router = express.Router()
        GraduateController(router)
        LoginController(router)
        router.options("*", cors())
        server.use("/", router)
    }
}

export default Router