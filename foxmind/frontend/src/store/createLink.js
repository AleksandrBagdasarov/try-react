import {createSlice} from "@reduxjs/toolkit";

const createLinkSlice = createSlice({
    name: "createLink",
    initialState: {
        name: "",
        link: "",
        loading: false,
        error: false,
        success: true,
        errorMsg: ""
    },
    reducers: {
        setErrorMsg(state, action) {
            if (action.payload) {
                state.errorMsg = "Invalid link."
            } else {
                state.errorMsg = ""
            }
        },
        createLinkSuccess(state) {
            state.success = true
            state.loading= false
            state.error= false
            state.link= ""
            state.name= ""
            state.errorMsg = ""
        },
        createLinkError(state) {
            state.success = false
            state.loading = false
            state.error = true
            state.link= ""
            state.name= ""
        },
        createLinkLoading(state) {
            state.success = false
            state.loading = true
            state.error = false
            state.link= ""
            state.name= ""
            state.errorMsg = ""
        },
        inputLink(state, action) {
            console.log("action.payload.link", action.payload.link)
            state.link = action.payload.link
        },
        inputLinkName(state, action) {
            console.log("action.payload.name", action.payload.name)
            state.name = action.payload.name
        }
    }
})

export const createLinkActions = createLinkSlice.actions;
export default createLinkSlice;