async function gerarPagto() {

    const email = document.getElementById('email').value
    const informativo = document.getElementById('informativo')
    const codigo = document.getElementById('codigo')
    const qrcode = document.getElementById('qrcode')
    const statusPagto = document.getElementById('statusPagto')

    if(email === ""){
        informativo.innerText = "Preencha o campo de e-mail."
        informativo.dataset.state = "error"
        return
    }

    informativo.innerText = "Gerando pagamento..."
    informativo.dataset.state = "loading"
    statusPagto.innerText = "Pagamento pendente"
    statusPagto.dataset.state = "pending"
    codigo.innerText = ""
    qrcode.innerHTML = ""

    const response = await fetch('/pagamento/checkout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            valor: 0.20,
            descricao: "Pedido de Teste",
            email: email
        })
    })

    if(response.status != 200){
        informativo.innerText = "Erro ao gerar o pagamento."
        informativo.dataset.state = "error"
        statusPagto.innerText = "Falha ao iniciar pagamento"
        statusPagto.dataset.state = "error"
        return
    }

    const dados = await response.json()

    new QRCode(qrcode, {
        text: dados.qr_code,
        width: 200,
        height: 200
    })

    informativo.innerText = `Pagamento gerado com sucesso. ID: ${dados.id}`
    informativo.dataset.state = "success"
    codigo.innerText = dados.qr_code

    validaPagto(dados.id)

}
