export default function getTodolistTemplate(todolist) {
            return `
                <ul class='todo-list'>
                        ${todolist.todos.map((todo) => todo.render()).join('')}
                </ul>
                    `;
        };