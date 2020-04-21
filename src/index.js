import './styles.css';
import {Todo, TodoList} from './js/classes/index.js';
import {crearTodoHtml} from './js/componentes.js';

export const todoList = new TodoList();
// const tarea    = new Todo('Aprender JS');
// todoList.nuevoTodo(tarea);
// console.log(todoList);
// crearTodoHtml(tarea); 

/** 
 * Esté llamado se puede reducir de la siguiente manera:
 * --todoList.todos.forEach(crearTodoHtml);--
 * estó funciona porque el forEach devuelve un unico elemento todo
 * entonces JS entiende queremos llamar a la función enviando ese
 * elemento. Si fueran 2 elementos ya no funcionaria.
 */
todoList.todos.forEach(todo => crearTodoHtml(todo));


/**
 * Local Storage: Almacena información en el obejto storage de forma 
 * indefinica o hasta que se decida limpiar los datos del navegador.
 * 
 * Session Storage: Almacena información mientras la pestaña donde se esté 
 * utilizando siga abierta, una vez cerrada, la información se elimina.
 *
 * Se tiene un Storage por dominio.
 */

//localStorage.setItem('llave', 'valor');
//sessionStorage.setItem('llave', 'valor');
//localStorage.removeItem('llave');

