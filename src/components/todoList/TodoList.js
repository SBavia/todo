import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";

import { selectTodos, fetchTodos } from "./todosSlice";
import TodoListItem from "../todoListItem/TodoListItem";
import Header from "./TodoListHeader";
import Modal from "../modal/Modal";

import "./todoList.css";

const TodoList = () => {
    const [activeTodoInModal, setActiveTodoInModal] = useState("");
    const { loadingStatus } = useSelector((state) => state.tasks);
    const tasks = selectTodos(store.getState());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
        // eslint-disable-next-line
    }, []);

    if (loadingStatus === "loading") {
        return <h5 className="text-center mt-5">Загрузка</h5>;
    } else if (loadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderItemsList = (arr) => {
        if (arr.length === 0) {
            return (
                <li>
                    <h5>No tasks</h5>
                </li>
            );
        }
        return arr.map((task) => {
            return (
                <li
                    className="list-item"
                    key={task.id}
                    onClick={(e) => {
                        if (e.target.type !== "checkbox") {
                            setActiveTodoInModal(`${task.id}`);
                        }
                    }}
                >
                    <TodoListItem id={task.id} {...task} />
                </li>
            );
        });
    };

    const elements = renderItemsList(tasks);

    return (
        <>
            <Header />
            <ul>{elements}</ul>
            <Modal
                activeTodo={activeTodoInModal}
                setActiveTodo={setActiveTodoInModal}
            />
        </>
    );
};

export default TodoList;
