export default class DB {
    static setapiURL (data) {
        this.apiURL = data;
    };
    static async findAll() {
        const response = await fetch(this.apiURL + "todos");
        return response.json();
    };
};