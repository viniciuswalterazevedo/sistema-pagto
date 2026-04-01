function liberaAcesso(req, res, next){
    // return res.status(403).json({
    //     msg: "Acesso Negado"
    // })

    next()
}

module.exports = liberaAcesso