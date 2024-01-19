module.exports = function (app) {
    app.get('/cadastro_usuario', function (req, res) {
        app.app.controllers.usuarios.cadastro_usuario(app, req, res)
    })
    app.post('/usuario/cadastrar', function(req, res){
        app.app.controllers.usuarios.cadastrar(app, req, res)
    })
    app.get('/usuario/login', function(req, res){
        app.app.controllers.usuarios.usuario_login(app, req, res)
    })
    app.post('/usuario/validar', function(req, res){
        app.app.controllers.usuarios.validar(app, req, res)
    })
    app.get('/usuario/sair', function(req,res){
        app.app.controllers.usuarios.sair(app, req, res)
    })
    app.get('/usuario/editar', function(req, res){
        app.app.controllers.admin.editar(app, req, res)
    })
   app.get('/usuario/config', function(req, res){
        app.app.controllers.usuarios.usuario_config(app, req, res)
   })
   app.get('/usuario/carrinho', function(req, res){
        app.app.controllers.usuarios.carrinho(app,req,res)
   })
   
}