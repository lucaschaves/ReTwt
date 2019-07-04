const routes = require("express").Router();
const Controller = require("../controllers/post.controller");

routes.get("/", Controller.index);
routes.get("/:id", Controller.show);
routes.post("/", Controller.store);
routes.put("/:id", Controller.update);
routes.delete("/:id", Controller.destroy);
routes.put("/like/:id", Controller.like);

module.exports = routes;
