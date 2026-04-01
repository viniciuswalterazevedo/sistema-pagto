const {Router} = require('express')
const router = Router()
const path = require('path')
const liberaAcesso = require(path.join(__dirname, '..', 'utils', 'liberaAcesso.js'))

//Rota Inicial, debug
router.get('/', liberaAcesso, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home', 'home.html'))
})


router.get('/healt', (req, res) => {
    return res.status(200).json({
        msg: "Rota funcionando"
    })
})


module.exports = router