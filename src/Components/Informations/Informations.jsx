import React, { useState, useEffect } from "react";
import Information from "./Information/Information";

function Informations() {
    const [informations, setInformations] = useState([]);

    useEffect(() => {
        async function fetchInformations() {
            const informations = await fetch("https://localhost:44367/api/Information/getAll").then((res) => res.json());
            const reversed = informations.reverse();
            console.log(reversed);
            setInformations(reversed);
        }
        fetchInformations();
    }, []);
    return (
        <>
            {informations.map((information) => (
                <Information key={information.id} information={information} />
            ))}
        </>
    );
}

export default Informations;
