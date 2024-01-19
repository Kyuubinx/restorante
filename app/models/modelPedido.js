function Pedido(conexao){
    this._conexao = conexao
}
Pedido.prototype.existePedidoAberto = function (idUsuario) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM pedido WHERE id_usuario = ${idUsuario} AND id_status = 1;`, function(errors, result) {
            if (result.length == 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        })
    })
}

Pedido.prototype.criarPedido = function (idUsuario) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`INSERT INTO pedido VALUES(NULL, ${idUsuario}, 1, NULL);`, function(errors, result) {
            resolve(result);
        })
    })
}
Pedido.prototype.getPedidoAberto = function(idUsuario){
    return new Promise((resolve, reject)=>{
        this._conexao.query(`select * from pedido where id_usuario = ${idUsuario} and id_status = 1`, function(erros, result){
            resolve(result)
        })
    })
}
Pedido.prototype.getIdPedidoAberto = function(idUsuario){
    return new Promise((resolve, reject)=>{
        this._conexao.query(`select id from pedido where id_usuario = ${idUsuario} and id_status = 1`, function(erros, result){
            console.log(erros)
            resolve(result[0].id)
        })
    })
}
module.exports = function () {
    return Pedido;
}