const test = require('node:test')
const assert = require('node:assert')
require('dotenv').config()


// Valida se a rota está funcionando
test('Valida se o validador está funcionando', async ()=> {
    const response = await fetch(`http://localhost:${process.env.PORTA}/validacao/healt`, {
        method: "GET"
    })

    assert.strictEqual(response.status, 200)
})


//Valida se o validador de pagamentos está ok (Reprovado ou Cancelado)
test('Valida se o validador está funcionando, deve retornar pendente ou cancelado', async ()=> {
    const response = await fetch(`http://localhost:${process.env.PORTA}/validacao/pagto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 152011992027
        })
    })

    const dados = await response.json()

    assert.ok(
        ['pending', 'cancelled'].includes(dados.status),
        `Status inesperado: ${dados.status}`
    )

    //console.log(dados.status)
})


//Valida se o validador de pagamentos está ok (Aprovado)
test('Valida se o validador está funcionando, deve retornar aprovado', async ()=> {
    const response = await fetch(`http://localhost:${process.env.PORTA}/validacao/pagto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 152016003201
        })
    })

    const dados = await response.json()

    assert.strictEqual(dados.status, 'approved')

    //console.log(dados.status)
})
