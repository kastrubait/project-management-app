import axios from 'axios';
import { IBoard } from '../Interfaces/IBoard';
import { IColumn } from '../Interfaces/IColumn';
import { IFormData, IUpdateUserSlice } from '../Interfaces/Interfaces';
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
        return response.data;
      });
  },

  async registration({ data }: IUpdateUserSlice) {
    return instance
      .post(`/signup`, { name: data.name, login: data.login, password: data.password })
      .then((response) => {
        return response.data;
      });
  },

  //User

  async getAllUsers() {
    return instance.get(`/users`).then((response) => {
      return response.data;
    });
  },

  async getUserById(userId: string | null) {
    return instance.get(`/users/${userId}`).then((response) => {
      return response.data;
    });
  },

  async updateUserById(userId: string | null, data: IFormData) {
    return instance
      .put(`/users/${userId}`, { name: data.name, login: data.login, password: data.password })
      .then((response) => {
        return response.data;
      });
  },

  async deleteUserById(userId: string | null) {
    return instance.delete(`/users/${userId}`).then((response) => {
      return response.data;
    });
  },

  //Board

  async getAllBoard() {
    return instance.get(`/boards`).then((response) => {
      return response.data;
    });
  },
  async getBoardById(boardId: string) {
    return instance.get(`/boards/${boardId}`).then((response) => {
      return response.data;
    });
  },
  async createBoard(data: IBoard) {
    return instance.post(`/boards`, data).then((response) => {
      return response.data;
    });
  },
  async updateBoardById(boardId: string, data: IBoard) {
    return instance.put(`/boards/${boardId}`, data).then((response) => {
      return response.data;
    });
  },
  async deleteBoardById(boardId: string) {
    return instance.delete(`/boards/${boardId}`).then((response) => {
      return response.data;
    });
  },

  //Column

  async getAllColumn(boardId: string) {
    return instance.get(`/boards/${boardId}/columns`).then((response) => {
      return response.data;
    });
  },
  async getColumnById(boardId: string, columnsId: string) {
    return instance.get(`/boards/${boardId}/columns/${columnsId}`).then((response) => {
      return response.data;
    });
  },
  async createColumn(boardId: string, data: IColumn) {
    return instance.post(`/boards/${boardId}/columns`, data).then((response) => {
      return response.data;
    });
  },
  async updateColumnById(boardId: string, columnId: string, { title, order }: IColumn) {
    return instance
      .put(`/boards/${boardId}/columns/${columnId}`, { title, order })
      .then((response) => {
        return response.data;
      });
  },
  async deleteColumnById(boardId: string, columnId: string) {
    return instance.delete(`/boards/${boardId}/columns/${columnId}`).then((response) => {
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
  async createTasks(boardId: string, columnsId: string, data: ITask) {
    return instance.post(`/boards/${boardId}/columns/${columnsId}/tasks`, data).then((response) => {
      return response.data;
    });
  },
  async updateTasks(columnId: string, taskId: string, data: Omit<ITaskData, 'id'>) {
    return instance
      .put(`/boards/${data.boardId}/columns/${columnId}/tasks/${taskId}`, data)
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
