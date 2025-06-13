// Variáveis do DOM
const entrada = document.querySelector('header')
const botaoPrincipal = document.getElementById('start-button')
const principal = document.querySelector('main')


// Função para remover a tela de entrada
document.addEventListener('scroll', () => {
    principal.scrollIntoView({
        behavior: 'smooth'
    })
    setInterval(() => {
        entrada.remove()
        document.body.style.overflow = 'auto';
    }, 500)
})

// Variaveis de Usuário
const usuarioNome = document.getElementById('esta-logado')

// Função para buscar usuário logado
async function buscarUsuario() {
    try {
        const response = await fetch(`http://localhost:8080/usuarios/alice@gmail.com`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
        console.error('Erro ao buscar usuário:', response.statusText);
        return;
        }

        const usuario = await response.json();
        return usuario || null;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

const usuarioLogado = await buscarUsuario();

if (usuarioLogado) {
    usuarioNome.textContent = `Olá ${usuarioLogado.primeiro_nome}! :)`;
}