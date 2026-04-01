const {Router} = require('express')
const router = Router()
const {MercadoPagoConfig, Payment} = require('mercadopago')


//Gera o payment
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_TOKEN
})

const payment = new Payment(client)

router.post('/checkout', async (req, res) => {

    const {valor, descricao, email} = req.body

    try{
        const pagamento = await payment.create({
            body:{
                transaction_amount: valor,
                description: descricao,
                payment_method_id: 'pix',
                payer: {
                    email: email
                }
            }
        })

        return res.status(200).json({
            id: pagamento.id,
            status: pagamento.status,
            qr_code: pagamento.point_of_interaction?.transaction_data?.qr_code,
            qr_code_url_mp: pagamento.point_of_interaction?.transaction_data?.ticket_url
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