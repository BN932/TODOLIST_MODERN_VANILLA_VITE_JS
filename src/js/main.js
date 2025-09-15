import Todolist from './components/todoList/TodoList.js';

const TodoListe = new Todolist({
  elt: '#app',
  apiURL: 'https://68c727ef442c663bd028e1e5.mockapi.io/',
});

const newTodo = document.querySelector('.new-todo');

newTodo.addEventListener('change', function () {
  const newContent = this.value;
  TodoListe.addTodo(newContent);
  this.value = '';
});

TodoListe.domElt.addEventListener('click', (e) => {
  if (e.target.classList.contains('destroy')) {
    const liparent = e.target.closest('li');
    TodoListe.delete(liparent.dataset.id);
    TodoListe.render();
  }
  if (e.target.matches('.content')) {
    const liparent = e.target.closest('li');
    const wrap = e.target.closest('div');
    e.target.addEventListener('dblclick', () => {
      wrap.innerHTML=
        `<input class="toggle" type="checkbox">
        <input class="content" placeholder="What needs to be done?"
        />`;
    e.target.addEventListener('change', function (e) {
            const taskText = e.target.innerText;
            TodoListe.update({id: liparent.dataset.id, content: taskText,})
            wrap.innerHTML=
            `<input class="toggle" type="checkbox">
            <label class="content">${tasks[boxNbr].content}</label>`;
        });

      // label.replaceWith(updateInput);
      // TodoListe.update({id: liParent.dataset.id, content: });
      //TodoListe.render();
    });
  }
});