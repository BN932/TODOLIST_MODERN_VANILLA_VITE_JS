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
    this.getItemsLeftCount();
    this.toggleCompleted();
  }

  getItemsLeftCount(){
    this.domElt.querySelector('.todo-count').innerText = this.todos.filter((todo)=>!todo.completed).length +" item(s) left";
  };

  toggleCompleted(){
    this.domElt.querySelectorAll('.toggle').forEach(checkBox => {checkBox.addEventListener('click', (e) =>{
      e.target.closest('li').classList.toggle('completed');
      const id = e.target.closest('li').dataset.id;
      const index = this.todos.findIndex(todo => {return todo.id === id});
      const Todo = this.todos[index];
      Todo.completed === true ? this.todos[index].completed = false : this.todos[index].completed = true;
      this.getItemsLeftCount();
      const todoProperties = {content: Todo.content, id: Todo.id, completed : Todo.completed, createdAt: Todo.createdAt};
      DB.updateTodo(todoProperties);

    })});
  }

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
    this.getItemsLeftCount();
    this.toggleCompleted();
  }
  delete(data) {
    const todoId = data.id;
    const todo = data.todo.closest('li');
    const todoIndex = this.todos.findIndex((t) => t.id === todoId);
    if (todoIndex) {
      this.todos.splice(todoIndex, 1);
      DB.deleteTodo(todoId);
      todo.remove();
      this.getItemsLeftCount();
    }
  }
  prepareUpdate(item){
    this.todoId = item.id;
    const label = item;
    label.outerHTML = `<input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus
                    onchange="window.TodoListe.update({object: this, value: this.value})"/>`
  }
  update(data){
    //Locate the li, get it's id, get the matching index.
    const todo = data.object.closest('li');
    const todoId = todo.dataset.id;
    const index = this.todos.findIndex((t) => t.id === todoId);
    //Locate the Todo object, update it's value.
    const Todo = this.todos[index];
    Todo.content = data.value;
    //Prepare API update
    const todoProperties = {content: Todo.content, id: Todo.id, completed : Todo.completed, createdAt: Todo.createdAt};
    //Update display
    data.object.outerHTML = `<label class="content" ondblclick="window.TodoListe.prepareUpdate(this)">${data.value}</label>`
    //Update API
    DB.updateTodo(todoProperties);
  }
}