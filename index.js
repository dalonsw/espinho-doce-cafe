document.body.style.overflow = 'hidden';
const entrada = document.querySelector('header')
const botaoPrincipal = document.getElementById('start-button')
const principal = document.querySelector('main')

botaoPrincipal.addEventListener('click', () => {
    principal.scrollIntoView({
        behavior: 'smooth'
    })
    setInterval(() => {
        entrada.remove()
        document.body.style.overflow = 'auto';
    }, 1000)
})