import React, { useState } from "react";
import formStyles from "./TaskForm.module.css";
import buttonStyles from "../Button/Button.module.css";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../features/taskListSlice";

const TaskForm: React.FC = () => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }

    const id: number = Math.floor(Math.random() * 100 + 1);
    dispatch(addNewTask({ id, text, day, reminder }));

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className={`${formStyles.addForm}`} onSubmit={onSubmit}>
      <div className={`${formStyles.formControl}`}>
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className={`${formStyles.formControl}`}>
        <label>Day and Time</label>
        <input
          type="text"
          placeholder="Add Day and Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      <div
        className={`${formStyles.formControl} ${formStyles.formControlCheck}`}
      >
        <label>Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input
        type="submit"
        value="Save Task"
        className={`${buttonStyles.btn} ${buttonStyles.btnBlock}`}
      />
    </form>
  );
};

export default TaskForm;
