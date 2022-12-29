import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: true,
        error: false,
        success: false,
        loggedIn: false,
        loginClick: false,
        signinClick: false,
        refresh: "",
        access: "",
        errorMessage: "",
    },
    reducers: {
        setLoading(state) {
            state.loading = true
            state.error = false
            state.success = false
            console.log("setLoading", state)
        },
        setLoggedIn(state, action) {
            state.loading = true
            state.error = false
            state.success = false
            state.loggedIn = true
            state.loginClick = false
            state.signinClick = false
            state.refresh = action.payload.refresh
            state.access = action.payload.access
            console.log("setLoggedIn", state)
        },
        setAccessRefresh(state, action) {
            state.access = action.payload.access
            console.log("setLoggedIn", state)
        },
        setLogout(state) {
            state.loading = true
            state.error = false
            state.success = false
            state.loggedIn = false
            state.refresh = ""
            state.access = ""
        },
        loadState(state) {},
        setErrorMessage(state, action) {
            if (action.payload){
                state.error = true
                state.errorMessage = action.payload
            } else {
                state.error = false
                state.errorMessage = action.payload
            }
        },
        setLoginClick(state, action) {
            state.error = false
            state.errorMessage = ""
            state.loginClick = action.payload
        },
        setSigninClick(state, action) {
            state.error = false
            state.errorMessage = ""
            state.signinClick = action.payload
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;