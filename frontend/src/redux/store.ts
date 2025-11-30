import { configureStore } from "@reduxjs/toolkit";
import vacationSlice from "./vacationSlice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        vacations: vacationSlice,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch