import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {createLinkActions} from "../../store/createLink";
import {dashboardActions} from "../../store/dashboard";
import React from "react";
import {userActions} from "../../store/user";
import validator from "validator/es";

const LinksForm = () => {
    const linkState = useSelector((state) => state.createLink);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function sleepFor(sleepDuration){
        let now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
    }

    const config = {
            headers: {
                "Authorization": "Bearer " + userState.access
            }
        }
    const postLink = () => {


        const postRequest = () => {


        dispatch(createLinkActions.createLinkLoading())
        axios.post(
            "http://127.0.0.1:8000/api/v1/token/refresh",
            {
                "refresh": userState.refresh
            }
        ).then(
            res => {
                console.log("res.status", res.status)
                console.log(res.data)
                dispatch(userActions.setAccessRefresh(res.data))
            }
        ).catch(
            error => {
                console.log(error)
            }
        )

        const url = "http://127.0.0.1:8000/api/v1/links"
        axios.post(
            url,
            {
                name: linkState.name,
                link: linkState.link
            },
            config
        ).then(
            res => {
                console.log(res.data)
                sleepFor(500)
                dispatch(dashboardActions.addLinkDashBoard(res.data))
                dispatch(createLinkActions.createLinkSuccess())
            }
        ).catch(
            error => {
                console.log(error)
                dispatch(createLinkActions.createLinkError())
            }
        )
        }

        if (!linkState.link || !validator.isURL(linkState.link)) {
            dispatch(createLinkActions.setErrorMsg(true))
        } else {
            postRequest()
        }
    }
    const setLink = (event) => {
        const value = event.target.value
        if (value && validator.isURL(value)) {
            dispatch(createLinkActions.setErrorMsg(false))
        }

        dispatch(createLinkActions.inputLink({"link": value}))
    }
    const setLinkName = (event) => {
        const value = event.target.value
        dispatch(createLinkActions.inputLinkName({"name": value}))
    }

    return (
        <div className="container mt-5 form-control">
            <div className="text-center">
                <h4>{linkState.error? "Something went wrong!": "Create Link"}</h4>
            </div>
        <div className="row">
                <div className="col">
                    <input name="link-name" value={linkState.name} type="text" onChange={setLinkName} className="form-control mr-auto mt-1" placeholder="Add Link Name"/>
                    <input name="link" value={linkState.link} type="url" onChange={setLink} className="form-control mr-auto mt-1" placeholder="Link Here"/>
                    <small className="text-danger">{linkState.errorMsg? linkState.errorMsg: ""}</small>
                    <button onClick={postLink} className="mt-3 mr-auto bg-info text-white form-control">{linkState.loading ? "Wait...": "Create"}</button>
                </div>
            </div>
        </div>
    )
}

export default LinksForm;