import * as axios from "axios/index";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {"API-KEY": "ec13c7fa-bf13-4b56-aa9c-409a1e523851"}

});

export const todoAPI = {
    getTodolist(){
        return instance.get(`todo-lists`);
    },
    addTodolist(newTodoTitle){
        return instance.post(`todo-lists`,{title:newTodoTitle});
    },
    deleteTodolist(id){
        return instance.delete(`todo-lists/${id}`);
    },
    updateTodolist(id, title){
        return instance.put(`todo-lists/${id}`, {title: title});
    }
}

export const tasksAPI = {
    getTasks(todoId){
        return instance.get(`todo-lists/${todoId}/tasks`);
    },
    addTask(todoId,newTask){
        return instance.post(`todo-lists/${todoId}/tasks`, {title: newTask});
    },
    deleteTask(todoId,taskId){
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`);
    },
    updateTask(todoId, taskId, task){
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`,task);
    }

}


