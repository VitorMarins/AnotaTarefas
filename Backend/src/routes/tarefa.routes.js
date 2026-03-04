const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefa.controllers');

// Criar uma tarefa
router.post('/', TarefaController.createTarefa);

// Listar todas as tarefas
router.get('/', TarefaController.getTarefas);

router.get('/:id', TarefaController.getTarefabyId);

// Atualizar uma Tarefa
router.put('/:id', TarefaController.putTarefa);

// Deletar uma Tarefa
router.delete('/:id', TarefaController.deleteTarefa);

module.exports = router;
