import { Todo } from "./todo.class.js";

export class TodoList {
    constructor() {
        // this.todos = [];
        this.cargarSessionStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarSessionStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarSessionStorage();
    }

    marcarTodo(id) {
        for(const todo of this.todos) {

            if(todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarSessionStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarSessionStorage();
    }

    guardarSessionStorage() {
        sessionStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarSessionStorage() {
        this.todos = (sessionStorage.getItem('todo')) 
                    ? JSON.parse(sessionStorage.getItem('todo'))
                    : [];  

        this.todos = this.todos.map(Todo.fromJson);

        console.log(this.todos);
    }
}