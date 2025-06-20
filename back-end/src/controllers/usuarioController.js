// Configuração do banco de dados
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('back-end/src/database/cafeteria.db');

//Usuarios
// Criar usuario
function criarUsuario(usuario, callback) {
    const { primeiro_nome, sobrenome, telefone, email, data_nascimento, senha } = usuario;
    const imagem = ['./images/user-image1.png', './images/user-image2.png'][Math.floor(Math.random() * 2)];
    const insert = `
        INSERT INTO usuarios (primeiro_nome, sobrenome, telefone, email, senha, data_nascimento, imagem)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(insert, [primeiro_nome, sobrenome, telefone, email, senha, data_nascimento, imagem], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// Buscar usuário por email e senha
function buscarUsuarioPorEmailESenha(email, senha, callback) {
    const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
    db.get(sql, [email, senha], (err, row) => {
        callback(err, row);
    });
}

function buscarUsuarioPorEmail(email, callback) {
    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        callback(err, row);
    });
}


// Listar todos os usuários
function listarUsuarios(callback) {
    db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
        callback(err, rows);
    });
}

//Endereços
// Criar endereço
function criarEndereco(endereco, callback) {
    const { rua, numero, complemento, bairro, cidade, estado, cep, id_usuario } = endereco;
    const insert = `
        INSERT INTO enderecos (rua, numero, complemento, bairro, cidade, estado, cep, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(insert, [rua, numero, complemento, bairro, cidade, estado, cep, id_usuario], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// Listar todos os endereços
function listarEnderecos(callback) {
    db.all(`SELECT * FROM enderecos`, [], (err, rows) => {
        callback(err, rows);
    });
}

// Buscar endereços por ID
function buscarEnderecoPorId(id, callback) {
    const sql = `SELECT * FROM enderecos WHERE id= ?`;
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
}

// Atualizar endereço
function atualizarEndereco(id, endereco, callback) {
    const { rua, numero, complemento, bairro, cidade, estado, cep } = endereco;
    const update = `
        UPDATE enderecos
        SET rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, cep = ?
        WHERE id = ?
    `;
    db.run(update, [rua, numero, complemento, bairro, cidade, estado, cep, id], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// Deletar endereço
function deletarEndereco(id, callback) {
    const sql = `DELETE FROM enderecos WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// Atribuir endereço a um usuário
function atribuirEnderecoAUsuario(id_usuario, id_endereco, callback) {
    const sql = `INSERT INTO endereco_usuario (id_usuario, id_endereco) VALUES (?, ?)`;
    db.run(sql, [id_usuario, id_endereco], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// Remover endereço de um usuário
function removerEnderecoDeUsuario(id_usuario, id_endereco, callback) {
    const sql = `DELETE FROM endereco_usuario WHERE id_usuario = ? AND id_endereco = ?`;
    db.run(sql, [id_usuario, id_endereco], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}

// Listar usuários com seus endereços
function listarUsuariosComEndereco(callback) {
    const sql = `
        SELECT e.*, u.primeiro_nome, u.segundo_nome, u.email
        FROM enderecos e
        JOIN endereco_usuario eu ON e.id = eu.id_endereco
        JOIN usuarios u ON eu.id_usuario = u.id
    `;
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}

module.exports = {
    criarUsuario,
    buscarUsuarioPorEmailESenha,
    buscarUsuarioPorEmail,
    listarUsuarios,
    criarEndereco,
    listarEnderecos,
    buscarEnderecoPorId,
    atualizarEndereco,
    deletarEndereco,
    atribuirEnderecoAUsuario,
    removerEnderecoDeUsuario,
    listarUsuariosComEndereco
    
};