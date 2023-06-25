import React, { useEffect, useState } from "react";
import Information from "../Informations/Information/Information";
import ValidateUser from "../../Helpers/ValidateUser";
import FetchInformations from "../../Helpers/FetchInformations";

function MyInformations() {
    const [myInformations, setMyInformations] = useState([]);

    useEffect(() => {
        async function getMyInformations() {
            const userId = await ValidateUser().then((user) => user.id);
            if (userId) {
                const informations = await FetchInformations();
                return informations.filter((information) => information.publisherId === userId);
            }
        }
        getMyInformations().then((informations) => setMyInformations(informations));
    }, []);
    return (
        <>
            {myInformations?.map((information) => (
                <Information key={information.id} information={information} editable={true} />
            ))}
        </>
    );
}

export default MyInformations;
