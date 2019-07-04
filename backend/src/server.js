const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

const models = require("./app/models");

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/post", require("./app/routes/post.route"));
app.use("/usuario", require("./app/routes/usuario.route"));

models.sequelize
  .sync()
  .then(() => {
    console.log("Conectado ao Mysql");
    server.listen(port, () => {
      console.log("Servidor rodando na porta: " + port);
    });
  })
  .catch(error => {
    console.log(error);
  });
