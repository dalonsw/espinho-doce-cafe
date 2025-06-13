const cors = require('cors');
const express = require('express')
const app = express()
const PORT = 8080

const db = require('./src/config/db')
db.abrirConexao()

app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

//Usuarios
const usuarioController = require('./src/controllers/usuarioController')

// Cadastro de Usuários
app.post('/usuarios', (req, res) => {
    const { primeiro_nome, sobrenome, telefone, email, senha, data_nascimento } = req.body;
    const usuario = { primeiro_nome, sobrenome, telefone, email, senha, data_nascimento};
    console.log(req.body)
    usuarioController.criarUsuario(usuario, (err) => {
        if (err) {
            console.log(err.message)
            return res.status(500).json({ error: err.message})
        }
        res.status(201).json({ message: 'Usuário criado com sucesso'})
    })
})

app.get('/usuarios', (req, res) => {
    usuarioController.listarUsuarios((err, usuarios) => {
        if (err) {
                return res.status(500).json({ error: 'Erro ao listar usuários' })
            }
        res.status(200).json(usuarios)
    })
})

// Login
app.post('/login', (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    usuarioController.buscarUsuarioPorEmailESenha(email, senha, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' })
        }
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        res.status(200).json(usuario)
    })
})


//Endereços
app.post('/endereco', (req, res) => {
    res.send("API funcionando")
})

//Produtos
app.post('/produto', (req, res) => {
    res.send("API funcionando")
})

//Pedidos
app.post('/pedido', (req, res) => {
    res.send("API funcionando")
})

app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`)
})