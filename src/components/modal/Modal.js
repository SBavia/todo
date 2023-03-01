import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { todoToggled, selectTodoById } from "../todoList/todosSlice";

import "./modal.css";

const Modal = ({ activeTodo, setActiveTodo }) => {
    const todo = useSelector((state) => selectTodoById(state, activeTodo));
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleCompletedChanged = async () => {
        const prevStatus = !todo.status;
        await request(
            `http://localhost:3001/tasks/${todo.id}`,
            "PATCH",
            JSON.stringify({ status: prevStatus })
        )
            .then(dispatch(todoToggled(todo.id)))
            .catch((err) => console.log(err));
    };

    const clazz = activeTodo !== "" ? "modal active" : "modal";

    return (
        <>
            <div className={clazz} onClick={() => setActiveTodo("")}>
                <div
                    className="modal__content"
                    onClick={(e) => e.stopPropagation()}
                >
                    {todo ? (
                        <View
                            todo={todo}
                            close={setActiveTodo}
                            handleCompletedChanged={handleCompletedChanged}
                        />
                    ) : null}
                </div>
            </div>
            ;
        </>
    );
};

const View = (props) => {
    const { title, description, status } = props.todo;
    return (
        <>
            <h2>{title}</h2>
            <h3>Description:</h3>
            <p>{description}</p>
            <label className="modal-label">
                Status:
                <input
                    className="modal-input"
                    type="checkbox"
                    name="checkbox"
                    checked={status}
                    onChange={props.handleCompletedChanged}
                />
            </label>
            <button onClick={() => props.close("")}>Close</button>
        </>
    );
};

export default Modal;
