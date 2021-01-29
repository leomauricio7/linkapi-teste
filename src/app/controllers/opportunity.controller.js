const Schema = require("../models/schema");

module.exports = {
    async getAll(req, res, next) {
        const rs = await Schema.find();
        res.json({ data: rs });
    },
    async getById(req, res, next) {
        const { idPedido } = req.params;
        if (!idPedido) res.status(400).send("parametro idPedido é obrigatorio")
        const rs = await Schema.findOne({ idPedido });
        if (!rs) return res.status(404).json({ msg: "Not found" });
        res.json(rs);
    },
    async getSummary(req, res, next) {
        const result =  await Schema.aggregate(
            [
                
                {
                    $group: {
                        _id: { $dateToString: { format: "%d-%m-%Y", date: "$criado_em" } },
                        quantidade: { $sum: 1 },
                        total: { $sum: { $multiply: ["$valor", "$quantidade"] } },
                    }
                }
            ]).exec();
            res.send(result)
    }
}