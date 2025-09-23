export default function getTodoTemplate(todo) {
            return `
                    <li data-id="${todo['id']}" class="${todo['completed']? 'completed':""} items">
                        <div class="view">
                        <input class="toggle" type="checkbox" ${todo['completed']? 'checked':''} />
                        <label class="content" ondblclick="window.TodoListe.prepareUpdate(this)">${todo['content']}</label>
                        <button class="destroy" onclick="window.TodoListe.delete({id: ${todo['id']}, todo: this})"></button>
                        </div>
                    </li>
                    `;
        };