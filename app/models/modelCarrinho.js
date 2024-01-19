function carrinho(conexao){
    this._conexao = conexao
}
carrinho.prototype.existeProduto = function (idProduto, idPedido){
    return new Promise ((resolve, reject) => {
        this._conexao.query(`select * from carrinho where id_produto = ${idProduto} and id_pedido = ${idPedido}`, function(error, result){
        resolve(result)
    })
})
}
carrinho.prototype.alterarQuantidade = function (idProduto, idPedido){
    return new Promise ((resolve, reject)=>{
        this._conexao.query(`update carrinho set quantidade = quantidade + 1 where id_produto = ${idProduto} and id_pedido = ${idPedido};`, function(error, result){
            resolve(result)
        })
    }
    )
}
carrinho.prototype.inserirProduto = function (idProduto, idPedido){
    return new Promise ((resolve, reject) => {
        this._conexao.query(`insert into carrinho values(null, ${idPedido}, ${idProduto}, 1)`, function(error, result){
            resolve(result)
        })
    })
}
carrinho.prototype.removerProduto = function(idProduto, idPedido){
    return new Promise ((resolve, reject)=>{
        this._conexao.query(`delete from carrinho where id_produto = ${idProduto} and id_pedido = ${idPedido};`)
    })
}

carrinho.prototype.getCarrinho = function(idPedido){
    return new Promise ((resolve, reject)=>{
        this._conexao.query(`select * from carrinho where id_pedido = ${idPedido};`, function (errors, result) {
            console.log(errors)
            resolve(result)
        })
    })
}

module.exports = function(){
return carrinho
}