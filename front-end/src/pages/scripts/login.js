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
        localStorage.setItem('usuario', JSON.stringify(data));
        window.location.href = '/front-end/index.html';
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        document.getElementById('error-message').textContent = 'Erro ao fazer login. Tente novamente.';
    }
});

// Mostrar/ocultar senha
const togglePassword = document.getElementById('toggle-password');
togglePassword.addEventListener('click', () => {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    togglePassword.innerHTML = type === 'password' ? '<img src="../images/icons/hide.png">' : '<img src="../images/icons/view.png">';
});