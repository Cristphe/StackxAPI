const fs = require('fs');
const dados = './data.json';
const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

let dado = [];

try {
    const lerDados = fs.readFileSync(dados);

    dado = JSON.parse(lerDados);
    
    if (!Array.isArray(dado)) {
        console.warn('O conteúdo de data.json não é um array. Inicializando como array vazio.');
        dado = [];
    }
} catch (error) {
    console.error('Erro ao ler os dados: ', error);

    dado = [];
    fs.writeFileSync(dados, JSON.stringify(dado, null, 2));
}

function salvarDados() {
    try {
        fs.writeFileSync(dados, JSON.stringify(dado, null, 2));
    } catch (error) {
        console.log('Erro ao salvar dados: ', error);
    }
}

app.get('/produtos', (req, res) => {
    res.status(200).json(dado);
});

app.post('/produtos', [
    check('nome').isString().isLength({ min: 2 }).withMessage('O nome deve conter ao mínimo 2 letras'),
    check('preco').isFloat({ gt: 0 }).withMessage('O preço não pode ser negativo'),
    check('qtd').isInt({ min: 1 }).withMessage('O produto deve ter pelo menos 1 unidade')
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const novoProduto = {
        nome: req.body.nome,
        preco: req.body.preco,
        qtd: req.body.qtd
    };

    if (!Array.isArray(dado)) {
        dado = [];
    }
    dado.push(novoProduto);
    salvarDados();

    res.status(201).json(novoProduto);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
