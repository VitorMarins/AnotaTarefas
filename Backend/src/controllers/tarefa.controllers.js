const Tarefa = require('../models/Tarefa');

const createTarefa = async (req, res) => {
    try {
        const { nome, dia, prioridade } = req.body;
        const newTarefa = new Tarefa({ nome, dia, prioridade });
        await newTarefa.save();
        res.json(newTarefa);
    } catch(err) {
        console.error("Erro ao criar Tarefa: " + err);
    };
};

const getTarefas = async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.json(tarefas);
    } catch(err) {
        console.error("Erro ao buscar as Tarefas: " + err)
    }
}

const getTarefabyId = async (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = await Tarefa.find({ _id: id });
        res.json(tarefa);
    } catch(err) {
        console.error("Erro ao buscar a Tarefa: " + err)
    };
};

const putTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, dia, prioridade } = req.body;
        const updatedTarefa = await Tarefa.findByIdAndUpdate(id, { nome, dia, prioridade }, { new: true });
        res.json(updatedTarefa);
    } catch(err) {
        console.error("Erro ao editar a Tarefa: " + err);
    };
};

const deleteTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        await Tarefa.findByIdAndDelete(id);
        res.json({ message: 'Tarefa deletada com sucesso!' });
    } catch(err) {
        console.error("Erro ao Deletar a Tarefa: " + err);
    };
};

module.exports = { createTarefa, getTarefas, getTarefabyId, putTarefa, deleteTarefa };