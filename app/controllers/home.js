module.exports.index = function (app, req, res){
    
    if(req.session.id_tipo_usuario != 1 && req.session.id_tipo_usuario != 2){
        res.redirect('/usuario/login')
        return
    }

    const id_tipo_usuario = req.session.id_tipo_usuario

    res.render('home/index', {id_tipo_usuario : id_tipo_usuario})

}