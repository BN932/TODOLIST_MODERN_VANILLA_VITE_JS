export default class DB {
    static setapiURL (data) {
        this.apiURL = data;
    };
    static async findAll() {
        const response = await fetch(this.apiURL + "Todolist");
        return response.json();
    };
    static async createNewTodo(content) {
        const response = await fetch(this.apiURL + "Todolist", {method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({content: content, completed: false}),})
        return response.json();
    }
    static async deleteTodo(id){
        const response = await fetch(this.apiURL + "Todolist/" + id, {method: 'DELETE'});
        return response.json();
    }
    static async updateTodo(data){
        const response = await fetch(this.apiURL + "Todolist", {method: 'PATCH', body: JSON.stringify({id: data.id, content: data.content})});
        return response.json();
    }
};