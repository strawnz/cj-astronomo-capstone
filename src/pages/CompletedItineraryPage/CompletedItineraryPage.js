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
        console.log("calculateTimeBackwards - startTime: ", startTime);
        const time = new Date(`2024-01-01T${startTime}`);
        console.log("calculateTimeBackwards - time before adjustment: ", time);
        time.setMinutes(time.getMinutes() - duration);
        console.log("calculateTimeBackwards - time after adjustment: ", time);
        return time.toLocaleTimeString('en-GB'); 
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
    
    useEffect(() => {
        console.log("Resto to Venue Time in useEffect: ", restoToVenueTime);
        if (restoToVenueTime) {
            const calculateTimeAtResto = calculateTimeBackwards(restoToVenueTime, 90);
            console.log("Time at Resto: ", calculateTimeAtResto);
            setTimeAtResto(calculateTimeAtResto);
        }
    }, [restoToVenueTime]); 


    return (
        <main className='main'>
            <section className='completed__header-container'>
                <h1 className='completed__header'>Your Pre-Event Planner is Ready!</h1>
                <h2 className='completed__subheader'>
                    Here is a personalized itinerary we've tailored just for you
                </h2>
            </section>
            <section className='completed__itinerary-container'>
                <article className='itin__pit-stop'>
                    <div className='itin__dest-point'></div>
                    <div>
                        <h3 className='itin__header'>Text Placeholder</h3>
                    </div>
                </article>
            </section>
        </main>
    )
};

export default CompletedItineraryPage;