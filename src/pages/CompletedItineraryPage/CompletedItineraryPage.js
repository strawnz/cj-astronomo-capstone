import './CompletedItineraryPage.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function CompletedItineraryPage() {
    const [latestFormInfo, setLatestFormInfo] = useState([]);
    const [restoToVenueTime, setRestoToVenueTime] = useState(null);
    const [timeAtResto, setTimeAtResto] = useState(null);

    useEffect(() => {
        const fetchLatestFormInfo = async () => {
            try {
                const response = await axios.get(`
                http://localhost:8080/api/forms/last-updated`);
                console.log("Latest form info: ", response.data); // remove this eventually
                setLatestFormInfo(response.data);
            } catch (error) {
                console.log("Error fetching latest form info: ", error);
            }
        }
        fetchLatestFormInfo();
    }, []);

    // const eventDate = latestFormInfo.latest_form.event_date;

    const calculateTimeBackwards = (startTime, duration) => {
        const time = new Date(`2024-02-04T${startTime}`);
        time.setMinutes(time.getMinutes() - duration);
        return time.toLocaleDateString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    useEffect(() => {
        if (latestFormInfo && latestFormInfo.latest_form) {
            const calculateRestoToVenueTime = calculateTimeBackwards(
                latestFormInfo.latest_form.preferred_time,
                latestFormInfo.resto_venue_info.duration_venue
            );
            console.log("Time from Resto to Venue: ", calculateRestoToVenueTime); // remove this eventually
            setRestoToVenueTime(calculateRestoToVenueTime);
        }
    }, [latestFormInfo]);



    return (
        <main className='main'>
            <section className='completed__header-container'>
                <h1 className='completed__header'>Your Pre-Event Planner is Ready!</h1>
                <h2 className='completed__subheader'>
                    Here is a personalized itinerary we've tailored just for you
                </h2>
            </section>
            <section className='completed__itinerary-container'>

            </section>

            <Link to='/form'>Back to form</Link>
        </main>
    )
};

export default CompletedItineraryPage;