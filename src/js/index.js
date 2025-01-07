class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    editTodo(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project extends Todo {
    constructor(name) {
        this.name = name;
    }

    #
    todoStorage = []

    addTodo(title, description, dueDate, priority) {}
}