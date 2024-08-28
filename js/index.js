let Tarefas = {
    0: ["Varrer a Casa", "2024-01-01", "Média"],
    1: ["Almoçar com a família", "2024-01-01", "Alta"]
}

function addTarefa(){
     const tarefa = document.getElementById("tarefa").value;
     const data = document.getElementById("data").value;
     const prioridade = document.getElementById("prioridade").value;
     const novoId = Object.keys(Tarefas).length + 1;
     Tarefas[novoId] = [tarefa, data, prioridade];
     alert(Tarefas[novoId]);
}