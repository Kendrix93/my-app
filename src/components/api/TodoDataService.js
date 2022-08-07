import axios from "axios";
import {LOCALHOST, LOCALHOST_JPA} from "../../constant";

class TodoDataService {

    executeGetAllTodos(name){
        return axios.get(LOCALHOST_JPA + `users/${name}/todos`);
    }

    executeGetTodo(name, id){
        return axios.get(LOCALHOST_JPA + `users/${name}/todos/${id}`);
    }

    deleteTodoRow(name, id){
        return axios.delete(LOCALHOST + `users/${name}/todos/${id}`);
    }

    updateTodoRow(name, id, todo){
        return axios.put(LOCALHOST + `users/${name}/todos/${id}`, todo);
    }

    createTodoRow(name, todo){
        return axios.post(LOCALHOST + `users/${name}/todos/`, todo);
    }

}

export default new TodoDataService()
