function Usuario(conexao) {
    this._conexao = conexao
    this._crypto = require('crypto')
}
Usuario.prototype.cadastrarUsuario = function (dados, callback) {
    const senha = this._crypto.createHash('md5').update(dados.senha).digest('hex');
    this._conexao.query(`insert into usuario values(null,'${dados.nome}', '${senha}', '${dados.email}', 1)`, callback)
}

Usuario.prototype.getUsuario = function (dados, callback) {
    const senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`select * from usuario where email = '${dados.email}' and senha = '${senha}'`, callback)
}
Usuario.prototype.getUsuarioByEmail = function (email, callback) {
    this._conexao.query(`select * from usuario where email = '${email}'`, callback)
}

Usuario.prototype.getUsuarioById = function (id, callback) {
    this._conexao.query(`select * from usuario where id = '${id}'`, callback)
}


Usuario.prototype.getEditarusuario = function(dados, callback){
    this._conexao.query('update usuario set', callback  )
}
Usuario.prototype.excluir = function (id, callback){
    this._conexao.query(`delete from usuario where id = ${id}`, callback)
}
Usuario.prototype.getListarUsuario = function (callback) {
    this._conexao.query('select * from usuario', callback)
} 
Usuario.prototype.getAdminCadastroUsuario = function(dados, callback){
    this._conexao.query(`insert into usuario values(null,'${dados.nome}', '${senha}', '${dados.email}', ?)`, callback)
}



module.exports = function(){
    return Usuario
}