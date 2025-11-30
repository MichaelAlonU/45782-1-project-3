import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/Vacation";

interface VacationState {
    newVacation?: Vacation
    vacations: Vacation[]
}

const initialState: VacationState = {
    newVacation: undefined,
    vacations: []
};

export const vacationSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
        },
        follow: (state, action: PayloadAction<{ id: string; userId: string }>) => {
            const idx = state.vacations.findIndex(v => v.id === action.payload.id);
            if (idx > -1) { // shouldn't we add to the if - && not isFollowed=true to make sure he is not already following ?
                state.vacations[idx].isFollowed = true;
                state.vacations[idx].followers?.push({ id: action.payload.userId });
            }
        },
        unfollow: (state, action: PayloadAction<{ id: string; userId: string }>) => {
            const idx = state.vacations.findIndex(v => v.id === action.payload.id);
            if (idx > -1) {
                state.vacations[idx].isFollowed = false;
                state.vacations[idx].followers = state.vacations[idx].followers?.filter(follower => follower.id !== action.payload.userId);
            }
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            // state.posts = [action.payload, ...state.posts]
            state.newVacation = action.payload;
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const idx = state.vacations.findIndex(p => p.id === action.payload.id);
            if (idx > -1) state.vacations[idx] = action.payload;
        },
        deleteVacation: (state, action: PayloadAction<string>) => {
            state.vacations = state.vacations.filter(p => p.id !== action.payload);
        },
        // postAged: (state) => {
        //     if (state.newPost) {
        //         state.posts = [state.newPost, ...state.posts];
        //         state.newPost = undefined;
        //     }
        // }
    }
});

export const { init, newVacation, updateVacation, deleteVacation, follow, unfollow } = vacationSlice.actions;

export default vacationSlice.reducer;