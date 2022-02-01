import React from "react";
import { TaskObject } from "../../App";
import Task from "../Task/Task";

type TaskListProps = {
  tasks: TaskObject[];
  onDelete(id: number): void;
  onToggle(id: number): void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        );
      })}
    </>
  );
};

export default TaskList;
