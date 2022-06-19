import { AppDispatch } from "..";
import { userSlice } from "./UsersSlice";

export const fetchUsers = (url: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching());
        const response = await (await fetch(url)).json();
        dispatch(userSlice.actions.usersFetchingSuccess(response));

    } catch (e) {
        if (typeof e === "string") {
            e.toUpperCase() // works, `e` narrowed to string
        } else if (e instanceof Error) {
            dispatch(userSlice.actions.usersFetchingFailed(e.message));

        }
    }
}