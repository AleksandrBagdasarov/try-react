import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/user";

const Header = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user);
    let header_buttons;

    const logout = () => {
        if (confirm("Do You Wanna Logout?")) {

            console.log("logout")
            dispatch(userActions.setLogout());
        }
    }

    const clickSignin = () => {
        dispatch(userActions.setSigninClick(true))
        dispatch(userActions.setLoginClick(false))
    }
    const clickLogin = () => {
        dispatch(userActions.setLoginClick(true))
        dispatch(userActions.setSigninClick(false))

    }
    const clickHome = () => {
        dispatch(userActions.setLoginClick(false))
        dispatch(userActions.setSigninClick(false))

    }

    if (state.loggedIn) {
        header_buttons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button onClick={logout} className="btn btn-light mr-sm-2">Logout</button>
                </li>
            </ul>
        )
    } else {
        header_buttons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button onClick={clickLogin} className="btn btn-light mr-sm-2">Login</button>
                </li>
                <li className="nav-item">
                    <button onClick={clickSignin} className="btn btn-light mr-sm-2">Sign Up</button>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button onClick={clickHome} className="navbar-brand btn btn-light">FoxMind</button>
            {header_buttons}
        </nav>
    )
}

export default Header;