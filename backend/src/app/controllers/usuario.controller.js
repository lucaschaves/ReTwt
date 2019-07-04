const Usuario = require("../models").Usuario;

module.exports = {
  async index(req, res, next) {
    const retorno = await Usuario.findAll();
    return res.json(retorno);
  },

  async store(req, res) {
    const retorno = await Usuario.create(req.body);
    return res.json(retorno);
  },

  async show(req, res) {
    const retorno = await Usuario.findOne({
      where: { id: req.params.id }
    });
    return res.json(retorno);
  },

  async update(req, res) {
    await Usuario.update(req.body, {
      where: { id: req.params.id }
    });
    return res.send();
  },

  async destroy(req, res) {
    await Usuario.destroy({ where: { id: req.params.id } });
    return res.send();
  }
};
