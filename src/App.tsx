import { useState } from "react";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import globalStyles from "./App.module.css";

export type TaskObject = {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
};

const App = () => {
  const defaultTasks: TaskObject[] = [
    {
      id: 1,
      text: "Doctor Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Shopping",
      day: "Feb 8th at 8:00am",
      reminder: false,
    },
  ];

  const [tasks, setTasks] = useState(defaultTasks);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const addTask = (task: TaskObject) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className={`${globalStyles.container}`}>
      <Header
        title="Task Tracker"
        showForm={showTaskForm}
        callback={() => setShowTaskForm(!showTaskForm)}
      />
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
    </div>
  );
};

export default App;
