const { Post, Usuario } = require("../models");
const db = require("../models");

module.exports = {
  async index(req, res, next) {
    const retorno = await Post.findAll({
      attributes: [
        "id",
        "post_descricao",
        "post_like",
        "usuarioid",
        [
          db.sequelize.fn(
            "date_format",
            db.sequelize.col("data"),
            "%d %M %h:%i min"
          ),
          "data"
        ]
      ],
      include: [{ model: Usuario }],
      order: [["id", "DESC"]]
    });
    return res.json(retorno);
  },

  async store(req, res) {
    const retorno = await Post.create(req.body);

    const ret = await Post.findOne({
      attributes: [
        "id",
        "post_descricao",
        "post_like",
        "usuarioid",
        [
          db.sequelize.fn(
            "date_format",
            db.sequelize.col("data"),
            "%d %M %h:%i min"
          ),
          "data"
        ]
      ],
      include: [{ model: Usuario }],
      where: { id: retorno.id }
    });
    req.io.emit("post", ret);
    return res.json(ret);
  },

  async show(req, res) {
    const retorno = await Post.findOne({
      where: { id: req.params.id }
    });
    return res.json(retorno);
  },

  async update(req, res) {
    await Post.update(req.body, {
      where: { id: req.params.id }
    });
    return res.send();
  },

  async destroy(req, res) {
    await Post.destroy({ where: { id: req.params.id } });
    return res.send();
  },

  async like(req, res) {
    const retorno = await Post.findOne({ where: { id: req.params.id } });
    retorno.post_like += 1;
    await Post.update(retorno.dataValues, {
      where: { id: req.params.id }
    });

    const ret = await Post.findOne({
      attributes: [
        "id",
        "post_descricao",
        "post_like",
        "usuarioid",
        [
          db.sequelize.fn(
            "date_format",
            db.sequelize.col("data"),
            "%d %M %h:%i min"
          ),
          "data"
        ]
      ],
      include: [{ model: Usuario }],
      where: { id: req.params.id }
    });

    req.io.emit("like", ret);
    return res.json(ret);
  }
};
