import * as express from "express"
import mysql from "mysql"
import cors from "cors"
import { main_config } from "../configs/db"
import { Login as LoginModel } from "../models/LoginModel";
const login = new LoginModel()
const connection = mysql.createConnection(main_config)
connection.query("SET NAMES utf8");
require("dotenv").config();
const BASE_PATH = process.env.BASE_URL

const LoginController = router => {
    router.post(
        `${BASE_PATH}/login`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                let formLogin = req.body.formLogin
                connection.query(login.getUser(formLogin.username, formLogin.pwd), function (err, result) {
                    if (!err) {
                        return res.status(200).json({ status_code: 200, data: result, type: "success", msg: "Login successfuly" });
                    } else {
                        return res.json({ status_code: 400, msg: err, type: "error" });
                    }
                });

            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );
}

export default LoginController
