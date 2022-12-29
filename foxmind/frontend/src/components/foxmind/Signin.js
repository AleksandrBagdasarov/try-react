import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/user";
import axios from "axios";

const SigninForm = () => {
    const state = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const signIn = (event) => {
        event.preventDefault();
        console.log("event.target.password", event.target.password.value)
        console.log("event.target.email", event.target.email.value)
        const url = "http://127.0.0.1:8000/api/v1/register"
        axios.post(
            url,
            {
                email: event.target.email.value,
                password: event.target.password.value
            }
        ).then(
            res => {
                console.log(res.data)
                dispatch(userActions.setLoggedIn(res.data))
                dispatch(userActions.setSigninClick(false))
            }
        ).catch(
            error => {
                console.log(error)
                if (error.response.data.detail) {
                    dispatch((userActions.setErrorMessage(error.response.data.detail)))
                } else {
                    dispatch((userActions.setErrorMessage("Something Went Wrong!")))
                }
            }
        )
    }

    return (

        <div className="container mt-5 form-control">
            <form onSubmit={signIn}>
            <div className="text-center">
                <h4>{state.error? state.errorMessage: "Sign in"}</h4>
            </div>
                <div className="row">
                    <div className="col">
                        <input name="email" type="email" className="form-control mr-auto mt-1" placeholder="Email"/>
                        <input name="password" type="password" className="form-control mr-auto mt-1" placeholder="Password"/>
                    </div>
                </div>
                    <button className="text-center form-control mt-3 mr-auto bg-info text-white">Sign in</button>
            </form>
        </div>
    )
}

export default SigninForm;