import React from "react";
import { v4 as uuidv4 } from "uuid";

function Form({ inputValue, setInputValue, todos, setTodos, setStatus }) {
  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setTodos([
      ...todos,
      {
        text: inputValue,
        completed: false,
        id: uuidv4()
      }
    ]);
    setInputValue("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <form className="form-wrapper" onSubmit={submitHandler}>
      <div>
        <input className="todo-input" autoFocus type="text" placeholder="Add a task..." onChange={inputValueHandler} value={inputValue} />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
      </div>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;
