import React from "react";
import { TaskObject } from "../../App";
import Task from "../Task/Task";

interface TaskListProps {
  tasks: TaskObject[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
          />
        );
      })}
    </>
  );
};

export default TaskList;
