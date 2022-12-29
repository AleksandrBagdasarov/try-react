import {createSlice} from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        links: [],
        loading: true,
        error: false,
        success: false
    },
    reducers: {
        setLoading(state) {
            state.loading = true
            state.error = false
            state.success = false
        },
        setError(state) {
            state.error = true
            state.loading = false
            state.success = false
        },
        setSuccess(state) {
            state.success = true
            state.loading = false
            state.error = false
        },
        updateDashBoard(state, action=[]) {
            state.links = action.payload
        },
        addLinkDashBoard(state, action=[]) {
            state.links.push(action.payload)
        },
        removeLinkDashBoard(state, action=[]) {
            const remove = (item) => {
                return item.id !== action.payload
            }
            state.links = state.links.filter(remove)
        },
    }
})

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice;