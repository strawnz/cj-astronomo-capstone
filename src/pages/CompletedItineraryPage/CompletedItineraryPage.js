import './CompletedItineraryPage.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function CompletedItineraryPage() {
    const [latestFormInfo, setLatestFormInfo] = useState([]);

    useEffect(() => {
        const fetchLatestFormInfo = async () => {
            try {
                const response = await axios.get(`
                http://localhost:8080/api/forms/last-updated`);
                console.log("Latest form info: ", response.data);
                setLatestFormInfo(response.data);
            } catch (error) {
                console.log("Error fetching latest form info: ", error);
            }
        }
        fetchLatestFormInfo();
    }, []);

    return (
        <>
        <h1>Completed Itinerary Page Placeholder</h1>
        <Link to='/form'>Back to form</Link>
        </>
    )
};

export default CompletedItineraryPage;