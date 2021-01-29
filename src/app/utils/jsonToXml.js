module.exports = {
    jsonToXmlPedido(vendedor, nomeCliente, emailCliente, idProduto, descricao, quantidade, valor) {
        return `<?xml version="1.0" encoding="ISO-8859-1"?>
                    <pedido>
                    <vendedor>${vendedor}</vendedor>
                    <cliente>
                        <nome>${nomeCliente}</nome>
                        <email>${emailCliente}</email>
                    </cliente>
                    <transporte>
                        <volume>
                        <servico>DIgital</servico>
                        </volume>
                    </transporte>
                    <itens>
                        <item>
                            <codigo>${idProduto}</codigo>  
                            <descricao>${descricao}</descricao>
                            <qtde>${quantidade}</qtde>
                            <vlr_unit>${valor}</vlr_unit>
                        </item>
                    </itens>
                    </pedido>
                    `;
    }
}