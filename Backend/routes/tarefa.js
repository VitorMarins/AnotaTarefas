const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

// Criar uma tarefa
router.post('/', async (req, res) => {
    const { nome, dia, prioridade } = req.body;
    const newTarefa = new Tarefa({ nome, dia, prioridade });
    await newTarefa.save();
    res.json(newTarefa);
});

// Listar todas as tarefas
router.get('/', async (req, res) => {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
});

// Atualizar uma Tarefa
router.put('/:id', async (req, res) => {
    const { nome, dia, prioridade } = req.body;
    const updatedTarefa = await Tarefa.findByIdAndUpdate(req.params.id, { nome, dia, prioridade }, { new: true });
    res.json(updatedTarefa);
});

// Deletar uma Tarefa
router.delete('/:id', async (req, res) => {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarefa deletada com sucesso!' });
});

module.exports = router;
