const usuario = JSON.parse(localStorage.getItem('usuario'));
const clienteNome = document.getElementById('cliente-nome');
const clienteEndereco = document.getElementById('cliente-endereco');
const clienteTelefone = document.getElementById('cliente-telefone');

async function imprimirPedido() {
    const response = await fetch('http://localhost:8080/usuarios/alice@gmail.com', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.error('Erro ao imprimir pedido:', response.statusText);
        return;
    }

    const data = await response.json();
    return data;
}

const dados = await imprimirPedido()

clienteNome.textContent = dados.primeiro_nome + ' ' + dados.segundo_nome;
clienteTelefone.textContent = dados.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
