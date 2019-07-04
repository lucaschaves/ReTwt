const routes = require("express").Router();
const Controller = require("../controllers/usuario.controller");
const multer = require("multer");
const uploadConfig = require("../../config/upload");

const upload = multer(uploadConfig);

routes.get("/", Controller.index);
routes.get("/:id", Controller.show);
routes.post("/", upload.single("image"), Controller.store);
routes.put("/:id", Controller.update);
routes.delete("/:id", Controller.destroy);

module.exports = routes;
