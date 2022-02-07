import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { TaskObject } from "../../App";

import styles from "./Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneTask,
  selectTaskById,
  changeTaskReminder,
} from "../../features/taskListSlice";
import { RootState } from "../../app/store";

interface TaskProps {
  task: TaskObject;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const selectedTask = useSelector((state: RootState) =>
    selectTaskById(state, task.id)
  );

  const dispatch = useDispatch();
  
  if (typeof selectedTask === "undefined") {
    return null;
  }  

  return (
    <div
      className={`${styles.task} ${
        selectedTask.reminder ? styles.reminder : null
      }`}
    >
      <div
        onDoubleClick={async () => {
          dispatch(changeTaskReminder(selectedTask.id));
        }}
      >
        <h3>
          {selectedTask.text}{" "}
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={async () => {
              dispatch(deleteOneTask(selectedTask.id));
            }}
          />
        </h3>
        <p>{selectedTask.day}</p>
        <p>
          <Link to={`/tasks/${selectedTask.id}`}>View Details</Link>
        </p>
      </div>
    </div>
  );
};

export default Task;
