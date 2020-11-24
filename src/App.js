import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {
  //state stuff
  const firstRender = useRef(true);
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // Use effect
  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem("Todo", JSON.stringify([...todos]));
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem("Todo") !== null) {
      const newTodos = localStorage.getItem("Todo");
      setTodos(JSON.parse([newTodos]));
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>My Todo List</h1>
        </header>
        <Form todos={todos} setTodos={setTodos} setInputValue={setInputValue} inputValue={inputValue} setStatus={setStatus} />
        <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
      </div>
    </div>
  );
};

export default App;
