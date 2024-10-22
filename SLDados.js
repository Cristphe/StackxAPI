const fs = require('fs');
const dados = './data.json'
const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(express.json());


let data = [];

try{
    const lerDados = fs.readFileSync(dados);
    data = JSON.parse(lerDados);
}catch (error){
    console.error('Erro ao ler os dados: ', error)
}

function salvarDados(){
    try{
        fs.writeFileSync(dados, JSON.stringify(data, null, 2));
    } catch(error){
        console.log('Erro ao salvar dados: ', error);
    }
}

app.get('/produtos', (req, res) => {
    res.status(200).json(data);
});

app.post('/produtos', [
    check('nome').isString().isLength({ min: 2}).withMessage('O nome deve conter ao minimo 2 letras'),
    check('preco').isFloat({ gt: 0 }).withMessage('O preço não pode ser negativo'),
    check('qtd').isInt({ min: 0}).withMessage('O produto tem que ter mais 1 quantidade')
], (req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() });
    }

    const novoProduto = {
        nome: req.body.nome,
        preco: req.body.preco,
        qtd: req.body.qtd
    }

    data.push(novoProduto);
    salvarDados();

    res.status(201).json(novoProduto);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});