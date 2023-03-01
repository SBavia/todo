import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { todoToggled } from "../todoList/todosSlice";

const TodoListItem = ({ id, title, description, status }) => {
    const { loadingStatus } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleCompletedChanged = async () => {
        const prevStatus = !status;
        await request(
            `http://localhost:3001/tasks/${id}`,
            "PATCH",
            JSON.stringify({ status: prevStatus })
        )
            .then(dispatch(todoToggled(id)))
            .catch((err) => console.log(err));
    };

    const ifLongString = (field) => {
        if (field.length > 10) {
            return `${field.slice(0, 10)}...`;
        } else {
            return field;
        }
    };

    return (
        <>
            <div style={{ margin: "0 auto" }}>{ifLongString(id)}</div>
            <div style={{ margin: "0 auto" }}>{ifLongString(title)}</div>
            <div style={{ margin: "0 auto" }}>{ifLongString(description)}</div>
            <div style={{ margin: "0 auto" }}>
                <input
                    type="checkbox"
                    disabled={loadingStatus !== "idle"}
                    checked={status}
                    onChange={handleCompletedChanged}
                />
            </div>
        </>
    );
};

export default TodoListItem;
