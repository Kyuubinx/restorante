module.exports = function (app) {
    app.get('/', function(req,res){
        app.app.controllers.home.index(app, req, res)
    })
    
    app.get('/usuario/cardapio', function(req, res){
        app.app.controllers.usuarios.cardapio(app, req, res)
    })
   
}