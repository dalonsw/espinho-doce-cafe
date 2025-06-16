const cadastro = document.getElementById('cadastro-form');

cadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const primeiroNome = document.getElementById('primeiro-nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value; 
    const dataNascimento = document.getElementById('data-nascimento').value;

    try {
        const response = await fetch('http://localhost:8080/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ primeiro_nome: primeiroNome, sobrenome, telefone, email, senha, data_nascimento: dataNascimento }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('error-message').textContent = errorData.message || 'Erro ao cadastrar';
            return;
        }

        const data = await response.json();
        localStorage.setItem('usuario', JSON.stringify(data));
        window.location.href = './login.html';
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        document.getElementById('error-message').textContent = 'Erro ao cadastrar. Tente novamente.';
    }
})