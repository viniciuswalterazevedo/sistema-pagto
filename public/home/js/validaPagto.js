function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const statusPagto = document.getElementById('statusPagto')

async function validaPagto(id) {
    try {
        let status = 'pending'

        while(status === 'pending'){

            const response = await fetch('/validacao/pagto', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            })

            if(response.status !== 200){
                statusPagto.innerText = "Erro ao validar pagamento"
                statusPagto.dataset.state = "error"
                return
            }

            const dados = await response.json()

            if(dados.status === 'approved'){
                statusPagto.innerText = "Pagamento aprovado"
                statusPagto.dataset.state = "approved"
            }

            if(dados.status === 'pending'){
                statusPagto.innerText = "Pagamento pendente"
                statusPagto.dataset.state = "pending"
            }

            if(dados.status === 'cancelled'){
                statusPagto.innerText = "Pagamento nao concluido"
                statusPagto.dataset.state = "cancelled"
            }

            status = dados.status

            if(status === 'pending'){
                await delay(5000)
            }
        }
    } catch (error) {
        statusPagto.innerText = "Erro ao validar pagamento"
        statusPagto.dataset.state = "error"
    }
}
