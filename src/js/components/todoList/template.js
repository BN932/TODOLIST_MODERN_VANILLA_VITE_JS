export default function (todolist) {
    return `<section class="todoapp">
            <header class="header">
                <h1>Todo's</h1>
                <input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus
                    onchange="window.TodoListe.addTodo(this)"

                />
            </header>
            <main class="main">
                <div class="toggle-all-container">
                    <input class="toggle-all" type="checkbox" />
                    <label class="toggle-all-label" for="toggle-all"
                        >Mark all as complete</label
                    >
                </div>
                <ul class='todo-list' role="todo-list">
                    ${todolist.todos.map((todo) => todo.render()).join('')}
                </ul>
            </main>
            <footer class="footer">
                <span class="todo-count">${window.TodoListe.getItemsLeftCount()} item(s) left</span>
                <ul class="filters">
                    <li><a href="#/" class="selected">All</a></li>
                    <li><a href="#/active" id="activeItems">Active</a></li>
                    <li><a href="#/completed" id="completedItems">Completed</a></li>
                </ul>
                <button class="clear-completed">Clear completed</button>
            </footer>
    </section>`;

    };