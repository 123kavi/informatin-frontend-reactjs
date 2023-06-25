async function FetchInformations() {
    const informations = await fetch("https://localhost:44367/api/Information/getAll").then((res) => res.json());
    return informations;
}

export default FetchInformations;
