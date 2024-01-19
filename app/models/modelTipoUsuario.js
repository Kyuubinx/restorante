function TipoUsuario(conexao) {
    this._conexao = conexao
}
TipoUsuario.prototype.listarTipoUsuario = function (id, callback) {
    this._conexao.query(`select * from tipo_usuario`, callback)
}
module.exports = function(){
    return TipoUsuario
}