import './style.css';
import DB from '../../DB.js';
import Todo from '../todos/Todos.js';
import getTodolistTemplate from './template.js';

export default class Todolist {
  constructor(data) {
    this.domElt = document.querySelector(data.elt);
    DB.setapiURL(data.apiURL);
    this.todos = [];
    this.loadTodos();
  }
  async loadTodos() {
    const todosData = await DB.findAll();
    this.todos = todosData.map((todo) => new Todo(todo));
    this.render();
  }
  render() {
    this.domElt.innerHTML = getTodolistTemplate(this);
  }

  getItemsLeftCount(){
    return this.todos.filter((todo)=>!todo.completed).length;
  };

  async addTodo(data) {
    const todoDB = await DB.createNewTodo(data.value);
    const item = data;
    const newTodo = new Todo(todoDB);
    this.todos.push(newTodo);
    const todoListElt = this.domElt.querySelector('[role=todo-list]');
    const newLi = document.createElement('div');
    todoListElt.append(newLi);
    newLi.outerHTML = newTodo.render();
    item.value='';
  }
  delete(data) {
    const todoId = data.id;
    const todo = data.todo.closest('li');
    const todoIndex = this.todos.findIndex((t) => t.id === todoId);
    if (todoIndex) {
      this.todos.splice(todoIndex, 1);
      DB.deleteTodo(todoId);
      todo.remove();
    }
  }
  prepareUpdate(item){
    this.todoId = item.id;
    const label = item;
    label.outerHTML = `<input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus
                    onchange="window.TodoListe.update(this)"/>`
  }
  update(task){
    //Locate the li, get it's id, get the matching index.
    const todo = task.closest('li');
    const todoId = todo.dataset.id;
    const index = this.todos.findIndex((t) => t.id === todoId);
    //Locate the Todo object, update it's value.
    const object = this.todos[index];
    object.content = task.value;
    //Prepare API update
    const todoProperties = {content: object.content, id: object.id, completed : object.completed, createdAt: object.createdAt};
    //Update display
    task.outerHTML = `<label class="content" ondblclick="window.TodoListe.prepareUpdate(this)">${task.value}</label>`
    //Update API
    DB.updateTodo(todoProperties);
  }
}