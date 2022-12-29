import React, {useEffect} from "react";
import axios from "axios";
import {dashboardActions} from "../../store/dashboard";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/user";

function LinksDashboard() {
    const links = useSelector((state) => state.dashboard.links);
    const state = useSelector((state) => state.dashboard);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    function sleepFor(sleepDuration){
        let now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
    }

    const copy = (event) => {
        const code = event.target.value
        let element = document.getElementById(code)

        // element.text = "copied"
        console.log("code", event.target.text)
        navigator.clipboard.writeText("http://127.0.0.1:8000/" + code)
        sleepFor(500)
        // event.target.text = "http://127.0.0.1:8000/" + code
    }

    const config = {
        headers: {
            "Authorization": "Bearer " + userState.access
        }
    }

    useEffect(() => {
        getAllLinks();
    }, [])

    const getAllLinks = () => {
        dispatch(dashboardActions.setLoading());

        axios.post(
            "http://127.0.0.1:8000/api/v1/token/refresh",
            {
                "refresh": userState.refresh
            }
        ).then(
            res => {
                console.log(res.data)
                console.log("res.status", res.status)

                dispatch(userActions.setAccessRefresh(res.data))
            }
        ).catch(
            error => {
                console.log(error)
            }
        )

        axios.get("/api/v1/links", config)
            .then(res => {
                dispatch(dashboardActions.updateDashBoard(res.data));
                sleepFor(500)
                dispatch(dashboardActions.setSuccess())
            })
            .catch(
                error => {
                    console.error(`Error ${error}`)
                    dispatch(dashboardActions.setError())
                }
            )
    }

    const setLinksBody = () => {
        return (
            links.map((item, index) =>
            <tr key={index} id={item.id}>
                <th scope="row"><button onClick={copy} value={item.code} id={item.code} className="btn btn-light mr-sm-2">{"http://127.0.0.1:8000/" + item.code}</button></th>
                <th scope="row">{item.name}</th>
                <th scope="row">{item.clicks}</th>
                <th scope="row">{item.link}</th>
                <th scope="row">{item.created_at?.slice(0,10)}</th>
                <th scope="row">
                    <div className="text-center">
                    <button id={item.id} className="btn btn-info mr-auto ml-1"> Edit </button>
                    <button id={item.id} onClick={removeLink} className="btn btn-danger ml-1">X</button>
                    </div>
                </th>
            </tr>
            )
        )
    };

    const removeLink = (event) => {
        const itemId = event.target.id
        console.log(itemId)
        console.log("userState.refresh", userState.refresh)

        axios.post(
            "http://127.0.0.1:8000/api/v1/token/refresh",
            {
                "refresh": userState.refresh
            },
            config
        ).then(
            res => {
                console.log(res.data)
                dispatch(userActions.setAccessRefresh(res.data))
            }
        ).catch(
            error => {
                console.log(error)
            }
        )

        axios.delete("http://127.0.0.1:8000/api/v1/links/" + itemId, config).then(
            res => {
                console.log(res.status)
                dispatch(dashboardActions.setSuccess())
                dispatch(dashboardActions.removeLinkDashBoard(itemId))
            }
        ).catch(
            error => {
                console.log(error)
                dispatch(dashboardActions.setError())
            }
        )
    }

    const dashboard = (
        <table className="table table-bordered">
        <thead className="thead bg-info">
        <tr className="text-white">
            <th scope="col">Code</th>
            <th scope="col">Name</th>
            <th scope="col">Clicks</th>
            <th scope="col">Link</th>
            <th scope="col">Created</th>
            <th scope="col"></th>
        </tr>
        </thead>
            {state.success && setLinksBody()}
        <tbody>
        </tbody>
    </table>
    )

    const dashBoardTitle = (state) => {
        if (state.links.length >= 1 && state.success) {
            return (<h4>Your Links</h4>);
        }
        else if (state.links.length < 1 && state.success) {
            return (<h4>No Links Yet</h4>);
        }
        else if (state.error) {
            return (<h4>Something went wrong!</h4>);
        }
        else {
            return (<h4>...Loading</h4>);
        }
    }



    return (
        <div className="container mr-auto mt-5 form-control">
            <div className="text-center">
                {dashBoardTitle(state)}
            </div>
            {state.success && dashboard}
        </div>
    )
}

export default LinksDashboard;