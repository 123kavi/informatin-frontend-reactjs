import React, { useEffect, useState } from "react";
import "./styles.css";
import { Navigate, useNavigate } from "react-router-dom";
import ValidateUser from "../../Helpers/ValidateUser";

function PostInformation() {
    const [status, setStatus] = useState();
    const [user, setUser] = useState(true);
    const navigate = useNavigate();
    let information;
    let address;

    useEffect(() => {
        async function Authorize() {
            const response = await ValidateUser();
            if (response) {
                setUser(true);
            } else setUser(false);
        }
        Authorize();
    }, []);

    async function postInformation() {
        if (user && information && address) {
            const response = await fetch("https://localhost:44367/api/Information/post", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: information,
                    address: address,
                }),
            });
            if (response.status === 401) setStatus("Unauthorized");
            if (response.status === 200) {
                setStatus("Information posted successfully");
                navigate("/my-informations")
            }
        }
    }
    return (
        <>
            {user ? (
                <div className="information_container post_information">
                    <div className="input_container">
                        <div className="input">
                            <label htmlFor="information">Enter information: </label>
                            <input
                                id="information"
                                onChange={(e) => {
                                    information = e.target.value;
                                }}
                            ></input>
                        </div>
                        <div className="input">
                            <label htmlFor="address">Enter address: </label>
                            <input
                                id="address"
                                onChange={(e) => {
                                    address = e.target.value;
                                }}
                            ></input>
                        </div>
                    </div>
                    <span className="status">{status}</span>
                    <button className="submit" onClick={postInformation}>
                        Post Information
                    </button>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}

export default PostInformation;
