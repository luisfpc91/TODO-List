import { Todo, TodoList } from "./classes";
import { todoList } from '../index.js'; 

//Referencias en HTML
const divTodoList          = document.querySelector('.todo-list');
const inputNewTodo         = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros            = document.querySelector('.filters'); 
const filtros              = document.querySelectorAll('.filtro');
const spanPendientes      = document.querySelector('.todo-count');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    /**
     * Se crea un elemento "div" en lugar de un "li" por que ya tenemos el "li" creado
     * con sus atributos, por lo que no hace falta crearlo de nuevo, es mejor crear 
     * el div para contener el "li".
     * 
     * Ya con el "li" con sus atributos dentro del "div" como no lo necesitamos a el realmente
     * al instroducirlo en la lista le colocamos el metodo ".firstElementChild" el cual
     * nos extraera el "li" que está dentro del div.
     */
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    
    return div.firstElementChild;
}

export const contadorPendientes = (count) => {
    const numeroPendientes = spanPendientes.firstElementChild;
    numeroPendientes.innerHTML = count;
}

//Eventos
inputNewTodo.addEventListener('keyup', (event) => {
    /**
     * - Se valida que la tecla presionada sea enter (13) 
     * - Se valida que el el valor del input sea mayor a 0
     * - Se instancia el todo y se le enviar la nueva tarea
     * - Se importa la instancia del todo que se creo en el index
     *   y se le manda el nuevo todo
     * - Se muentra en el HTML
     * - Se vacia el valor del input
     */
    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        // console.log(event);
        // console.log(inputNewTodo.value);
        const nuevoTodo = new Todo(inputNewTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        inputNewTodo.value = '';
        // console.log(todoList);

        contadorPendientes(todoList.contadorPendientes());
    }
});

//Evento lista
divTodoList.addEventListener('click', (event) => {
    //Se trae el nombre del elemento al que se le hace click
    const nombreElemento = event.target.localName;
    //Se obtiene el li donde se ecuentra el elemento
    const todoLi = event.target.parentElement.parentElement;
    //Se obtiene el id del li
    const todoId = todoLi.getAttribute('data-id');
    
    //Se valida si se hizo click en el check del TODO
    if(nombreElemento.includes('input')) { 
        todoList.marcarTodo(todoId);
        todoLi.classList.toggle('completed');
        contadorPendientes(todoList.contadorPendientes());
    
    //Evento eliminar un TODO
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoLi);
        contadorPendientes(todoList.contadorPendientes());
    }
    // console.log(todoList);
});

//Eventos borrar completados
btnBorrarCompletados.addEventListener('click', () => {
    if (todoList.todos.length > 0) {
       todoList.eliminarCompletados();
       
        for (let i = divTodoList.children.length - 1; i >= 0; i--) {
            const todo = divTodoList.children[i];
            
            if(todo.classList.contains('completed')) {
                divTodoList.removeChild(todo);
            }
        };
        contadorPendientes(todoList.contadorPendientes());
    }
});

//Eventos Filtros
ulFiltros.addEventListener('click', (event) => {
    //Se obtiene el texto del filtro actul.
    const filtroNombre = event.target.text;
    //Se valida que no acepte algo "null,undefined"
    if (!filtroNombre) return; 

    //Se le borra la clase "selected" a todos los filtros
    filtros.forEach(element => element.classList.remove('selected'));
    //Se obtine el elemento del filtro actual.
    const filtroActual = event.target;
    //Se le agrega la clases "selected" al filtro actual.
    filtroActual.classList.add('selected');

    for(const todo of divTodoList.children) {
        //Se le quita al todo la clase "hidden"
        todo.classList.remove('hidden');
        
        //Se quiere saber si el todo actual tiene la clase "completed"
        const completado = todo.classList.contains('completed');

        switch (filtroNombre) {
            case 'Pendientes':
                if (completado)
                    todo.classList.add('hidden');
            break;
            case 'Completados':
                if (!completado)
                    todo.classList.add('hidden');
            break;
        }
    }
});