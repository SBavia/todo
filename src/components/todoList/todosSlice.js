import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
    loadingStatus: "idle",
});

export const fetchTodos = createAsyncThunk("tasks/fetchTodos", async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/tasks");
});

const todosSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        todoToggled(state, action) {
            const todoId = action.payload;
            const todo = state.entities[todoId];
            todo.status = !todo.status;
        },
        todoAdded: (state, action) => {
            todosAdapter.addOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loadingStatus = "loading";
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loadingStatus = "idle";
                todosAdapter.setAll(state, action.payload);
            })
            .addCase(fetchTodos.rejected, (state) => {
                state.loadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = todosSlice;

export default reducer;

export const { selectAll: selectTodos, selectById: selectTodoById } =
    todosAdapter.getSelectors((state) => state.tasks);

export const { todoAdded, todoToggled } = actions;
