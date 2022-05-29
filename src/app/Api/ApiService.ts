import axios from 'axios';
import { TaskForm } from '../components/Task/Task';
import { IBoard } from '../Interfaces/IBoard';
import { IColumn } from '../Interfaces/IColumn';
import { IFormData, IUpdateProfile, IUpdateUserSlice } from '../Interfaces/Interfaces';
import { ITask, ITaskData } from '../Interfaces/ITask';

const instance = axios.create({
  withCredentials: false,
  baseURL: 'https://obscure-peak-16444.herokuapp.com/',
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

  async authorization({ data }: IUpdateUserSlice) {
    return instance
      .post(`/signin`, { login: data.login, password: data.password })
      .then((response) => {
        console.log(`test signIn`, response.data);
        return response.data;
      });
  },

  async registration({ data }: IUpdateUserSlice) {
    return instance
      .post(`/signup`, { name: data.name, login: data.login, password: data.password })
      .then((response) => {
        console.log(`test signUp`, response.data);
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

  async getUserById(userId: string | null) {
    return instance.get(`/users/${userId}`).then((response) => {
      console.log(`test getUserById`, response.data);
      return response.data;
    });
  },

  async updateUserById(userId: string | null, data: IFormData) {
    return instance
      .put(`/users/${userId}`, { name: data.name, login: data.login, password: data.password })
      .then((response) => {
        console.log(`test updateUserById`, data.name, data.login, data.password);
        return response.data;
      });
  },

  async deleteUserById(userId: string | null) {
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
      console.log(`test getBoardById`, response);
      return response.data;
    });
  },
  async createBoard(data: IBoard) {
    return instance.post(`/boards`, data).then((response) => {
      console.log(`test createBoard`, response.data);
      return response.data;
    });
  },
  async updateBoardById(boardId: string, data: IBoard) {
    return instance.put(`/boards/${boardId}`, data).then((response) => {
      console.log(`test updateBoardById`, response.data);
      return response.data;
    });
  },

  async deleteBoardById(boardId: string) {
    return instance.delete(`/boards/${boardId}`).then((response) => {
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
      // console.log(`test getColumnById`, response.data);
      return response.data;
    });
  },

  async createColumn(boardId: string, data: IColumn) {
    console.log(data);
    return instance.post(`/boards/${boardId}/columns`, data).then((response) => {
      // console.log(`test createColumn`, response.data);
      return response.data;
    });
  },

  async updateColumnById(boardId: string, columnId: string, { title, order }: IColumn) {
    return instance
      .put(`/boards/${boardId}/columns/${columnId}`, { title, order })
      .then((response) => {
        // console.log(`test updateColumnById`, response.data);
        return response.data;
      });
  },

  async deleteColumnById(boardId: string, columnId: string) {
    return instance.delete(`/boards/${boardId}/columns/${columnId}`).then((response) => {
      // console.log(`test deleteColumnById`, response.data);
      return response.data;
    });
  },

  async getAllTasks(boardId: string, columnId: string) {
    return instance.get(`/boards/${boardId}/columns/${columnId}/tasks`).then((response) => {
      return response.data;
    });
  },

  async getTasksById(boardId: string, columnsId: string, tasksId: string) {
    return instance
      .get(`/boards/${boardId}/columns/${columnsId}/tasks/${tasksId}`)
      .then((response) => {
        return response.data;
      });
  },

  async createTasksById(boardId: string, columnsId: string, data: TaskForm) {
    return instance.post(`/boards/${boardId}/columns/${columnsId}/tasks`, data).then((response) => {
      return response.data;
    });
  },

  async updateTasks(data: ITask, taskId: string) {
    return instance
      .put(`/boards/${data.boardId}/columns/${data.columnId}/tasks/${taskId}`, data)
      .then((response) => {
        return response.data;
      });
  },

  async deleteTasksById(boardId: string, columnsId: string, tasksId: string) {
    return instance
      .delete(`/boards/${boardId}/columns/${columnsId}/tasks/${tasksId}`)
      .then((response) => {
        return response;
      });
  },

  async downloadFile(filename: string, tasksId: string) {
    return instance
      .get(`/file/${tasksId}/${filename}`, { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        return url;
      });
  },

  async uploadFile(dataForm: FormData) {
    return instance.post('/file', dataForm).then((response) => {
      return response.data;
    });
  },
};
