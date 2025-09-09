export default function getTodolistTemplate(todolist) {
            return `
                <h1>Ma liste de todo's</h1>
                <ul>
                        ${todolist.todos.map((todo) => todo.render()).join('')}
                </ul>
                    `;
        };