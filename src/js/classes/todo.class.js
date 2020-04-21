export class Todo {
    
    static fromJson({tarea, id, completado, fechaCreado}) {
        const temporalTodo = new Todo(tarea);

        temporalTodo.id          = id; 
        temporalTodo.completado  = completado;
        temporalTodo.fechaCreado = fechaCreado;

        return temporalTodo;
    }

    constructor(tarea){
        this.tarea = tarea;
        this.id    = new Date().getTime();
        this.completado  = false;
        this.fechaCreado = new Date();
    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);
    }
}