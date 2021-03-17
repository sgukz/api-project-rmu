import * as express from "express"
import mysql from "mysql"
import cors from "cors"
import { main_config } from "../../configs/db"
import { Graduate as GraduateModel } from "../../models/graduate/GraduateModel";
const graduate = new GraduateModel()
const connection = mysql.createConnection(main_config)
connection.query("SET NAMES utf8");
require("dotenv").config();
const BASE_PATH = process.env.BASE_URL

const GraduateController = router => {
    router.get(
        `${BASE_PATH}`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                let resp = {}
                resp = { code: 200, data: "data", msg: "success" };
                // console.log(resp);
                return res.json(resp);

            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );
    
    router.post(
        `${BASE_PATH}/saveData`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                let formData = req.body.register
                let cid = formData.cid
                connection.query(graduate.InsertData(formData), function (err, result) {
                    if (!err) {
                        return res.status(200).json({ status_code: 200, msg: "ขอบคุณ, บันทึกข้อมูลเรียบร้อยแล้ว", type: "success", id: cid });
                    } else {
                        return res.status(400).json({ status_code: 400, msg: err, type: "error" });
                    }
                });

            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );

    router.post(
        `${BASE_PATH}/saveDataChange`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                let formData = req.body.register
                let cid = formData.cid
                let condition = "cid = '" + cid + "'"
                // console.log(graduate.UadateData(formData, condition));
                connection.query(graduate.UadateData(formData, condition), function (err, result) {
                    if (!err) {
                        return res.status(200).json({ status_code: 200, msg: "ขอบคุณ, แก้ไขข้อมูลเรียบร้อยแล้ว", type: "success", id: cid });
                    } else {
                        return res.status(400).json({ status_code: 400, msg: err, type: "error" });
                    }
                });
            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );

    router.get(
        `${BASE_PATH}/getGraduateDataByCID/:cid`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                let cid = req.params.cid
                connection.query(graduate.getGraduateDataByCID(cid), function (err, result) {
                    if (!err) {
                        return res.status(200).json({ status_code: 200, data: result, type: "success" });
                    } else {
                        return res.json({ status_code: 400, msg: err, type: "error" });
                    }
                });

            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );

    router.get(
        `${BASE_PATH}/getGraduateDataAll`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                connection.query(graduate.getGraduateDataAll(), function (err, result) {
                    if (!err) {
                        return res.status(200).json({ status_code: 200, data: result, type: "success" });
                    } else {
                        return res.json({ status_code: 400, msg: err, type: "error" });
                    }
                });

            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );

    router.get(
        `${BASE_PATH}/delete/:cid`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                let cid = req.params.cid
                connection.query(graduate.Delete(cid), function (err, result) {
                    if (!err) {
                        return res.status(200).json({ status_code: 200, msg: "ลบข้อมูลสำเร็จ", type: "success" });
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

export default GraduateController