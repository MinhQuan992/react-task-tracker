import { TaskObject } from "../App";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const fetchAllTasks = async () => {
  let data;
  try {
    const res = await fetch("http://localhost:5000/tasks");
    data = await res.json();
    if (res.ok) {
      return data;
    }
    throw new Error(res.statusText);
  } catch (e) {
    return Promise.reject(getErrorMessage(e));
  }
};

const fetchOneTask = async (id: number) => {
  let data;
  try {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    data = await res.json();
    if (res.ok) {
      return data;
    }
    throw new Error(res.statusText);
  } catch (e) {
    return Promise.reject(getErrorMessage(e));
  }
};

const addTask = async (task: TaskObject) => {
  let data;
  try {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    data = await res.json();
    if (res.ok) {
      return data;
    }
    throw new Error(res.statusText);
  } catch (e) {
    return Promise.reject(getErrorMessage(e));
  }
};

const updateTask = async (task: TaskObject) => {
  let data;
  try {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    data = await res.json();
    if (res.ok) {
      return data;
    }
    throw new Error(res.statusText);
  } catch (e) {
    return Promise.reject(getErrorMessage(e));
  }
};

const deleteTask = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return id;
    }
    throw new Error(res.statusText);
  } catch (e) {
    return Promise.reject(getErrorMessage(e));
  }
};

export { fetchAllTasks, fetchOneTask, addTask, updateTask, deleteTask };
