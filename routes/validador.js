const {Router} = require('express')
const router = Router()


router.post('/pagto', async (req, res) => {
    const {id} = req.body

    try{

        const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.MP_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })

        const dados = await response.json()

        return res.status(200).json({
            id: dados.id,
            status: dados.status,
            status_detail: dados.status_detail,
            pago: dados.status === 'approved'
        })

    }catch(e){
        return res.status(500).json({
            msg: "Erro interno no servidor"
        })
    }

})


router.get('/healt', (req, res) => {
    return res.status(200).json({
        msg: "Rota funcionando"
    })
})

module.exports = router