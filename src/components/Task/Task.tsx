import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { TaskObject } from "../../App";
import styles from "./Task.module.css";

type TaskProps = {
  task: TaskObject;
  onDelete(id: number): void;
  onToggle(id: number): void;
};

const Task: React.FC<TaskProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`${styles.task} ${task.reminder ? styles.reminder : null}`}>
      <div onDoubleClick={() => onToggle(task.id)}>
        <h3>
          {task.text}{' '}
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
        </h3>
        <p dangerouslySetInnerHTML={{ __html: task.day }}></p>
        <p><Link to={`/tasks/${task.id}`}>View Details</Link></p>
      </div>
    </div>
  );
};

export default Task;
