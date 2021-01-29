const axios = require('axios');
const url = process.env.URL_BLING;
const apikey =  process.env.KEY_BLING;
const utils = require("../utils/jsonToXml");

module.exports = {
    async getProducts(req, res, next){
        try {
            const response = await axios.get(`${url}/produtos/json/`, { params : { apikey} });
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg: error});
          }
    },
    async getPedidos(req, res, next){
        try {
            const response = await axios.get(`${url}/pedidos/json/`, { params : { apikey} });
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg: error});
          }
    },
    async savePedido(req, res, next){
        try {
            const errors  = [];
            const { vendedor, nomeCliente, emailCliente, idProduto, descricao, quantidade, valor} = req.body;

            if(!vendedor) errors.push("campo vendedor é obrigatório");
            if(!nomeCliente) errors.push("campo nomeCliente é obrigatório");
            if(!emailCliente) errors.push("campo emailCliente é obrigatório");
            if(!idProduto) errors.push("campo idProduto é obrigatório");
            if(!descricao) errors.push("campo descricao é obrigatório");
            if(!quantidade) errors.push("campo quantidade é obrigatório");
            if(!valor) errors.push("campo valor é obrigatório");

            if(errors.length > 0) return res.status(400).json(errors);

            const xml  = utils.jsonToXmlPedido(vendedor, nomeCliente, emailCliente, idProduto, descricao, quantidade, valor);
            
            const response = await axios.post(`${url}/pedido/json/?apikey=${apikey}&xml=${xml}`);
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg:error});
          }
    }
}