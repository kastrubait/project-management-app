import axios from 'axios';
import { IUpdateUser } from '../Interfaces/Interfaces';

const instance = axios.create({
  withCredentials: false,
  baseURL: 'https://damp-ocean-02457.herokuapp.com/',
});

instance.interceptors.request.use((config) => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export const ApiService = {
  //Reg & Auth

  async registration(name: string, login: string, password: string) {
    return instance
      .post(`/signup`, { name: name, login: login, password: password })
      .then((response) => {
        console.log(`test signUp`, response.data);
        return response.data;
      });
  },

  async authorization(login: string, password: string) {
    return instance.post(`/signin`, { login: login, password: password }).then((response) => {
      console.log(`test signIn`, response.data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    });
  },

  //User

  async getAllUsers() {
    return instance.get(`/users`).then((response) => {
      console.log(`test getAllUsers`, response.data);
      return response.data;
    });
  },
  async getUserById(userId: string) {
    return instance.get(`/users/${userId}`).then((response) => {
      console.log(`test getUserById`, response.data);
      return response.data;
    });
  },
  async updateUserById(userId: string, data: IUpdateUser) {
    return instance
      .put(`/users/${userId}`, { name: data.name, login: data.login, password: data.password })
      .then((response) => {
        console.log(`test updateUserById`, response.data);
        return response.data;
      });
  },
  async deleteUserById(userId: string) {
    return instance.delete(`/users/${userId}`).then((response) => {
      console.log(`test deleteUserById`, response.data);
      return response.data;
    });
  },

  //Board

  async getAllBoard() {
    return instance.get(`/boards`).then((response) => {
      console.log(`test getAllBoard`, response.data);
      return response.data;
    });
  },
  async getBoardById(boardId: string) {
    return instance.get(`/boards/${boardId}`).then((response) => {
      console.log(`test getBoardById`, response.data);
      return response.data;
    });
  },
  async createBoard(boardTitle: string) {
    return instance.post(`/boards/${boardTitle}`).then((response) => {
      console.log(`test createBoard`, response.data);
      return response.data;
    });
  },
  async updateBoardById(boardTitle: string) {
    return instance.put(`/boards/${boardTitle}`).then((response) => {
      console.log(`test updateBoardById`, response.data);
      return response.data;
    });
  },
  async deleteBoardById(boardTitle: string) {
    return instance.delete(`/boards/${boardTitle}`).then((response) => {
      console.log(`test deleteBoardById`, response.data);
      return response.data;
    });
  },

  //Column

  async getAllColumn(boardId: string) {
    return instance.get(`/boards/${boardId}/columns`).then((response) => {
      console.log(`test getAllColumn`, response.data);
      return response.data;
    });
  },
  async getColumnById(boardId: string, columnsId: string) {
    return instance.get(`/boards/${boardId}/columns/${columnsId}`).then((response) => {
      console.log(`test getColumnById`, response.data);
      return response.data;
    });
  },
  async createColumnById(boardId: string, columnsId: string) {
    return instance.post(`/boards/${boardId}/columns/${columnsId}`).then((response) => {
      console.log(`test createColumnById`, response.data);
      return response.data;
    });
  },
  async updateColumnById(boardId: string, columnsId: string) {
    return instance.put(`/boards/${boardId}/columns/${columnsId}`).then((response) => {
      console.log(`test updateColumnById`, response.data);
      return response.data;
    });
  },
  async deleteColumnById(boardId: string, columnsId: string) {
    return instance.delete(`/boards/${boardId}/columns/${columnsId}`).then((response) => {
      console.log(`test deleteColumnById`, response.data);
      return response.data;
    });
  },

  //Tasks

  async getAllTasks(boardId: string) {
    return instance.get(`/boards/${boardId}/columns/tasks`).then((response) => {
      console.log(`test getAllTasks`, response.data);
      return response.data;
    });
  },
  async getTasksById(boardId: string, columnsId: string, tasksId: string) {
    return instance
      .get(`/boards/${boardId}/columns/${columnsId}/tasks/${tasksId}`)
      .then((response) => {
        console.log(`test getTasksById`, response.data);
        return response.data;
      });
  },
  async createTasksById(boardId: string, columnsId: string) {
    return instance.post(`/boards/${boardId}/columns/${columnsId}/tasks`).then((response) => {
      console.log(`test createTasksById`, response.data);
      return response.data;
    });
  },
  async updateTasksById(boardId: string, columnsId: string, tasksId: string) {
    return instance
      .put(`/boards/${boardId}/columns/${columnsId}/tasks/${tasksId}`)
      .then((response) => {
        console.log(`test updateTasksById`, response.data);
        return response.data;
      });
  },
  async deleteTasksById(boardId: string, columnsId: string, tasksId: string) {
    return instance
      .delete(`/boards/${boardId}/columns/${columnsId}/tasks/${tasksId}`)
      .then((response) => {
        console.log(`test deleteTasksById`, response.data);
        return response.data;
      });
  },

  //File

  async downloadFile(fileName: string, tasksId: string) {
    return instance.get(`/file/${tasksId}/${fileName}`).then((response) => {
      console.log(`test downloadFile`, response.data);
      return response.data;
    });
  },
  async uploadFile(tasksId: string, file: string) {
    return instance.post(`/file/${tasksId}/${file}`).then((response) => {
      console.log(`test getTasksById`, response.data);
      return response.data;
    });
  },
};