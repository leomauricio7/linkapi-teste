const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    idPedido: { type: String, required: true, unique: true },
    vendedor: { type: String, required: true },
    nomeCliente: { type: String, required: true },
    emailCliente: { type: String, required: true },
    descricao: { type: String, required: true },
    idProduto: { type: String, required: true },
    quantidade: { type: Number, required: true },
    valor: { type: Number, get: getValor, set: setValor, required: true },
    criado_em: {
        type: Date,
        default: Date.now,
    }
});

function getValor(num) {
    return (num / 100).toFixed(2);
}
function setValor(num) {
    return num * 100;
}

module.exports = mongoose.model('Opportunity', schema);
