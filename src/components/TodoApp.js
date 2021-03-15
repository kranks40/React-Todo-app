import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./todoapp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleChange = (e) => {
    // e.preventDefault();
    setTask(e.target.value);
  };

  const AddTask = () => {
    //if task is not empty string then create an object of task
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 100000),
        value: task,
        isCompleted: false,
      };
      setTaskList([...taskList, taskDetails]);
    }
    const text = document.querySelector("#text");
    text.value = "";
    text.focus();
    // setTask('');
  };

  const deleteHandler = (e, id) => {
    // e.preventDefault();
    //to delete a task use setTaskList where for each task id must not be equal to the task you want to delete, by using the filter method.
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  const completedHandler = (e, id) => {
    // e.preventDefault();
    //find index of element
    const element = taskList.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...taskList];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };
    setTaskList(newTaskList);
  };

  return (
    <div className="todo">
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Add task here...."
      />
      <Button className="add-btn" onClick={AddTask}>
        Add
      </Button>
      <br />

      {/* this is a condition rendering which means when tasklist is not empty display list as nothing.  */}
      {taskList !== [] ? (
        <ul>
          {taskList.map((t) => (
            <div key={t.id}>
              {/* if isCompleted is true set className to crossText otherwise set to listitem */}
              <li className={t.isCompleted ? "crossText" : "listitem"}>
                {t.value}
                <Button
                  className=" compl-btn completed"
                  type="text"
                  variant="contained"
                  onClick={(e) => completedHandler(e, t.id)}
                >
                  Completed
                </Button>

                <Button
                  className=" del-btn delete"
                  type="text"
                  variant="contained"
                  onClick={(e) => deleteHandler(e, t.id)}
                >
                  Delete
                </Button>
              </li>
            </div>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;
