import DB from '../../DB.js';
import Todo from '../todos/Todos.js';
import getTodolistTemplate from './template.js';
export default class Todolist {
    constructor (data) {
        this.domElt = document.querySelector(data.elt);
        DB.setapiURL(data.apiURL);
        this.todos = [];
        this.loadTodos();
    };
    async loadTodos() {
    const todosData = await DB.findAll();
    this.todos = todosData.map((todoData) => new Todo(todoData));
    this.render();
}
    render(){
        console.table(this.todos);
        this.domElt.innerHTML = getTodolistTemplate(this);
            
    };


;}

