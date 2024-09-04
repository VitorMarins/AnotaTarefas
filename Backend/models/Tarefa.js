const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dia: {
        type: Date,
        required: true,
        default: Date.now
    },
    prioridade: {
        type: String,
        enum: ['alta', 'media', 'baixa'],
        required: true,
        default: 'baixa'
    }
});

module.exports = mongoose.model('Tarefa', tarefaSchema);