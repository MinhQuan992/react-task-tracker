import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import TaskList from "./components/TaskList/TaskList";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import TaskForm from "./components/TaskForm/TaskForm";

import globalStyles from "./App.module.css";

export interface TaskObject {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<TaskObject[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    return await res.json();
  };

  const fetchTask = async (id: number) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    return await res.json();
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id: number) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const addTask = async (task: TaskObject) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <BrowserRouter>
      <div className={`${globalStyles.container}`}>
        <Header
          title="Task Tracker"
          showForm={showTaskForm}
          callback={() => setShowTaskForm(!showTaskForm)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showTaskForm && <TaskForm onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No tasks to do"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
