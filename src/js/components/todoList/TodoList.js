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
  async addTodo(content) {
    const todoDB = await DB.createNewTodo(content);
    this.todos.push(new Todo(todoDB));
    this.render();
  }
  delete(id) {
    const todoId = id;
    const todoIndex = this.todos.findIndex((t) => t.id === todoId);
    if (todoIndex) {
      this.todos.splice(todoIndex, 1);
      DB.deleteTodo(todoId);
      this.render();
    }
  }
  update(info){
    const todoId = Number(info.id);
    const todoContent = info.content;
    const todoIndex = Number(this.todos.findIndex((t) => t.id === todoId));
    if (todoIndex) {
      this.todos[todoIndex].content = todoContent;
      DB.updateTodo({todoId, todoContent,});
    }
  }
}