module.exports.produto = function (app, req, res) {
    if(req.session.id_tipo_usuario != 1 && req.session.id_tipo_usuario != 2){
        res.redirect('/usuario/login')
        return
    }

    const idProduto = req.params.idProduto
    

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getProduto(idProduto, function (error, result) {
        res.render('produto/produto', { noticia: result })
    })
}
module.exports.produto = function (app, req, res) {
    if(req.session.id_tipo_usuario != 1 && req.session.id_tipo_usuario != 2){
        res.redirect('/usuario/login')
        return
    }
    
    const conexao = app.config.conexao
    const modelproduto = new app.app.models.modelProduto(conexao)

    modelProduto.getProduto(function (error, result) {
        res.render('produto/produto', { noticias: result })
    })
}
module.exports.listar = function (app, req, res) {
   
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelProduto.getListaProduto(function (error, result) {
        console.log(result)
        res.render('produto/lista_produtos', {produtos:result})
    })
}
module.exports.adicionar = async function (app, req, res){
    if (req.session.id_tipo_usuario != 1 && req.session.id_tipo_usuario != 2 ){
        res.redirect('/usuario/login')
        return
    }

    const idProduto = req.params.idProduto
    const idUsuario = req.session.id_usuario

    const conexao = app.config.conexao
    const modelPedido = new app.app.models.modelPedido(conexao)
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)
    const pedidoAberto = await modelPedido.getPedidoAberto(idUsuario)
    if (pedidoAberto === null){
        await modelPedido.criarPedido(idUsuario)
    }

    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario)
    req.session.id_pedido = idPedido

    const existeProduto = await modelCarrinho.existeProduto(idProduto, idPedido)

    console.log(existeProduto)

    if (existeProduto.length > 0) {
        await modelCarrinho.alterarQuantidade(idProduto, idPedido)
    }
    else {
        await modelCarrinho.inserirProduto(idProduto, idPedido)
    }

    res.redirect('/usuario/cardapio')

}