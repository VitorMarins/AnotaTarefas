document.addEventListener('DOMContentLoaded', () => {
    const formTarefa = document.getElementById('formTarefa');
    const listaTarefa = document.getElementById('listaTarefa');
    const btnSubmit = formTarefa.querySelector('button[type="submit"]');
    const tituloForm = document.getElementById('addTtitulo');
    let editandoId; 
    const cancelarEdicao = () => {
        editandoId = null;
        formTarefa.reset();
        btnSubmit.textContent = "Adicionar Tarefa";
        btnSubmit.classList.remove('btn-success');
        btnSubmit.classList.add('btn-primary');
        tituloForm.textContent = "Adicionar as Tarefas";
    };

    const atualizarTarefas = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tarefa');
            const tarefas = await response.json();
            listaTarefa.innerHTML = '';
            tarefas.forEach(addTarefaDOM);
        } catch (error) { console.error("Erro ao carregar:", error); }
    };

    const addTarefaDOM = (tarefa) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm';
        const dataFormatadaISO = new Date(tarefa.dia).toISOString().split('T')[0];
        li.innerHTML = `
            <div class="text-start">
                <strong>${tarefa.nome}</strong> <br>
                <small class="text-muted">${new Date(tarefa.dia).toLocaleDateString()} - Prioridade: ${tarefa.prioridade}</small>
            </div>
            <div>
                <button class="btn btn-warning btn-sm me-2 btn-editar">Editar</button>
                <button class="btn btn-danger btn-sm btn-deletar">Deletar</button>
            </div>
        `;
        li.querySelector('.btn-deletar').onclick = async () => {
            if (confirm("Deseja realmente excluir esta tarefa?")) {
                await fetch(`http://localhost:3000/api/tarefa/${tarefa._id}`, { method: 'DELETE' });
                if (editandoId === tarefa._id) {
                    cancelarEdicao();
                }
                atualizarTarefas();
            }
        };
        li.querySelector('.btn-editar').onclick = () => {
            document.getElementById('nomeTarefa').value = tarefa.nome;
            document.getElementById('dataTarefa').value = dataFormatadaISO;
            document.getElementById('prioridadeTarefa').value = tarefa.prioridade;
            
            editandoId = tarefa._id;
            btnSubmit.textContent = "Salvar Alterações";
            btnSubmit.classList.replace('btn-primary', 'btn-success');
            tituloForm.textContent = "Editando Tarefa";
            tituloForm.scrollIntoView({ behavior: 'smooth' });
        };
        listaTarefa.appendChild(li);
    };

    formTarefa.onsubmit = async (e) => {
        e.preventDefault();
        const dadosTarefa = {
            nome: document.getElementById('nomeTarefa').value,
            dia: document.getElementById('dataTarefa').value,
            prioridade: document.getElementById('prioridadeTarefa').value
        };
        try {
            if (editandoId) {
                await fetch(`http://localhost:3000/api/tarefa/${editandoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosTarefa)
                });
            } else {
                await fetch('http://localhost:3000/api/tarefa', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosTarefa)
                });
            }
            cancelarEdicao();
            atualizarTarefas();
        } catch (error) {
            alert("Erro ao processar tarefa.");
        }
    };
    atualizarTarefas();
});

// Service Worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
        if (reg.waiting) {
            exibirToastAtualizacao(reg.waiting);
        }
        reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    exibirToastAtualizacao(newWorker);
                }
            });
        });
    });
}
function exibirToastAtualizacao(worker) {
    const toastEl = document.getElementById('updateToast');
    const toast = new bootstrap.Toast(toastEl, { autohide: false });
    toast.show();
    document.getElementById('reloadApp').addEventListener('click', () => {
        worker.postMessage({ action: 'skipWaiting' });
        window.location.reload();
    });
}