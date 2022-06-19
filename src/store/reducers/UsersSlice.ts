import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../components/UserBlock/UserList"

interface UsersState {
    users: IUser[];
    isLoading: boolean;
    error: string;
    next_url: string,
    showButton: boolean;
}
const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: "",
    next_url: '',
    showButton: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        usersFetching(state: UsersState) {
            state.isLoading = true;
        },
        usersRewrite(state: UsersState, action: PayloadAction<{ users: IUser[], page: number, total_pages: number, links: { next_url: string } }>) {
            state.isLoading = false;
            state.showButton = action.payload.total_pages > action.payload.page
            state.users = [...action.payload.users];
            state.error = ''
            state.next_url = action.payload.links.next_url;
        },
        usersFetchingSuccess(state: UsersState, action: PayloadAction<{ users: IUser[], page: number, total_pages: number, links: { next_url: string } }>) {
            state.isLoading = false;
            state.showButton = action.payload.total_pages > action.payload.page
            state.users = [...state.users, ...action.payload.users];
            state.error = ''
            state.next_url = action.payload.links.next_url;
        },
        usersFetchingFailed(state: UsersState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default userSlice.reducer; 