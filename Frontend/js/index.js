document.addEventListener('DOMContentLoaded', () => {
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefa = document.getElementById('listaTarefa');

    // Função para carregar as tarefas da API
    const atualizarTarefas = async () => {
        listaTarefa.innerHTML = '';
        const response = await fetch('http://localhost:3000/api/tarefa');
        const tarefas = await response.json();
        tarefas.forEach(tarefa => {
            addTarefaDOM(tarefa);
        });
    };

    // Função para adicionar uma tarefa ao DOM
    const addTarefaDOM = (tarefa) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarefa.nome} - ${new Date(tarefa.dia).toLocaleDateString()} - ${tarefa.prioridade}</span>
            <button id="delete" class="btn btn-danger" data-id="${tarefa._id}">Deletar</button>
        `;
        listaTarefa.appendChild(li);

        // Evento para deletar a tarefa
        li.querySelector('#delete').addEventListener('click', async (e) => {
            const taskId = e.target.getAttribute('data-id');
            await fetch(`http://localhost:3000/api/tarefa/${taskId}`, {
                method: 'DELETE'
            });
            atualizarTarefas();
        });
    };

    // Evento para adicionar uma nova tarefa
    formTarefa.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newTask = {
            nome: document.getElementById('nomeTarefa').value,
            dia: document.getElementById('dataTarefa').value,
            prioridade: document.getElementById('prioridadeTarefa').value
        };

        const response = await fetch('http://localhost:3000/api/tarefa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const tarefa = await response.json();
        addTarefaDOM(tarefa);

        formTarefa.reset();
    });

    // Carregar tarefas ao iniciar a aplicação
    atualizarTarefas();
});
