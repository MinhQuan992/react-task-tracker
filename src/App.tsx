import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import TaskList from "./components/TaskList/TaskList";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import TaskForm from "./components/TaskForm/TaskForm";

import globalStyles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { getAllTasks, selectAllTasks } from "./features/taskListSlice";
import { useEffect } from "react";

export interface TaskObject {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
}

const App = () => {
  const showTaskForm = useSelector((state: RootState) => state.taskForm.isShowed);
  const tasks = useSelector((state: RootState) => selectAllTasks(state));
  const loading = useSelector((state: RootState) => state.taskList.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <BrowserRouter>
      <div className={`${globalStyles.container}`}>
        <Header title="Task Tracker" showForm={showTaskForm} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {loading && <p>Loading...</p>}
                {showTaskForm && <TaskForm />}
                {tasks.length > 0 ? (
                  <TaskList tasks={tasks} />
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
