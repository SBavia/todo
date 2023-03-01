import React from "react";

import TodoAddForm from "../todoAddForm/TodoAddForm";
import TodoList from "../todoList/TodoList";

import "./app.css";

function App() {
    return (
        <>
            <TodoAddForm />
            <TodoList />
        </>
    );
}

export default App;
