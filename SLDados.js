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
        qtd: req.body.qtd,
        id: verificaId()
    };

    if (!Array.isArray(dado)) {
        dado = [];
    }
    dado.push(novoProduto);
    salvarDados();

    res.status(201).json(novoProduto);
});

function verificaId(){
    if(dado.length === 0){
        return 1;
    }
    return Math.max(...dado.map(produto => produto.id)) + 1;

}

app.put('/produtos/:id', [
    check('nome').isString().isLength({ min: 2 }).withMessage('O nome deve conter ao mínimo 2 letras').optional(),
    check('preco').isFloat({ gt: 0 }).withMessage('O preço não pode ser negativo').optional(),
    check('qtd').isInt({ min: 1 }).withMessage('O produto deve ter pelo menos 1 unidade').optional()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const id = parseInt(req.params.id);
    const produtoIndex = dado.findIndex(produto => produto.id === id);

    if (produtoIndex === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const produtoAtualizado = {
        ...dado[produtoIndex],
        ...req.body
    };

    dado[produtoIndex] = produtoAtualizado;
    salvarDados();

    res.status(200).json(produtoAtualizado);
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = dado.findIndex(produto => produto.id === id);

    if (produtoIndex === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    dado.splice(produtoIndex, 1);
    salvarDados();

    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
