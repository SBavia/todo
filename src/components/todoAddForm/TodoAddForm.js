import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";
import { todoAdded } from "../todoList/todosSlice";

import "./todoAddForm.css";

const TodoAddForm = () => {
    const [itemData, setItemData] = useState({
        title: "",
        description: "",
        status: false,
    });
    const [error, setError] = useState({
        title: false,
        description: false,
    });

    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleError = (field) => {
        if (field === "title" || field === "description") {
            setError({
                ...error,
                [field]: false,
            });
        }
    };

    const handleChange = (event, field) => {
        setItemData({
            ...itemData,
            [field]: event.target.value,
        });
        handleError(field);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = v4();
        const newItem = {
            id,
            ...itemData,
        };

        request(`http://localhost:3001/tasks`, "POST", JSON.stringify(newItem))
            .then(dispatch(todoAdded(newItem)))
            .catch((err) => console.log(err))
            .finally(
                setItemData({
                    id: "",
                    title: "",
                    description: "",
                    status: false,
                })
            );
    };

    const handleBlur = (event) => {
        if (!itemData[event.target.name]) {
            setError({
                ...error,
                [event.target.name]: true,
            });
        }
    };

    const errorBorderStyle = { border: "2px solid #ff6f69" };

    return (
        <form onSubmit={handleSubmit}>
            <div className="title">
                <label htmlFor="title">Title:</label>
                <input
                    required
                    style={error.title ? errorBorderStyle : null}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title"
                    value={itemData.title}
                    onChange={(e) => handleChange(e, "title")}
                    onBlur={(e) => handleBlur(e)}
                />
                {error.title ? (
                    <div className="error">This field is empty</div>
                ) : null}
            </div>
            <div className="description">
                <label htmlFor="description">Description:</label>
                <input
                    required
                    style={error.description ? errorBorderStyle : null}
                    name="description"
                    id="description"
                    placeholder="Enter description"
                    value={itemData.description}
                    onChange={(e) => handleChange(e, "description")}
                    onBlur={(e) => handleBlur(e)}
                />
                {error.description ? (
                    <div className="error">This field is empty</div>
                ) : null}
            </div>
            <button type="submit" className="btn">
                Create
            </button>
        </form>
    );
};

export default TodoAddForm;
