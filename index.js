const entrada = document.querySelector('header')
const botaoPrincipal = document.getElementById('start-button')
const principal = document.querySelector('main')

document.addEventListener('scroll', () => {
    principal.scrollIntoView({
        behavior: 'smooth'
    })
    setInterval(() => {
        entrada.remove()
        document.body.style.overflow = 'auto';
    }, 500)
})