import './style.css';
import Todolist from './components/todoList/TodoList.js';

window.TodoListe = new Todolist({
  elt: '#app',
  apiURL: 'https://68c727ef442c663bd028e1e5.mockapi.io/',
});

