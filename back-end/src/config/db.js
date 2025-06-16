// Configuração e inicialização do banco de dados
const sqlite3 = require('sqlite3')
const banco = 'back-end/src/database/cafeteria.db'
const db = new sqlite3.Database(banco, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("A conexão com banco de dados foi estabelecida")
    }
});


// Criar tabelas no banco de dados
const criarTabelas = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        primeiro_nome TEXT NOT NULL,
        sobrenome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT NOT NULL UNIQUE,
        data_nascimento TEXT NOT NULL,
        senha TEXT NOT NULL,
        imagem TEXT,
        data_criacao TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL
        )
    `) 
    db.run(`
        CREATE TABLE IF NOT EXISTS itens(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        preco INTEGER NOT NULL,
        descricao TEXT NOT NULL,
        imagem TEXT NOT NULL,
        categoria TEXT NOT NULL
        )
    `) 
    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_carrinho INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        data_pedido TEXT NOT NULL,
        valor_total INTEGER NOT NULL,
        FOREIGN KEY (id_carrinho) REFERENCES carrinhos(id)
        )
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS pagamentos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pedido INTEGER NOT NULL,
        metodo_pagamento TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pendente',
        data_pagamento TEXT NOT NULL,
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id)
        )
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS enderecos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rua TEXT NOT NULL,
        numero TEXT NOT NULL,
        bairro TEXT NOT NULL,
        referencia TEXT,
        latitude REAL,
        longitude REAL
        )
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS endereco_usuario (
        id_usuario INTEGER NOT NULL,
        id_endereco INTEGER NOT NULL,
        PRIMARY KEY (id_usuario, id_endereco),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        FOREIGN KEY (id_endereco) REFERENCES enderecos(id)
    )
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS carrinhos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        data_criacao TEXT DEFAULT (CURRENT_TIMESTAMP),
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        );
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS itens_carrinho (
        id_carrinho INTEGER NOT NULL,
        id_item INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        PRIMARY KEY (id_carrinho, id_item),
        FOREIGN KEY (id_carrinho) REFERENCES carrinhos(id),
        FOREIGN KEY (id_item) REFERENCES itens(id)
        );
    `)
} 

// Abrir conexão com o banco de dados e criar tabelas
const abrirConexao = () => {
    db.serialize(() => {
        criarTabelas();
    });
}


// Fechar conexão com o banco de dados
const fecharConexao = () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados fechada.');
        }
    });
}

module.exports = {
    abrirConexao,
    fecharConexao
}