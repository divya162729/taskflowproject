// client/src/services/taskService.js
import { tasksAPI } from './api';

class TaskService {
  async getAll() {
    return await tasksAPI.getAll(); // { tasks }
  }

  async create(data) {
    return await tasksAPI.create(data); // { task }
  }

  async update(id, data) {
    return await tasksAPI.update(id, data); // { task }
  }

  async delete(id) {
    return await tasksAPI.delete(id); // { message }
  }

  // optional: toggleStar backend later add panna mudiyum
}

export const taskService = new TaskService();