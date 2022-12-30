import React from "react";
import Header from "./layout/Header";
import Dashboard from "./foxmind/LinksDashboard";
import LinksForm from "./foxmind/LinksForm";
import LoginForm from "./foxmind/Login";
import SignUpForm from "./foxmind/Signup";
import {useSelector} from "react-redux";

function App() {

    const state = useSelector((state) => state.user)
    console.log(state)
    const appData = () => {
        if (state.loginClick) {
            return <LoginForm/>;
        } else if (state.signinClick) {
            return <SignUpForm/>;
        } else if (state.loggedIn) {
            return (
                <>
                <LinksForm/>
                <Dashboard/>
                </>
            );
        } else {
            return <SignUpForm/>;
        }
    }

    return (
        <div>
            <Header/>
            {appData()}
        </div>

    )
}

export default App;