const login = document.getElementById('login-form');

login.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, senha: password }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('error-message').textContent = errorData.message || 'Erro ao fazer login';
            return;
        }

        
        const data = await response.json();
        console.log(data)
        localStorage.setItem('usuario', JSON.stringify(data));
        window.location.href = '/front-end/index.html';
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        document.getElementById('error-message').textContent = 'Erro ao fazer login. Tente novamente.';
    }
});