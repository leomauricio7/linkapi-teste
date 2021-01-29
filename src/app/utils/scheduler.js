const axios = require('axios');
const utils = require("./jsonToXml");
const Schema = require("../models/schema");

const urlBling = process.env.URL_BLING;
const apikey = process.env.KEY_BLING;

const urlPipedrive = process.env.URL_PIPEDRIVE;
const api_token = process.env.KEY_PIPEDRIVE;

async function savePedidoBlind(data) {
    try {
        console.log("**********salvando pedido no Bling*********")
        const { value, title, products_count } = data;
        const { cc_email, name, owner_id } = data.org_id;

        const xml = utils.jsonToXmlPedido(data.person_id.name, name, cc_email, owner_id, title, products_count, value);
        const response = await axios.post(`${urlBling}/pedido/json/?apikey=${apikey}&xml=${xml}`);

        if (!response.data.retorno.erros) {
            console.log("***********Pedido salvo no Bling***********")
            savePedidoMongo(data)
        } else {
            console.log("***********Pedido já existe no Bling***********")
        }
    } catch (error) {
        console.log("Erro ao salvar o pedido no Bling:", error)
    }
}

async function savePedidoMongo(data) {
    console.log("*********salvando pedido no MongoDB************")
    const { id, value, title, products_count } = data;
    const { cc_email, name, owner_id } = data.org_id;

    const request = {
        idPedido: id,
        vendedor: data.person_id.name,
        nomeCliente: name,
        emailCliente: cc_email,
        descricao: title,
        idProduto: owner_id,
        quantidade: products_count,
        valor: value,
    };

    try {
        const isExists =  await  Schema.findOne({idPedido: request.idPedido});
        if(isExists){
            console.log("Pedido já existe no MongoDB*****");
            return;
        }
        const rs = await Schema.create(request);
        console.log("*******Pedido salvo com sucesso no MongoDB*********")
    } catch {
        console.log("!!!!!!Erro ao salvar pedido no MongoDB!!!!!!")
    }
}

module.exports = {

    async buscaPedidosPipedrive() {
        try {
            console.log("********Sincronização dados do PIPEDRIVE**********")
            console.log("***********Buscando negocios no pipedrive**********")
            const response = await axios.get(`${urlPipedrive}/deals`, { params: { api_token, status: "won", start: 0 } });
            const data = response.data;
            console.log("********percorrendo os negocios encontrados*******")
            for (let elm of data.data) {
                savePedidoBlind(elm);
            }
        } catch (error) {
            console.log("error na buscar dos negocios no pipedrive", error)
        }
    },

}