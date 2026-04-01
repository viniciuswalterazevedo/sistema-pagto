const test = require('node:test')
const assert = require('node:assert')
require('dotenv').config()


// Valida se a rota está funcionando
test('Valida se o checkout está funcionando', async ()=> {
    const response = await fetch(`http://localhost:${process.env.PORTA}/pagamento/healt`, {
        method: "GET"
    })

    assert.strictEqual(response.status, 200)
})


// Valida se o Mercado Pago e o back end está gerando o pagto
test('Valida se o checkout está gerando o pagto', async ()=> {
    const response = await fetch(`http://localhost:${process.env.PORTA}/pagamento/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            valor: 0.01,
            descricao: "Teste de pagto",
            email: "viniciuswalterazevedo1202@gmail.com"
        })
    })

    const dados = await response.json()

    assert.strictEqual(response.status, 200)

    //console.log(`[Id]: ${dados.id}\n[Status]: ${dados.status}\n[Qr_code]: ${dados.qr_code}`)
})
