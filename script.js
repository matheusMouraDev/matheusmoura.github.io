// Dados iniciais (salvos no localStorage)
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Função para salvar dados
function saveData() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Função para adicionar projeto
function addProject() {
    const name = document.getElementById('projectName').value;
    const desc = document.getElementById('projectDesc').value;

    if (name) {
        const newProject = {
            id: Date.now(),
            name: name,
            description: desc,
            tasks: [],
            created: new Date().toLocaleDateString()
        };

        projects.push(newProject);
        saveData();
        renderProjects();
        document.getElementById('projectName').value = '';
        document.getElementById('projectDesc').value = '';
    }
}

// Função para renderizar projetos
function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';

    projects.forEach(project => {
        const projectCard = `
            <div class="col-md-4">
                <div class="card project-card">
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.description}</p>
                        <small class="text-muted">Criado em: ${project.created}</small>
                        <hr>
                        
                        <!-- Tarefas -->
                        <div class="tasks mb-3" id="tasks-${project.id}">
                            ${project.tasks.map(task => `
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" ${task.completed ? 'checked' : ''} 
                                        onchange="toggleTask(${project.id}, ${task.id})">
                                    <label class="form-check-label ${task.completed ? 'task-completed' : ''}">
                                        ${task.text}
                                    </label>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Adicionar tarefa -->
                        <div class="input-group mb-3">
                            <input type="text" id="taskInput-${project.id}" class="form-control" placeholder="Nova tarefa">
                            <button class="btn btn-outline-secondary" onclick="addTask(${project.id})">+</button>
                        </div>

                        <!-- Botões de ação -->
                        <button class="btn btn-danger btn-sm" onclick="deleteProject(${project.id})">Excluir Projeto</button>
                    </div>
                </div>
            </div>
        `;

        projectsList.innerHTML += projectCard;
    });
}

// ... (Implemente as funções addTask, toggleTask e deleteProject aqui)
