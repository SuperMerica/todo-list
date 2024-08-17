class Project {
    static idCounter = 0;
  
    constructor(title, description, startDate, endDate, priority) {
      this.id = Project.idCounter++; 
      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
      this.priority = priority;
    }
  }
  
  class ProjectManager {
    constructor() {
      this.projects = [];
    }

    addProject(project) {
      this.projects.push(project);
    }
  
    deleteProjectById(id) {
      this.projects = this.projects.filter(project => project.id !== id);
    }
  
    findProjectById(id) {
      return this.projects.find(project => project.id === id);
    }
  
    updateProjectTitle(id, newTitle) {
      const project = this.findProjectById(id);
      if (project) {
        project.title = newTitle;
      }
    }

    updateProjectDescription(id, newDescription) {
        const project = this.findProjectById(id);
        if (project) {
          project.description = newDescription;
        }
      }

    updateProjectStartDate(id,newStartDate) {
        const project = this.findProjectById(id);
        if (project) {
            project.date = newStartDate;
        }
    }

    updateProjectEndDate(id,newEndDate) {
        const project = this.findProjectById(id);
        if (project) {
            project.endDate = newEndDate;
        }
    }

    updateProjectPriority(id,newPriority) {
      const project = this.findProjectById(id);
      if (project) {
          project.priority = newPriority;
      }
   }
    getProjects() { 
      return this.projects
    }
  }

class Todo {
    static idCounter = 0;
  
    constructor(description) {
      this.id = Todo.idCounter++; 
      this.description = description;
    }
  }

class TodoManager {
  constructor() {
    this.todos = [];
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  removeTodo(id) {
    this.todos.filter(todo => todo.id !== id);
  }
}

class DOMManipulation {
  constructor() {
    this.addProjectBtn = document.getElementById('add-project');
    this.userProjectTitle = document.getElementById('project-title');
    this.userProjectDescription = document.getElementById('project-description');
    this.userProjectStartDate = document.getElementById('start-date');
    this.userProjectEndDate = document.getElementById('due-date');
    this.userLevelOfPriority = document.getElementById('priority');
    this.projectContainer = document.getElementById('project-container');

    this.todoModal = document.getElementById('todoModal');
    this.todoInput = document.getElementById('todoInput');
    this.addTodoButton = document.getElementById('addTodoButton');
    this.closeTodoModalBtn = document.getElementById('todoModalClose');


    this.projectManager = new ProjectManager();
    this.todoManager = new TodoManager();
    this.setupEventListeners()

  }

  displayProjects() {
    this.projectContainer.innerHTML = '';
    const projects = this.projectManager.getProjects()

    projects.forEach(project => {
      this.projectContainer.innerHTML += `
            <div class="project" data-id=${project.id}>
            <h2 class="project-title">${project.title}</h2>
            <p class="project-description">${project.description}</p>
            <p class="project-dates">
              <span class="start-date">${project.startDate}</span> | 
              <span class="due-date">${project.endDate}</span>
            </p>
            <div class="todo-list">
                <button class="add-todo">Add todo</button>
            </div>
            <p class="project-priority">Priority: <span class="priority-level">${project.priority}</span></p>
            <button class="complete-btn">Complete</button>
            <button class="remove-btn">Remove</button>
        </div>
      `
      this.projectContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          this.removeProject(e);
        })});

      this.projectContainer.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener("click", (e) => {
          this.completeProject(e);
        })});

      this.projectContainer.querySelectorAll('.add-todo').forEach(button => {
        button.addEventListener("click", (e) => {
          const currentProjectElement = e.target.closest('.project');
          this.showModal(currentProjectElement);
        })});
      
    })}

    createAndAddProject() {
    const projectTitle = this.userProjectTitle.value;
    const projectDescription = this.userProjectDescription.value;
    const startDate = this.userProjectStartDate.value;
    const endDate = this.userProjectEndDate.value;
    const priority = this.userLevelOfPriority.value;

    const newProject = new Project(projectTitle,projectDescription,startDate,endDate,priority)
    this.projectManager.addProject(newProject);
    this.displayProjects();
    }

    removeProject(e) {
      const projectElement = e.target.closest('.project');
      const projectId = parseInt(projectElement.getAttribute('data-id'), 10);
    
      this.projectManager.deleteProjectById(projectId);
      projectElement.remove();
    }

    completeProject(e) {
      const projectElement = e.target.closest('.project');
      projectElement.classList.add('complete');
    }

    showModal(currentProjectElement) {
      this.currentProjectElement = currentProjectElement;
      this.todoModal.style.display = "block";
    }

    closeModal() {
      this.todoModal.style.display = "none";
      this.todoInput.value = "";
    }

    addTodo() {
      const todoText = this.todoInput.value;
      const todoContainer = this.currentProjectElement.querySelector('.todo-list');

      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
    
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('todo-checkbox'); 
    
      const todoTextSpan = document.createElement('span');
      todoTextSpan.textContent = todoText;
    
  
      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoTextSpan);
      todoContainer.appendChild(todoItem);
    
      checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
          todoTextSpan.style.textDecoration = 'line-through';
        } else {
          todoTextSpan.style.textDecoration = 'none';
        }
      });
    
    }

    setupEventListeners() {
      this.addProjectBtn.addEventListener('click', () => {
        this.createAndAddProject();
      });
      this.closeTodoModalBtn.addEventListener('click', () => {
        this.closeModal();
      });
      this.addTodoButton.addEventListener('click', () => {
        this.addTodo();
      })
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const DomMan = new DOMManipulation();
});