module.exports.cadastro_produto = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }
    res.render('admin/cadastro_produto', { erros: {}, noticia: {} })
}

module.exports.cadastrar = function (app, req, res) {
    if (req.session.id_tipo_usuario != 2) {
        res.redirect('/usuario/login')
        return
    }

    const dados = req.body

    req.assert('descricao', 'voce deve preencher o campo titulo').notEmpty()
    req.assert('preco', 'voce deve preencher o campo conteudo').notEmpty()
    
    const erros = req.validationErrors()

    if (erros) {
        res.render('admin/cadastro_produto', { erros: erros, produto: dados })
        return
    }

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)

    modelNoticia.cadastrarProduto(dados, function (error, result) {
        res.redirect('/produto')
    })

}
module.exports.listar = function (app, req, res) {
   
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getListarUsuario(function (error, result) {
        res.render('admin/listar_usuario', { usuario: result })
    })
}
module.exports.tela_editar = function (app, req, res) {
    const conexao = app.config.conexao
    const modelEditarUsuario = new app.app.models.modelEditarUsuario(conexao)

    modelEditarUsuario.getEditarUsuario(function (error, result) {
        res.render('admin/editarUsuario', { usuario: result })
    })
}
module.exports.excluir = function (app, req, res) {
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.excluir(idUsuario, function(error, result){
        res.redirect('/usuario/listar')
    })
}
module.exports.tela_editar = function (app,req, res){
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao)
    
    modelUsuario.getUsuarioById(idUsuario, function(error, usuario){
        modelTipoUsuario.getTipos(function(error, tipos){
            res.render('admin/editar_usuario', {usuario: usuario, tipos:tipos,erros:{}})
        })
    })
}
module.exports.menu = function(app, req, res){
    res.render('admin/menu')
}

module.exports.admin_cadastro_usuario = function (app, req, res){
    res.render('admin/cadastro_usuario', {erros: {}, usuario: {}})
}
module.exports.cadastrar = function (app, req, res) {
    
    const dados = req.body

    req.assert('nome', 'voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'voce deve preencher o campo email').notEmpty()
    req.assert('senha', 'voce deve preencher o campo senha').notEmpty()

    const erros = req.validationErrors()

    if (erros) {
        res.render('admin/cadastro_usuario', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getAdminCadastroUsuario(dados.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'este e-mail já está em uso' }]
            res.render('admin/cadastro_usuario', { erros: erros, usuario: dados })
        }
        else {
            modelUsuario.cadastrarUsuario(dados, function (error, result) {
                res.redirect('/usuario/login')
            })
        }
    })
}