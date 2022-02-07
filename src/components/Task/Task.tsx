import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { TaskObject } from "../../App";

import styles from "./Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneTask,
  selectTaskById,
  updateOneTask,
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

  return (
    <div
      className={`${styles.task} ${
        selectedTask?.reminder ? styles.reminder : null
      }`}
    >
      <div
        onDoubleClick={async () => {
          if (typeof selectedTask !== "undefined") {
            dispatch(updateOneTask(selectedTask.id));
          }
        }}
      >
        <h3>
          {selectedTask?.text}{" "}
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={async () => {
              if (typeof selectedTask !== "undefined") {
                dispatch(deleteOneTask(selectedTask.id));
              }
            }}
          />
        </h3>
        <p>{selectedTask?.day}</p>
        <p>
          {typeof selectedTask !== "undefined" ? (
            <Link to={`/tasks/${selectedTask?.id}`}>View Details</Link>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default Task;
