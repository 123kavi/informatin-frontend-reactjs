import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import ValidateUser from "../../../Helpers/ValidateUser";

function Information({ information, editable = false }) {
    const [editView, setEditView] = useState(false);
    const [renderInformation, setRenderInformation] = useState(information);
    const [informationDeleted, setInformationDeleted] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [showLaugh, setShowLaugh] = useState(false);
    const [publisher, setPublisher] = useState(false);
    const [hasLaughed, setHasLaughed] = useState(false);
    const navigate = useNavigate();
    let newInformation;
    let newAddress;

    useEffect(() => {
        async function FuckTheseNames() {
            async function GetPublisher() {
                const user = await fetch(`https://information-app-api.azurewebsites.net/api/Auth/get-user/${information.publisherId}`).then((res) => res.json());
                return user.username;
            }
            async function ShowLaugh() {
                const user = await ValidateUser();
                if (user.username !== publisher) setShowLaugh(true);
            }
            const publisher = await GetPublisher();
            setPublisher(publisher);
            ShowLaugh();

            async function HasLaughed() {
                const response = await fetch(`https://information-app-api.azurewebsites.net/api/Information/has-user-laughed/${information.id}`, {
                    method: "GET",
                    credentials: "include",
                }).then((res) => res.json());
                setHasLaughed(response);
            }
            HasLaughed();
        }
        FuckTheseNames();
    }, [information.publisherId, publisher, information.id]);

    async function sendLaugh() {
        const laughs = await fetch(`https://information-app-api.azurewebsites.net/api/Information/updateInformation/laugh/${renderInformation.id}`, {
            method: "PUT",
            credentials: "include",
        }).then((res) => res.text());
        setRenderInformation({ ...renderInformation, laughs: laughs });
        setHasLaughed((prev) => !prev);
    }
    async function updateInformation() {
        if (newInformation && newAddress) {
            const response = await fetch(`https://information-app-api.azurewebsites.net/api/Information/updateInformation/${information.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    question: newInformation,
                    address: newAddress,
                }),
            });
            if (response.status === 401) navigate("/login");
            if (response.status === 200) {
                const newInformation = await response.json();
                setRenderInformation(newInformation);
            }
        }
        setEditView(false);
    }

    async function deleteInformation() {
        const response = await fetch(`https://localhost:44367/api/Information/deleteInformation/${information.id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.status === 401) navigate("/login");
        if (response.status === 200) setInformationDeleted(true);
    }
    return (
        <>
            {!informationDeleted ? (
                <div className="information_container">
                    {!editView ? (
                        <>
                            <div className="flex">
                                <div>
                                    <span className="information">{showAddress ? renderInformation.address : renderInformation.question}</span>
                                    <div className="details">
                                        <span>Publisher:{publisher}</span>
                                        <span>Laughs:{renderInformation.laughs}</span>
                                    </div>
                                </div>
                                {showLaugh ? (
                                    <button onClick={sendLaugh} style={{ position: "absolute", right: "100px", backgroundColor: hasLaughed ? "lightblue" : null }}>
                                        {hasLaughed ? "UnLaugh" : "Laugh"}
                                    </button>
                                ) : null}

                                {editable ? (
                                    <>
                                        <button className="edit_button" onClick={() => setEditView(true)}>
                                            Edit
                                        </button>
                                        <button className="edit_button" onClick={deleteInformation}>
                                            Delete
                                        </button>
                                    </>
                                ) : null}
                                <button className="address" onClick={() => setShowAddress((prev) => !prev)}>
                                    {!showAddress ? "Reveal" : "Information"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <input onChange={(e) => (newInformation = e.target.value)} id="newInformation" placeholder="New information" />
                            <input onChange={(e) => (newAddress = e.target.value)} style={{ marginLeft: "10px" }} id="newpunchline" placeholder="New address" />
                            <button style={{ marginLeft: "10px" }} onClick={updateInformation}>
                                Update information
                            </button>
                            <button style={{ marginLeft: "10px" }} onClick={() => setEditView(false)}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            ) : null}
        </>
    );
}

export default Information;
