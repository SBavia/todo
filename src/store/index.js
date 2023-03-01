import { configureStore } from "@reduxjs/toolkit";

import tasks from "../components/todoList/todosSlice";

const store = configureStore({
    reducer: { tasks },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
